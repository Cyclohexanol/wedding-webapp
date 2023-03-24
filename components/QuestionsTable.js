import React, { useState } from 'react';
import XSVG from '../public/images/x-symbol.svg';
import EditSVG from '../public/images/pencil-edit-button.svg';
import DeleteQuestionModal from './DeleteQuestionModal';
import AddQuestionModal from './AddQuestionModal';
import EditQuestionModal from './EditQuestionModal';
import { useTranslation } from "next-i18next";

export const QuestionsTable = ({ questions }) => {
    const { t } = useTranslation("common");

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [addQuestionModalOpen, setAddQuestionModalOpen] = useState(false);
    const [editQuestionModalOpen, setEditQuestionModalOpen] = useState(false);

    const openAddQuestionModal = () => {
        setAddQuestionModalOpen(true);
    };

    const closeAddQuestionModal = () => {
        setAddQuestionModalOpen(false);
    };

    const openEditModal = (question) => {
        setSelectedQuestion(question);
        setEditQuestionModalOpen(true);
    };

    const closeEditModal = () => {
        setSelectedQuestion(null);
        setEditQuestionModalOpen(false);
    };

    const openDeleteModal = (question) => {
        setSelectedQuestion(question);
        setDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setSelectedQuestion(null);
        setDeleteModalOpen(false);
    };

    return (
        <>
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ID
                            </th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Question
                            </th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Option A
                            </th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Option B
                            </th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Option C
                            </th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Option D
                            </th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Answer
                            </th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Difficulty
                            </th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Edit
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                        {questions.map(question => {
                            return (
                                <tr key={question.id}>
                                    <td className="px-6 py-4 text-sm font-medium">
                                        {question.id}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium">
                                        {t("questions." + question.questionText)}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium">
                                        {t("questions." + question.optionA)}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium">
                                        {t("questions." + question.optionB)}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium">
                                        {t("questions." + question.optionC)}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium">
                                        {t("questions." + question.optionD)}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium">
                                        {question.correctOption.toUpperCase()}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium">
                                        {t(question.difficulty.toLowerCase())}
                                    </td>
                                    <td className="px-6 py-4 text-sm whitespace-nowrap flex items-center gap-3 justify-center w-full">
                                        <button
                                            onClick={() => {
                                                openEditModal(question);
                                            }}
                                            className="focus:outline-none"
                                        >
                                            <EditSVG className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                                        </button>
                                        <button
                                            onClick={() => {
                                                openDeleteModal(question);
                                            }}
                                            className="focus:outline-none"
                                        >
                                            <XSVG className="w-5 h-5 text-gray-500 hover:text-gray-700" />
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
                    onClick={openAddQuestionModal}
                >
                    {t("add-question")}
                </button>
            </div>
            {deleteModalOpen && <DeleteQuestionModal closeModal={closeDeleteModal} question={selectedQuestion} />}
            {addQuestionModalOpen && <AddQuestionModal closeModal={closeAddQuestionModal} />}
            {editQuestionModalOpen && <EditQuestionModal closeModal={closeEditModal} question={selectedQuestion} />}
        </>
    )
}

