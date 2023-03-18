import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import Link from './Link';

export const MenuIcon = ({ linkref, children, notification, ...rest }) => {
    const { t } = useTranslation('common');

    return (
        <Link
            href={linkref}
            className="relative border border-green-900 bg-stone-50 hover:bg-stone-200 font-semibold 
                            text-black py-2 px-4 rounded"
        >
            <div className="flex justify-center items-center flex-wrap flex-col">
                {children}
                {notification && (
                    <div
                        className="absolute -top-4 -right-4 bg-red-600 text-white text-xs rounded-full h-8 w-8 flex items-center justify-center"
                        style={{
                            borderRadius: '50%',
                            lineHeight: '1.4',
                            fontSize: '16px',
                        }}
                    >
                        {notification}
                    </div>
                )}
            </div>
        </Link>
    );
};
