import { useTranslation } from 'next-i18next'
import { useState } from "react";

import Link from './Link'

export const MenuIcon = ({ linkref, children, ...rest }) => {

    const { t } = useTranslation('common')



    return (
        <Link
            href={ linkref }
        className="border border-green-900 bg-stone-50 hover:bg-stone-200 font-semibold 
                                    text-black py-2 px-4 rounded"
    >
        <div className="flex justify-center items-center flex-wrap flex-col">
                { children }
        </div>
    </Link>)
}