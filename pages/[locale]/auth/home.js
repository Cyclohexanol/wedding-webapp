import Link from '../../../components/Link'

import { useTranslation } from 'next-i18next'
import {
    getStaticPaths /*, makeStaticProps*/,
    getI18nProps,
} from '../../../lib/getStatic'

import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'

import GiftSVG from "../../../public/images/gift.svg";
import RegisterSVG from "../../../public/images/clipboard.svg";
import InformationSVG from "../../../public/images/information.svg";

const Home = () => {
    const { t } = useTranslation(['common'])

    return (
        <>
            <main>
                <Header title={t('title')} />
                <div className="container mx-auto">
                    <div className="m-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                        <Link
                            href="/auth/register"
                            className="bg-transparent hover:bg-stone-400 text-black font-semibold 
                                    hover:text-white py-2 px-4 border border-stone-600 hover:border-transparent rounded"
                        >
                            <div className="flex justify-center items-center flex-wrap flex-col">
                                <RegisterSVG className="w-12 h-12 m-2 hover:stroke-white" />
                                <p>{t('register')}</p>
                            </div>
                        </Link>
                        <Link
                            href="/auth/gift"
                            className="bg-transparent hover:bg-stone-400 text-black font-semibold 
                                    hover:text-white py-2 px-4 border border-stone-600 hover:border-transparent rounded"
                        >
                            <div className="flex justify-center items-center flex-wrap flex-col">
                                <GiftSVG className="w-12 h-12 m-2 hover:stroke-white" />
                                <p>{t('wish-list')}</p>
                            </div>
                        </Link>
                        <Link
                            href="/auth/info"
                            className="bg-transparent hover:bg-stone-400 text-black font-semibold 
                                    hover:text-white py-2 px-4 border border-stone-600 hover:border-transparent rounded"
                        >
                            <div className="flex justify-center items-center flex-wrap flex-col">
                                <InformationSVG className="w-12 h-12 m-2 hover:stroke-white" />
                                <p>{t('useful-info')}</p>
                            </div>
                        </Link>
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