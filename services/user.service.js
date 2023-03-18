import { BehaviorSubject } from 'rxjs';
// import getConfig from 'next/config';
// import { useRouter } from 'next/router'

import { fetchWrapper } from '../helpers/fetch-wrapper';

// const { publicRuntimeConfig } = getConfig();
export const baseUrl = "http://localhost:5000/api";
const tokenSubject = new BehaviorSubject(process.browser && localStorage.getItem('token'));
const memberSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('member')));

export const userService = {
    token: tokenSubject.asObservable(),
    member: memberSubject.asObservable(),
    get tokenValue() {
        return tokenSubject.value
    },
    get memberValue() {
        return memberSubject.value
    },
    setActiveMember,
    login,
    logout,
    updateUser,
    updateSelfInfo,
    getAllWishes,
    getCart,
    addToCart,
    removeFromCart,
    markPaid
};

function setActiveMember(member) {
    localStorage.setItem('member', JSON.stringify(member));
}

function login(name, password) {
    return fetchWrapper.post(`${baseUrl}/groups/login`, { name, password })
        .then(info => {
            // publish user to subscribers and store in local storage to stay logged in between page refreshes
            tokenSubject.next(info.token);
            localStorage.setItem('token', info.token);
            return info.token;
        })
        .catch(error => {
            throw error;
        });
}


function updateSelfInfo() {
    return fetchWrapper.get(`${baseUrl}/groups`).then((response) => {
        response.group.users.forEach((user) => {
            if (userService.memberValue && user._id === userService.memberValue._id) {
                setActiveMember(user)
            }
        });
        return response
    })
}

function updateUser(member, dietaryRestrictions, attendanceStatus, dietaryInfo, songRequest, brunch, camping) {
    const content = {
        user_id: member._id,
        registerationStatus: "Registered",
        dietaryRestrictions,
        attendanceStatus,
        dietaryInfo,
        songRequest,
        brunch,
        camping
    }
    return fetchWrapper.put(`${baseUrl}/users`, content);

}

function logout() {
    // remove user from local storage, publish null to user subscribers and redirect to login page
    if (typeof window !== 'undefined') {
        localStorage.removeItem('token')
        tokenSubject.next(null)
        localStorage.removeItem('member')
        memberSubject.next(null)
        console.log("local storage cleared - " + userService.tokenValue + " - " + userService.memberValue)
    }
    return null
}

function getCart() {
    return fetchWrapper.get(`${baseUrl}/groups`)
        .then(response => {
            return response.group.cart
        });
}

function getAllWishes() {
    return fetchWrapper.get(`${baseUrl}/wishlist`)
        .then(response => response);
}

function addToCart(wish) {
    return fetchWrapper.patch(
        `${baseUrl}/wishlist`,
        {
            wish_id: wish._id,
            is_purchasing: true,
            quantity: wish.quantity,
        }
        )
        .then(response => response);
}

function removeFromCart(wish) {
    return fetchWrapper.patch(
        `${baseUrl}/wishlist`,
        {
            wish_id: wish._id,
            is_purchasing: false,
            quantity: wish.quantity,
        }
        )
        .then(response => response);
}

function markPaid(paid){
    return fetchWrapper.patch(
        `${baseUrl}/pay`,
        {
            paid
        }
        )
        .then(response => response);
}