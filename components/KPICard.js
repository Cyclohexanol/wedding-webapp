import React from 'react';

export const KPICard = ({ title, count, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="cursor-pointer bg-white rounded-md shadow-md p-4 text-center dark:bg-gray-900"
        >
            <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                {title}
            </h4>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                {count}
            </p>
        </div>
    );
};