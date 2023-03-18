import { useTranslation } from 'next-i18next'
import {
    getStaticPaths,
    getI18nProps,
} from '../../../lib/getStatic'

import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'
import WishItem from '../../../components/WishItem';
import CartBanner from '../../../components/CartBanner';

import { useState, useEffect } from "react";
import { userService } from '../../../services/user.service'; // Import userService

const Gift = () => {
    const { t } = useTranslation(['common'])

    const [wishes, setWishes] = useState([]); // Added state for wishes
    const [cart, setCart] = useState([]);

    // Added useEffect to fetch wishes on page load
    useEffect(() => {
        userService.getAllWishes()
            .then(fetchedWishes => {
                setWishes(fetchedWishes.wishes);
            })
            .catch(error => {
                console.error('Error fetching wishes:', error);
            });
        userService.getCart()
            .then(fetchedCart => {
                setCart(fetchedCart)
            }).catch(error => {
                console.error('Error fetching cart:', error);
            });
    }, []);


    const updateCart = (item) => {
        setCart((prevCart) => {
            const existingItemIndex = prevCart.findIndex((cartItem) => cartItem._id === item._id);
            // Already in cart
            if (existingItemIndex > -1) {
                const newCart = [...prevCart];
                if (item.quantity == 0) {
                    newCart.splice(existingItemIndex, 1);
                    userService.removeFromCart(item)
                    return newCart;
                }
                userService.addToCart(item)
                newCart[existingItemIndex].quantity = item.quantity;
                return newCart;
            } else { // New item in cart
                userService.addToCart(item)
                return [...prevCart, item];
            }
        });
        // Update quantity remaining
        userService.getAllWishes()
            .then(fetchedWishes => {
                setWishes(fetchedWishes.wishes);
            })
            .catch(error => {
                console.error('Error fetching wishes:', error);
            });
    };

    return (
        <>
            <main>
                <Header title={t('title')} />
                <div className="flex items-center justify-left px-6 py-2 border-b border-stone-300 bg-stone-100">
                    {t('wish-list-explaination')}
                </div>
                <div className="m-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {wishes.map((wish, index) => (
                        <WishItem key={index} wish={wish} selectedWish={
                            cart.find((cartItem) => cartItem._id === wish._id)
                        } updateCart={updateCart} />
                    ))}
                </div>
                {cart.length > 0 && <CartBanner cart={cart} />}
            </main>
            <Footer />
        </>
    )
}

export default Gift

export { getStaticPaths }
export const getStaticProps = async ctx => {
    return {
        props: {
            ...(await getI18nProps(ctx, [
                'common',
                'footer',
            ])),
        },
    }
}
