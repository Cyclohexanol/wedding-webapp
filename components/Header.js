import Head from 'next/head'
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import LogoutModal from './LogoutModal'

import Link from './Link'

import LogoutSVG from "../public/images/exit.svg";
import HomeSVG from "../public/images/home.svg";

export const Header = ({ heading, title }) => {
    
    const { t } = useTranslation('common')

    const [showLogout, setShowLogout] = useState(false)

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div className="flex items-center justify-between px-6 py-2 border-b border-stone-300 bg-stone-100">
                <Link href="/auth/home">
                    <button
                        className="bg-transparent h-30 hover:bg-stone-400 text-stone-600 font-semibold hover:text-white py-2 px-4 border border-stone-600 hover:border-transparent rounded"
                >
                        <HomeSVG className="hover:stroke-white w-7 h-7" />
                    </button>
                </Link>
                <Link href="/">
                    <button
                        className="bg-transparent h-35 hover:bg-stone-400 text-stone-600 font-semibold hover:text-white py-2 px-4 border border-stone-600 hover:border-transparent rounded"
                    >
                        <LogoutSVG className="hover:stroke-white w-6 h-6" />
                    </button>
                </Link>
                
            </div>
            <LogoutModal show={showLogout} onClose={() => setShowLogout(false)} />
        </>
    )
}
