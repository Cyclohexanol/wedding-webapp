import React, { useState } from 'react';
import EditSVG from '../public/images/pencil-edit-button.svg';
import { useTranslation } from 'next-i18next';

import EditWishModal from './EditWishModal';

export const WishesTable = ({ wishes, groups }) => {
    const { t } = useTranslation('common');

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedWish, setSelectedWish] = useState(null);

    const openModal = (wish) => {
        setSelectedWish(wish);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedWish(null);
        setModalOpen(false);
    };

    return (
        <>
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-3 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Image
                            </th>
                            <th className="px-3 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Title
                            </th>
                            <th className="px-3 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Description
                            </th>
                            <th className="px-3 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price
                            </th>
                            <th className="px-3 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total Quantity
                            </th>
                            <th className="px-3 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Quantity Left
                            </th>
                            <th className="px-3 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Progress Bar
                            </th>
                            <th className="px-3 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Edit
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {wishes.map(wish => {
                            const soldItems = groups.reduce((acc, group) => {
                                if (group.paid) {
                                    const item = group.cart.find(item => item._id === wish._id);
                                    return item ? acc + item.quantity : acc;
                                }
                                return acc;
                            }, 0);
                            const reservedItems = groups.reduce((acc, group) => {
                                if (!group.paid) {
                                    const item = group.cart.find(item => item._id === wish._id);
                                    return item ? acc + item.quantity : acc;
                                }
                                return acc;
                            }, 0);
                            const availableItems = wish.available;
                            const progressPercentage = (soldItems / wish.totalQuantity) * 100;
                            const reservedPercentage = (reservedItems / wish.totalQuantity) * 100;
                            const moneyMade = soldItems * wish.price;
                            return (
                                <tr key={wish._id}>
                                    <td className="flex items-center justify-center px-3 py-4 text-left text-sm whitespace-nowrap">
                                        <img
                                            src={wish.pictureUrl}
                                            alt={t(wish.title)}
                                            className="w-8 h-8 bg-stone-200 object-cover rounded-md"
                                        />
                                    </td>
                                    <td className="px-3 py-4 text-left text-sm whitespace-nowrap max-w-xs">
                                        <p className="truncate">{t(wish.title)}</p>
                                    </td>
                                    <td className="px-3 py-4 text-left text-sm whitespace-nowrap max-w-xs">
                                        <p className="truncate">{t(wish.description)}</p>
                                    </td>
                                    <td className="px-3 py-4 text-sm whitespace-nowrap">CHF {wish.price.toFixed(2)}</td>
                                    <td className="px-3 py-4 text-sm whitespace-nowrap">{wish.totalQuantity}</td>
                                    <td className="px-3 py-4 text-sm whitespace-nowrap">{wish.quantity}</td>
                                    <td className="px-3 py-4 text-sm whitespace-nowrap">
                                        <div className="relative h-2 w-full bg-gray-200 rounded">
                                            <div
                                                className="absolute h-full bg-green-600 rounded"
                                                style={{ width: `${progressPercentage}%` }}
                                            ></div>
                                            <div
                                                className="absolute h-full bg-green-200 rounded"
                                                style={{ width: `${reservedPercentage}%`, left: `${progressPercentage}%` }}
                                            ></div>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-700 mt-1">
                                            <span>Sold: {soldItems}</span>
                                            <span>Reserved: {reservedItems}</span>
                                            <span>Available: {availableItems}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                                        <button
                                            onClick={() => {
                                                openModal(wish);
                                            }}
                                            className="focus:outline-none"
                                        >
                                            <EditSVG className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {modalOpen && <EditWishModal wish={selectedWish} closeModal={closeModal} />}
        </>
    );
};