import { useEffect, useRef } from "react";
import { useTranslation } from "next-i18next";

const DeleteQuestionModal = ({ question, closeModal }) => {
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
        // Currently, this function doesn't do anything.
    }

    return (
        <div className="fixed top-0 left-0 z-40 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-stone-100 border border-green-900 hover:bg-stone-200 font-semibold text-block py-2 px-4 rounded flex flex-col">
                <p className="text-xl font-medium leading-normal text-gray-800 mb-4">{t("delete-question")}</p>
                <p className="pb-4">{t(question.text)}</p>
                <p>{t("delete-question-confirmation")}</p>
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
                        {t("delete-question")}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteQuestionModal;
