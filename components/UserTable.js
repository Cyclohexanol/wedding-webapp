import React, { useState } from 'react';
import EditSVG from '../public/images/pencil-edit-button.svg';
import XSVG from '../public/images/x-symbol.svg';
import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal';
import DeleteUserModal from './DeleteUserModal';
import { useTranslation } from "next-i18next";


export const UserTable = ({ users, groups, questions }) => {
    const { t } = useTranslation("common");

    const [modalOpen, setModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [addUserModalOpen, setAddUserModalOpen] = useState(false);

    const openModal = (user) => {
        setSelectedUser(user);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedUser(null);
        setModalOpen(false);
    };

    const openDeleteModal = (user) => {
        setSelectedUser(user);
        setDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setSelectedUser(null);
        setDeleteModalOpen(false);
    };

    const openAddUserModal = () => {
        setAddUserModalOpen(true);
    };

    const closeAddUserModal = () => {
        setAddUserModalOpen(false);
    };

    return (
        <>
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-3 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                First Name
                            </th>
                            <th className="px-3 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Last Name
                            </th>
                            <th className="px-3 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Registration Status
                            </th>
                            <th className="px-3 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Attendance Status
                            </th>
                            <th className="px-3 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Brunch
                            </th>
                            <th className="px-3 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Camping
                            </th>
                            <th className="px-3 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Diet
                            </th>
                            <th className="px-3 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Allergies
                            </th>
                            <th className="px-3 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Song Request
                            </th>
                            <th className="px-3 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Quiz
                            </th>
                            <th className="px-3 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Edit
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map(user => {
                            return (
                                <tr key={user._id}>
                                    <td className="px-3 py-4 text-sm whitespace-nowrap">{user.firstName}</td>
                                    <td className="px-3 py-4 text-sm whitespace-nowrap">{user.lastName}</td>
                                    <td className="w-16 px-3 py-4 text-sm whitespace-nowrap">
                                        {user.registrationStatus === 'Not registered' ? (
                                            <span className="inline-block w-3 h-3 rounded-full bg-red-500"></span>
                                        ) : (
                                            <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                                        )}
                                    </td>
                                    <td className="w-16 px-3 py-4 text-sm whitespace-nowrap">
                                        {user.registrationStatus === 'Not registered' ? <span className="inline-block w-3 h-3 rounded-full border border-gray-500"></span>
         : user.attendanceStatus === 'Unknown' ? (
                                            <span className="inline-block w-3 h-3 rounded-full bg-yellow-500"></span>
                                        ) : user.attendanceStatus === 'Attending' ? (
                                            <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>) :
                                            (<span className="inline-block w-3 h-3 rounded-full bg-red-500"></span>
                                            )}
                                    </td>
                                    <td className="w-16 px-3 py-4 text-sm whitespace-nowrap">{user.registrationStatus === 'Not registered' ? <span className="inline-block w-3 h-3 rounded-full border border-gray-500"></span>
         : (user.brunch ? <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span> : <span className="inline-block w-3 h-3 rounded-full bg-red-500"></span>)}</td>
                                    <td className="w-16 px-3 py-4 text-sm whitespace-nowrap">{user.registrationStatus === 'Not registered' ? <span className="inline-block w-3 h-3 rounded-full border border-gray-500"></span>
         : (user.camping ? <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span> : <span className="inline-block w-3 h-3 rounded-full bg-red-500"></span>)}</td>
                                    <td className="px-3 py-4 text-sm whitespace-nowrap">{user.registrationStatus === 'Not registered' ? '' : user.dietaryRestrictions}</td>
                                    <td className="px-3 py-4 text-sm whitespace-nowrap max-w-xs">
                                        <p className="w-25 truncate">
                                            {user.registrationStatus === 'Not registered' ? '' : user.dietaryInfo ? user.dietaryInfo : '-'}
                                        </p>
                                    </td>
                                    <td className="px-3 py-4 text-sm whitespace-nowrap max-w-xs">
                                        <p className="w-25 truncate">
                                            {user.registrationStatus === 'Not registered' ? '' : user.songRequest ? user.songRequest : '-'}
                                        </p>
                                    </td>
                                    <td className="px-3 py-4 text-sm whitespace-nowrap max-w-xs">
                                        <span className="mr-2">{user.userQuiz && user.userQuiz.userAnswers ? user.userQuiz.userAnswers.length : 0}/{questions ? questions.length : "?"} [{user.userQuiz ? user.userQuiz.score : 0} pts]</span>
                                        {!user.userQuiz ?
                                            <span className="inline-block w-3 h-3 rounded-full bg-red-500"></span>
                                            : (user.userQuiz.currentQuestionIndex === -1 ? <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                                                : <span className="inline-block w-3 h-3 rounded-full bg-yellow-500"></span>)}
                                    </td>
                                    <td className="px-6 py-4 text-sm whitespace-nowrap flex items-center justify-center w-full gap-3">
                                        <button
                                            onClick={() => {
                                                openModal(user);
                                            }}
                                            className="focus:outline-none"
                                        >
                                            <EditSVG className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                                        </button>
                                        <button
                                            onClick={() => {
                                                openDeleteModal(user);
                                            }}
                                            className="focus:outline-none"
                                        >
                                            <XSVG className="w-5 h-5 text-red-500 hover:text-red-700" />
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
                    onClick={openAddUserModal}
                >
                    {t("add-user")}
                </button>
            </div>
            {modalOpen && <EditUserModal user={selectedUser} closeModal={closeModal} />}
            {deleteModalOpen && <DeleteUserModal closeModal={closeDeleteModal} user={selectedUser}/>}
            {addUserModalOpen && <AddUserModal closeModal={closeAddUserModal} groups={groups} />}
        </>
    );
};
