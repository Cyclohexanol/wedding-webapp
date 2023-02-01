import Link from '../../../components/Link'
import Head from 'next/head'

import { useTranslation } from 'next-i18next'
import {
    getStaticPaths /*, makeStaticProps*/,
    getI18nProps,
} from '../../../lib/getStatic'

// import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'

const Home = () => {
    const { t } = useTranslation(['common'])
    const family = [
        {
            firstName: 'James',
            lastName: 'Brown',
            registered: false,
            diet: 'none',
            allergies: 'none',
            songRequest: 'none'
        },
        {
            firstName: 'Jessy',
            lastName: 'Brown',
            registered: false,
            diet: 'none',
            allergies: 'none',
            songRequest: 'none'
        },
        {
            firstName: 'John',
            lastName: 'Brown',
            registered: true,
            diet: 'none',
            allergies: 'none',
            songRequest: 'none'
        }
    ]
            

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
                        {family.map( (member) => (
                                <Link
                                href={member.registered ? "/auth/home" : "/auth/register"}
                                    className="bg-green-900 hover:bg-stone-400 font-semibold 
                                        text-white py-2 px-4 rounded"
                                >
                                    <div className="flex justify-center items-center flex-wrap flex-col">
                                        <p>{member.firstName} {member.lastName}</p>
                                    <p className="text-xs italic">{member.registered ? t('registered') : t('not-registered')}</p>
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
