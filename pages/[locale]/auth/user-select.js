import Link from '../../../components/Link'
import Head from 'next/head'

import { useTranslation } from 'next-i18next'
import {
    getStaticPaths /*, makeStaticProps*/,
    getI18nProps,
} from '../../../lib/getStatic'

// import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'
import { userService } from '../../../services/user.service';
import { useEffect, useState } from 'react'

const Home = () => {
    const { t } = useTranslation(['common'])

    const [info, setInfo] = useState(undefined);

    useEffect(() => {
        const fetchInfos = async () => {
            const response = await userService.updateSelfInfo()
            return response.group;
        }
        fetchInfos().then(res => setInfo(res));
    }, [])

    return (
        <>
            <main>
                <Head>
                    <title>{t('title')}</title>
                </Head>
                <div className="flex items-center justify-left px-6 py-2 border-b border-stone-300 bg-stone-100">
                    <p>{t('who-are-you')}</p>
                </div>
                <div className="container mx-auto">
                    <div className="m-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                        {info && info.users.map( (member) => (
                                <Link
                                href={member.registered ? "/auth/home" : "/auth/register"}
                                className="border border-green-900 hover:bg-stone-200 font-semibold 
                                        text-black py-2 px-4 rounded"
                                key={member._id}
                                onClick={() => userService.setActiveMember(member) }
                                >
                                    <div className="flex justify-center items-center flex-wrap flex-col">
                                    <p>{member.firstName} {member.lastName}</p>
                                    <p className={member.registrationStatus == "Registered" ? "text-green-900 text-xs italic" : "text-red-600 text-xs italic"} >{member.registrationStatus == "Registered" ? t('registered') : t('not-registered')}</p>
                                    </div>
                                </Link>
                        ))}  
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default Home


// const getStaticProps = makeStaticProps(['second-page', 'common', 'footer'])
// export { getStaticPaths, getStaticProps }

// or if you want to merge the i18n props with other props...
export { getStaticPaths }
export const getStaticProps = async ctx => {
    // some data fetched from anywhere...
    //const someOtherData = 'hello world'
    return {
        props: {
            ...(await getI18nProps(ctx, [
                'common',
                'footer',
            ])),
            // someOtherData,
        },
    }
}
