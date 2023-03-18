import Link from '../../../components/Link';

import { useTranslation } from 'next-i18next';
import { getStaticPaths, getI18nProps } from '../../../lib/getStatic';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';

const Info = () => {
    const { t } = useTranslation(['common']);

    return (
        <>
            <main>
                <Header title={t('title')} />
                <div className="m-4">
                    <h1 className="text-2xl font-bold mb-4">{t('info.wedding.title')}</h1>
                    <section className="flex flex-col md:flex-row md:justify-between space-y-4 md:space-y-0 mt-8">
                        <div className="md:w-1/3">
                            <h2 className="text-xl font-semibold mb-2">
                                {t('info.wedding.details.when')}
                            </h2>
                            <p className="text-lg">
                                {t('info.wedding.details.date')}
                            </p>
                        </div>
                        <div className="md:w-1/3">
                            <h2 className="text-xl font-semibold mb-2">
                                {t('info.wedding.details.where')}
                            </h2>
                            <p className="text-lg">
                                {t('info.wedding.details.location')}
                            </p>
                        </div>
                        <div className="md:w-1/3">
                            <h2 className="text-xl font-semibold mb-2">
                                {t('info.wedding.details.transport')}
                            </h2>
                            <ul className="list-disc list-inside pl-5">
                                <li>
                                    <strong>{t('info.wedding.details.car')}:</strong> {t('info.wedding.details.by-car')}
                                </li>
                                <li>
                                    <strong>{t('info.wedding.details.tain')}:</strong> {t('info.wedding.details.by-train')}
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mt-4">
                            {t('info.wedding.accommodation.title')}
                        </h2>
                        <p>{t('info.wedding.accommodation.description')}</p>
                        <ul className="list-disc list-inside pl-5">
                            <li>
                                <a href="https://www.moderntimeshotel.ch/" target="_blank" rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline">
                                    {t('info.wedding.accommodation.hotel1')}
                                </a>
                            </li>
                            <li>
                                <a href="https://visionapartments.com/en-gb/search/vevey" target="_blank" rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline">
                                    {t('info.wedding.accommodation.hotel2')}
                                </a>
                            </li>
                            <li>{t('info.wedding.accommodation.camping')}</li>
                        </ul>
                    </section>
                </div>
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
