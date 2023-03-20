// EditWishForm.js
import React, { useState } from 'react';
import { userService } from '../services/user.service';
import { useTranslation } from 'next-i18next'

import { alertService } from "../services/alert.service";

const EditWishForm = ({ wish, onSave }) => {
    const { t } = useTranslation(['common'])
    const [pictureUrl, setPictureUrl] = useState(wish.pictureUrl);
    const [quantity, setQuantity] = useState(wish.totalQuantity);

    const handleSubmit = (e) => {
        

        e.preventDefault();
        userService.updateWish(wish._id, wish.title, wish.price, wish.description, pictureUrl, quantity)
            .then(() => {
                window.location.reload();
            })
            .catch(alertService.error);
    };

    const soldItems = wish.totalQuantity - wish.quantity;
    const progressPercentage = (soldItems / wish.totalQuantity) * 100;

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <p className="block text-sm font-medium text-gray-700">Title</p>
                <p>{t(wish.title)}</p>
            </div>
            <div className="mb-4">
                <p className="block text-sm font-medium text-gray-700">Description</p>
                <p>{t(wish.description)}</p>
            </div>
            <div className="mb-4">
                <p className="block text-sm font-medium text-gray-700">Price</p>
                <p>CHF {wish.price.toFixed(2)}</p>
            </div>
            <div className="mb-4">
                <div className="text-sm font-medium text-gray-700">Progress Bar</div>
                <div className="h-2 w-full bg-gray-200 rounded">
                    <div
                        className="h-full bg-green-600 rounded"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-700 mt-1">
                    <span>Sold Items: {soldItems}</span>
                    <span>Total Quantity: {wish.totalQuantity}</span>
                </div>
            </div>
            <div className="mb-4">
                <label htmlFor="pictureUrl" className="block text-sm font-medium text-gray-700">Picture URL</label>
                <input
                    type="text"
                    id="pictureUrl"
                    value={pictureUrl}
                    onChange={(e) => setPictureUrl(e.target.value)}
                    className="mt-1 w-full px-2 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Total Quantity</label>
                <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="mt-1 w-full px-2 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    Save Changes
                </button>
            </div>
        </form>
    );
};

export default EditWishForm;
