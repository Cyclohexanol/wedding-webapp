import React from 'react';
import { useRouter } from 'next/router'
import { userService } from '../services/user.service';

const CartBanner = ({ cart }) => {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const router = useRouter();

    const handleCheckout = () => {
        // Handle checkout logic here
        userService.markPaid(true)
        localStorage.setItem('cart', JSON.stringify(cart));
        router.push('/auth/cash');
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-green-900 py-3 px-6 text-white shadow-md">
            <div className="container mx-auto flex items-center justify-between">
                <div>
                    <span className="font-semibold">Items in cart: </span>
                    <span>{totalItems}</span>
                </div>
                <div>
                    <span className="font-semibold">Total price: </span>
                    <span>${totalPrice.toFixed(2)}</span>
                </div>
                <button
                    onClick={handleCheckout}
                    className="bg-stone-400 text-white px-4 py-2 rounded shadow-lg hover:bg-green-800"
                >
                    Validate Order
                </button>
            </div>
        </div>
    );
};

export default CartBanner
