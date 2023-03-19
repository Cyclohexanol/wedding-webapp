import { useState, useRef, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { userService } from "../services/user.service";
import { alertService } from "../services/alert.service";

const AddGroupModal = ({ closeModal }) => {
    const modalRef = useRef(null);

    const { t } = useTranslation("common");

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [superGroup, setSuperGroup] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeModal();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [modalRef]);

    const confirmAdd = () => {
        return userService
            .addGroup(name, password, superGroup)
            .then(() => {
                window.location.reload();
            })
            .catch(alertService.error);
    };

    return (
        <div className="fixed top-0 left-0 z-40 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-stone-100 border border-green-900 hover:bg-stone-200 font-semibold text-block py-2 px-4 rounded flex flex-col">
                <p className="text-xl font-medium leading-normal text-gray-800 mb-4">{t("add-group")}</p>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">{t("group-name")}</label>
                    <input
                        className="mt-1 w-full px-2 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">{t("password")}</label>
                    <input
                        className="mt-1 w-full px-2 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                            checked={superGroup}
                            onChange={() => setSuperGroup(!superGroup)}
                        />
                        <span className="ml-2">{t("super-group")}</span>
                    </label>
                </div>
                <div className="mt-5 flex justify-center">
                    <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded mr-4"
                        onClick={closeModal}
                    >
                        {t("cancel")}
                    </button>
                    <button
                        className="bg-green-900 hover:bg-stone-400 text-white font-semibold py-2 px-4 rounded"
                        onClick={confirmAdd}
                    >
                        {t("add-group")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddGroupModal;
