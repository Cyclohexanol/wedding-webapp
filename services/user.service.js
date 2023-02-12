import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import { useRouter } from 'next/router'

import { fetchWrapper } from '../helpers/fetch-wrapper';

const { publicRuntimeConfig } = getConfig();
const baseUrl = "http://178.83.168.50:5000/api";
const infoSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('info')));
const memberSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('member')));

export const userService = {
    info: infoSubject.asObservable(),
    member: memberSubject.asObservable(),
    get infoValue() {
        return infoSubject.value
    },
    get memberValue() {
        return memberSubject.value
    },
    setActiveMember,
    login,
    logout,
    updateUser
};

function setActiveMember(member) {

    localStorage.setItem('member', JSON.stringify(member));
    console.log("User selected: " + JSON.stringify(member));
}

function login(name, password) {
    return fetchWrapper.post(`${baseUrl}/groups/login`, { name, password })
        .then(info => {

            // publish user to subscribers and store in local storage to stay logged in between page refreshes
            infoSubject.next(info);
            localStorage.setItem('info', JSON.stringify(info));

            console.log(JSON.stringify(info))
            return info;
        });
}

function updateUser(member, dietaryRestrictions, attendanceStatus, dietaryInfo, songRequest) {
    const content = {
        user_id: member.id,
        registerationStatus: "Registered",
        dietaryRestrictions,
        attendanceStatus,
        dietaryInfo,
        songRequest
    }
    return fetchWrapper.post(`${baseUrl}/users/edit`, content )

}

function logout() {
    // remove user from local storage, publish null to user subscribers and redirect to login page
    if (typeof window !== 'undefined') {
        localStorage.removeItem('info')
        infoSubject.next(null)
        localStorage.removeItem('member')
        memberSubject.next(null)
        console.log("local storage cleared - " + userService.infoValue + " - " + userService.memberValue)
    }
    return null
}