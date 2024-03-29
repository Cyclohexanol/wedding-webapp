import Link from '../../../components/Link';

import { useTranslation } from 'next-i18next';
import { getStaticPaths, getI18nProps } from '../../../lib/getStatic';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';

const Info = () => {
    const { t } = useTranslation(['common']);

    return (
        <>
            <Header title={t('title')} />

            <main className="bg-white">
                <section className="max-w-5xl mx-auto py-12">
                    <div className="max-w-2xl mx-auto">
                        <h1 className="text-xl font-bold mb-8 text-center">
                            {t('info.wedding.title')}
                        </h1>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="border border-stone-900 bg-stone-100 rounded-lg shadow-lg mx-4">
                                <div className="p-6">
                                    <h2 className="text-lg font-semibold mb-4">
                                        {t('info.wedding.details.when')}
                                    </h2>
                                    <p className="text-sm">{t('info.wedding.details.date')}</p>
                                </div>
                            </div>

                            <div className="border border-stone-900 bg-stone-100 rounded-lg shadow-lg mx-4">
                                <div className="p-6 text-sm">
                                    <h2 className="text-lg font-semibold mb-4">
                                        {t('info.wedding.details.where')}
                                    </h2>
                                    <p>{t('info.wedding.details.location')}</p>
                                    <p>
                                        <a
                                            href="https://www.google.com/maps/place/Sent.+des+Ruerettes+39,+1800+Vevey/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline"
                                        >
                                            {t('info.wedding.details.map')}
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="border border-stone-900 bg-stone-100 rounded-lg shadow-lg mx-4 mb-4">
                            <div className="p-6">
                                <h2 className="text-lg font-semibold mb-4">
                                    {t('info.wedding.details.transport')}
                                </h2>
                                <ul className="list-disc list-inside pl-5 text-sm">
                                    <li>
                                        <strong>{t('info.wedding.details.car')}:</strong>{' '}
                                        {t('info.wedding.details.by-car')}
                                    </li>
                                    <li>
                                        <strong>{t('info.wedding.details.tain')}:</strong>{' '}
                                        {t('info.wedding.details.by-train')}
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="border border-stone-900 bg-stone-100 rounded-lg shadow-lg mx-4 mb-4">
                            <div className="p-6">
                                <h2 className="text-lg font-semibold mb-4">
                                    {t('info.wedding.accommodation.title')}
                                </h2>
                                <p className="text-sm mb-6">
                                    {t('info.wedding.accommodation.description')}
                                </p>
                                <ul className="list-disc list-inside pl-5 text-sm">
                                    <li>
                                        <a
                                            href="https://www.moderntimeshotel.ch/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline"
                                        >
                                            {t('info.wedding.accommodation.hotel1')}
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://visionapartments.com/en-gb/search/vevey"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline"
                                        >
                                            {t('info.wedding.accommodation.hotel2')}
                                        </a>
                                    </li>
                                    <li>{t('info.wedding.accommodation.camping')}</li>
                                </ul>
                            </div>
                        </div>

                        <div className="border border-stone-900 bg-stone-100 rounded-lg shadow-lg mx-4 mb-4">
                            <div className="p-6">
                                <h2 className="text-lg font-semibold mb-4">
                                    {t('info.wedding.details.brunch')}
                                </h2>
                                <p className="text-sm mb-6">
                                    {t('info.wedding.details.brunch-details')}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
};

export default Info;

export { getStaticPaths };
export const getStaticProps = async (ctx) => {
    return {
        props: {
            ...(await getI18nProps(ctx, ['common', 'footer'])),
        },
    };
};
