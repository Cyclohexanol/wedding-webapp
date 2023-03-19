import { useEffect, useRef } from "react";
import { useTranslation } from "next-i18next";
import { userService } from '../services/user.service';
import { alertService } from '../services/alert.service';

const DeleteGroupModal = ({ group, closeModal }) => {
    const modalRef = useRef(null);

    const { t } = useTranslation('common')

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeModal();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [modalRef]);

    const confirmDelete = () => {
        return userService
            .deleteGroup(
                group._id
            )
            .then(() => {
                window.location.reload();
            })
            .catch(alertService.error);
    }

    return (
        <div className="fixed top-0 left-0 z-40 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-stone-100 border border-green-900 hover:bg-stone-200 font-semibold text-block py-2 px-4 rounded flex flex-col">
                <p className="text-xl font-medium leading-normal text-gray-800 mb-4">{t("delete-group")}</p>
                <p className="pb-4">{group.name}</p>
                <p>{t("delete-group-question-confirmation")}</p>
                <div className="mt-2">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t("first-name")}
                                </th>
                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t("last-name")}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                            {group.users.map((user) => (
                                <tr key={user._id}>
                                    <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">
                                        {user.firstName}
                                    </td>
                                    <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">
                                        {user.lastName}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-5 flex justify-center">
                    <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded mr-4"
                        onClick={closeModal}
                    >
                        {t("cancel")}
                    </button>
                    <button
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
                        onClick={confirmDelete}
                    >
                        {t("delete-group")}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteGroupModal;
