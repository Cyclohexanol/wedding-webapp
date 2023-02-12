import Link from '../../../components/Link'

import { useTranslation } from 'next-i18next'
import {
    getStaticPaths /*, makeStaticProps*/,
    getI18nProps,
} from '../../../lib/getStatic'

import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'

const Gift = () => {
    const { t } = useTranslation(['common'])

    return (
        <>
            <main>
                <Header title={t('title')} />
                <div className="flex items-center justify-left px-6 py-2 border-b border-stone-300 bg-stone-100">
                    {t('wish-list-explaination')}
                </div>
                <div className="m-4 grid grid-cols-1 gap-4">
                    <div className="bg-stone-100 border border-green-900 hover:bg-stone-200 font-semibold text-block py-2 px-4 rounded flex flex-col">
                        <p>Something</p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default Gift


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
