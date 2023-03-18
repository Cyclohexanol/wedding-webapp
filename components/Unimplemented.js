import { useTranslation } from 'next-i18next';

export const Unimplemented = ({ message = '' }) => {
    const { t } = useTranslation(['common']);

    return (
        <div className="border border-green-900 bg-stone-100 font-semibold text-block py-2 px-4 rounded flex flex-col m-4">
            <h1 className="text-2xl font-bold mb-4">{t('unimplemented.title')}</h1>
            <p className="text-lg">{message || t('unimplemented.message')}</p>
        </div>
    );
};
