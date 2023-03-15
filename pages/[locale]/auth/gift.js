import Link from '../../../components/Link'

import { useTranslation } from 'next-i18next'
import {
    getStaticPaths,
    getI18nProps,
} from '../../../lib/getStatic'

import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'
import WishItem from '../../../components/WishItem';

import { useState, useEffect } from "react";
import { userService } from '../../../services/user.service'; // Import userService

const Gift = () => {
    const { t } = useTranslation(['common'])

    const [wishes, setWishes] = useState([]); // Added state for wishes

    // Added useEffect to fetch wishes on page load
    useEffect(() => {
        userService.getAllWishes()
            .then(fetchedWishes => {
                setWishes(fetchedWishes.wishes);
            })
            .catch(error => {
                console.error('Error fetching wishes:', error);
            });
    }, []);

    return (
        <>
            <main>
                <Header title={t('title')} />
                <div className="flex items-center justify-left px-6 py-2 border-b border-stone-300 bg-stone-100">
                    {t('wish-list-explaination')}
                </div>
                <div className="m-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {wishes.map((wish, index) => (
                        <WishItem key={index} wish={wish} />
                    ))}
                </div>
            </main>
            <Footer />
        </>
    )
}

export default Gift

export { getStaticPaths }
export const getStaticProps = async ctx => {
    return {
        props: {
            ...(await getI18nProps(ctx, [
                'common',
                'footer',
            ])),
        },
    }
}
