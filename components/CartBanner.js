import React from 'react';
import { useRouter } from 'next/router';
import { userService } from '../services/user.service';
import { useTranslation } from 'react-i18next';

const CartBanner = ({ cart }) => {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const router = useRouter();
    const { t } = useTranslation();

    const handleCheckout = () => {
        // Handle checkout logic here
        userService.markPaid(true);
        localStorage.setItem('cart', JSON.stringify(cart));
        router.push('/auth/cash');
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-stone-300 py-3 px-6 text-black shadow-md">
            <div className="container mx-auto flex flex-wrap items-center justify-between">
                <div className="w-full sm:w-auto flex items-center justify-between gap-10">
                    <div>
                        <div className="font-semibold">{t('cartBanner.itemsInCart')}</div>
                        <div>{totalItems}</div>
                    </div>
                    <div>
                        <div className="font-semibold">{t('cartBanner.totalPrice')}</div>
                        <div>CHF {totalPrice.toFixed(2)}</div>
                    </div>
                </div>
                <button
                    onClick={handleCheckout}
                    className="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md bg-green-900 hover:bg-stone-400 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full sm:w-auto mt-4 sm:mt-0"
                >
                    {t('cartBanner.validateOrder')}
                </button>
            </div>
        </div>
    );
};

export default CartBanner;
