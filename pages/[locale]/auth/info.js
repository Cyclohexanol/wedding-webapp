import Link from '../../../components/Link'

import { useTranslation } from 'next-i18next'
import {
    getStaticPaths /*, makeStaticProps*/,
    getI18nProps,
} from '../../../lib/getStatic'

import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'

const Info = () => {
    const { t } = useTranslation(['common'])

    return (
        <>
            <main>
                <Header title={t('title')} />
                <div className="m-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                    Info placeholder
                </div>
            </main>
            <Footer />
        </>
    )
}

export default Info


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
