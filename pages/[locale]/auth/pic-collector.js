import { useTranslation } from 'next-i18next';
import { getStaticPaths, getI18nProps } from '../../../lib/getStatic';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { Unimplemented } from '../../../components/Unimplemented';

const PicCollector = () => {
    const { t } = useTranslation(['common']);

    return (
        <>
            <main>
                <Header title={t('title')} />
                < Unimplemented message={t('unimplemented.pic-collector-message')} />
            </main>

            <Footer />
        </>
    );
};

export default PicCollector;

export { getStaticPaths };
export const getStaticProps = async (ctx) => {
    return {
        props: {
            ...(await getI18nProps(ctx, ['common', 'footer'])),
        },
    };
};
