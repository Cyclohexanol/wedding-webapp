import Link from '../../../components/Link';
import { useTranslation } from 'next-i18next';
import { getStaticPaths, getI18nProps } from '../../../lib/getStatic';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';

const Seating = () => {
    const { t } = useTranslation(['common']);

    return (
        <>
            <main>
                <Header title={t('title')} />
                <div className="m-4">
                    <h1 className="text-2xl font-bold mb-4">Hello World Seating</h1>
                </div>
            </main>

            <Footer />
        </>
    );
};

export default Seating;

export { getStaticPaths };
export const getStaticProps = async (ctx) => {
    return {
        props: {
            ...(await getI18nProps(ctx, ['common', 'footer'])),
        },
    };
};
