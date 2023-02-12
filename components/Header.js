import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import LogoutModal from './LogoutModal'

import Link from './Link'

import { useRouter } from 'next/router'

import LogoutSVG from "../public/images/exit.svg";
import HomeSVG from "../public/images/home.svg";
import { userService } from '../services/user.service';

export const Header = ({ title }) => {
    
    const { t } = useTranslation('common')
    const router = useRouter()


    const [memberData, setMemberData] = useState()

    useEffect(() => {
        setMemberData(userService.memberValue);
    }, []);

    const logout = () => {
        userService.logout()
        // get return url from query parameters or default to '/auth/user-select'
        const returnUrl = router.query.returnUrl || '/';
        router.push(returnUrl);
    }

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
                <p>{memberData && memberData?.firstName}</p>
                <button
                    onClick={() => logout()}
                    className="bg-transparent h-35 hover:bg-stone-400 text-stone-600 font-semibold hover:text-white py-2 px-4 border border-stone-600 hover:border-transparent rounded"
                >
                    <LogoutSVG className="hover:stroke-white w-6 h-6" />
                </button>
                
            </div>
        </>
    )
}
