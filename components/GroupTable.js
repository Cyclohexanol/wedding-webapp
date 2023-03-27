import React, { useState } from 'react';
import XSVG from '../public/images/x-symbol.svg';
import StarSVG from '../public/images/star.svg';
import CartSVG from '../public/images/cart.svg';
import DeleteGroupModal from './DeleteGroupModal';
import ClearCartModal from './ClearCartModal';
import AddGroupModal from './AddGroupModal';
import { useTranslation } from "next-i18next";

export const GroupTable = ({ groups }) => {
    const { t } = useTranslation("common");

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [clearCartModalOpen, setClearCartModalOpen] = useState(false);



    const [addGroupModalOpen, setAddGroupModalOpen] = useState(false);

    const openAddGroupModal = () => {
        setAddGroupModalOpen(true);
    };

    const closeAddGroupModal = () => {
        setAddGroupModalOpen(false);
    };

    const openDeleteModal = (user) => {
        setSelectedGroup(user);
        setDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setSelectedGroup(null);
        setDeleteModalOpen(false);
    };

    const openClearCartModal = (user) => {
        setSelectedGroup(user);
        setClearCartModalOpen(true);
    };

    const closeClearCartModal = () => {
        setClearCartModalOpen(false);
    };

    return (
        <>
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Group Name
                            </th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Members
                            </th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Registered
                            </th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Attending
                            </th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Brunch
                            </th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Camping
                            </th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Cart Total
                            </th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Edit
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                        {groups.map(group => {
                            const registeredMembers = group.users.filter(user => user.registrationStatus === "Registered").length;
                            const attendingMembers = group.users.filter(user => user.attendanceStatus === "Attending").length;
                            const brunchMembers = group.users.filter(user => user.brunch === true).length;
                            const campingMembers = group.users.filter(user => user.camping === true).length;
                            const cartTotal = group.cart.reduce((total, item) => total + item.price * item.quantity, 0);

                            return (
                                <tr key={group.name}>
                                    <td className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${group.superGroup ? 'font-bold' : ''}`}>
                                        <span className="flex items-center justify-center w-full">
                                            {group.name} 
                                            {group.superGroup && <StarSVG className="w-4 h-4 ml-1" />}
                                        </span>
                                    </td>
                                    <td className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${group.superGroup ? 'font-bold' : ''}`}>{group.users.length}</td>
                                    <td className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${group.superGroup ? 'font-bold' : ''}`}>{registeredMembers}</td>
                                    <td className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${group.superGroup ? 'font-bold' : ''}`}>{attendingMembers}</td>
                                    <td className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${group.superGroup ? 'font-bold' : ''}`}>{brunchMembers}</td>
                                    <td className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${group.superGroup ? 'font-bold' : ''}`}>{campingMembers}</td>
                                    <td className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${group.superGroup ? 'font-bold' : ''}`}>
                                        <span className="mr-2">CHF {cartTotal.toFixed(2)}</span>
                                        {cartTotal == 0 ?
                                            <span className="inline-block w-3 h-3 rounded-full border border-gray-500"></span>
                                            : (group.paid ? <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                                                : <span className="inline-block w-3 h-3 rounded-full bg-yellow-500"></span>)}
                                    </td>
                                    <td className={`px-6 py-4 text-sm whitespace-nowrap flex items-center gap-3 justify-center w-full ${group.superGroup ? 'font-bold' : ''}`}>
                                        <button
                                            onClick={() => {
                                                openDeleteModal(group);
                                            }}
                                            className="focus:outline-none"
                                        >
                                            <XSVG className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                                        </button>
                                        <button
                                            onClick={() => {
                                                openClearCartModal(group);
                                            }}
                                            className="focus:outline-none"
                                        >
                                            <CartSVG className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="my-4 flex">
                <button
                    className="text-center inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded 
                                                                    shadow-md bg-green-900 hover:bg-stone-400 hover:shadow-lg focus:shadow-lg focus:outline-none 
                                                                    focus:ring-0 active:shadow-lg transition duration-150 ease-in-out mb-3"
                    onClick={openAddGroupModal}
                >
                    {t("add-group")}
                </button>
            </div>
            
            {deleteModalOpen && <DeleteGroupModal closeModal={closeDeleteModal} group={selectedGroup} />}
            {addGroupModalOpen && <AddGroupModal closeModal={closeAddGroupModal} />}
            {clearCartModalOpen && <ClearCartModal closeModal={closeClearCartModal} group={selectedGroup} />}

        </>
    );
};
