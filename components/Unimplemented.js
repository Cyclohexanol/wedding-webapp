import { useTranslation } from 'next-i18next';

export const Unimplemented = ({ message = '' }) => {
    const { t } = useTranslation(['common']);

    return (

        <div className="border border-stone-900 bg-stone-200 text-block py-2 px-4 m-4 rounded flex flex-col lg:max-w-3xl lg:mx-auto">
            <h1 className="text-l font-bold mb-4">{t('unimplemented.title')}</h1>
            <p className="text-sm">{message || t('unimplemented.message')}</p>
        </div>
    );
};
