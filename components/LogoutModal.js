import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useTranslation } from "next-i18next";

export default function LogoutModal({ show, onClose, onConfirmLogout }) {
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        setIsBrowser(true);
    }, []);


    const { t } = useTranslation("common");

    const handleClose = (e) => {
        e.preventDefault();
        onClose();
    }

    const handleLogout = (e) => {
        e.preventDefault();
        onConfirmLogout();
        onClose();
    }

    const modalContent = show ? (
        <div className="fixed top-0 left-0 z-40 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-stone-100 border border-green-900 hover:bg-stone-200 font-semibold text-block py-2 px-4 rounded flex flex-col">
                <p className="text-xl font-medium leading-normal text-gray-800 mb-4">{t("logout")}</p>
                <p>{t("logout-question-confirmation")}</p>
                <div className="mt-5 flex justify-end">
                    <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded mr-2"
                        onClick={handleClose}
                    >
                        {t("cancel")}
                    </button>
                    <button
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
                        onClick={handleLogout}
                    >
                        {t("logout")}
                    </button>

                </div>
            </div>
        </div>
    ) : null;


    if (isBrowser) {
        return ReactDOM.createPortal(
            modalContent,
            document.getElementById("logout-modal")
        )
    } else {
        return null;
    }
}