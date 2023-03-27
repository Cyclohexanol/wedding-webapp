import { useTranslation } from "react-i18next";
import {
    getStaticPaths,
    getI18nProps,
} from '../../../lib/getStatic'
import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'
import { useEffect, useState } from "react";
import { userService } from "../../../services/user.service";
import { useRouter } from "next/router";

const Cash = () => {
    const { t } = useTranslation(['common'])

    const router = useRouter()

    const [cart, setCart] = useState([]);
    const [paymentInfo, setPaymentInfo] = useState(null);
    const [copied, setCopied] = useState({ name: false, address: false, iban: false, swift: false, bank: false });


    useEffect(() => {
        userService.updateSelfInfo()
        userService.getCart()
            .then(fetchedCart => {
                setCart(fetchedCart)
            }).catch(error => {
                console.error('Error fetching cart:', error);
            });

        userService.getPaymentInfo()
            .then(fetchedPaymentInfo => {
                setPaymentInfo(fetchedPaymentInfo);
            }).catch(error => {
                console.error('Error fetching payment info:', error);
            });
    }, [])

    const copyToClipboard = (text, key) => {
        navigator.clipboard.writeText(text);
        setCopied({ ...copied, [key]: true });
        setTimeout(() => {
            setCopied({ ...copied, [key]: false });
        }, 2000);
    };


    const handleEdit = () => {
        userService.markPaid(false)
        router.push('/auth/gift')
    }

    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <>
            <Header/>
            {cart.length > 0 ?
                <div className="max-w-5xl mx-auto mt-8">
                    <h1 className="text-3xl font-bold mb-8 text-center">{t('cash.purchase-thank-you')}</h1>
                    <table className="w-full table-fixed">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="w-1/2 px-4 py-2">{t('cash.table.name')}</th>
                                <th className="w-1/4 px-4 py-2">{t('cash.table.quantity')}</th>
                                <th className="w-1/4 px-4 py-2">{t('cash.table.total-price')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item, index) => (
                                <tr key={index} className="text-center border-b border-gray-200">
                                    <td className="px-4 py-2">{t(item.title)}</td>
                                    <td className="px-4 py-2">{item.quantity}</td>
                                    <td className="px-4 py-2">CHF {item.price * item.quantity}</td>
                                </tr>
                            ))}
                            <tr className="text-center font-bold">
                                <td className="px-4 py-2">{t('cash.table.total')}</td>
                                <td className="px-4 py-2"></td>
                                <td className="px-4 py-2">CHF {cartTotal}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="flex justify-center my-4">
                        <button onClick={handleEdit} className="text-center inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded 
                                                                    shadow-md bg-green-900 hover:bg-stone-400 hover:shadow-lg focus:shadow-lg focus:outline-none 
                                                                    focus:ring-0 active:shadow-lg transition duration-150 ease-in-out mb-3">
                            {t('cash.edit-cart-button')}
                        </button>
                    </div>
                </div>
                : null
            }
            <section className="bg-stone-100 py-8">
                <div className="max-w-5xl mx-auto px-4">
                    <h2 className="text-xl font-semibold mb-4">{t('cash.bank-details')}</h2>
                    <p className="text-gray-700">{t('cash.bank-details-instruction')}</p>
                    {paymentInfo && (
                        <div className="bg-white p-4 mt-4 rounded-md shadow-md">
                            <p onClick={() => copyToClipboard(paymentInfo.name, 'name')} className="cursor-pointer">
                                {copied.name ? <span className="font-bold text-green-900 border border-green-900 p-1 rounded">{t('cash.copied-to-clipboard')}</span> : paymentInfo.name}
                            </p>
                            <p onClick={() => copyToClipboard(paymentInfo.address, 'address')} className="cursor-pointer mt-4">
                                {copied.address ? <span className="font-bold text-green-900 border border-green-900 p-1 rounded">{t('cash.copied-to-clipboard')}</span> : paymentInfo.address}
                            </p>
                            <p onClick={() => copyToClipboard(paymentInfo.iban, 'iban')} className="cursor-pointer mt-4">
                                <strong>{t('cash.iban')}</strong>: {copied.iban ? <span className="font-bold text-green-900 border border-green-900 p-1 rounded">{t('cash.copied-to-clipboard')}</span> : paymentInfo.iban}
                            </p>
                            <p onClick={() => copyToClipboard(paymentInfo.swift, 'swift')} className="cursor-pointer mt-4">
                                <strong>{t('cash.swift')}</strong>: {copied.swift ? <span className="font-bold text-green-900 border border-green-900 p-1 rounded">{t('cash.copied-to-clipboard')}</span> : paymentInfo.swift}
                            </p>
                            <p onClick={() => copyToClipboard(paymentInfo.bank, 'bank')} className="cursor-pointer mt-4">
                                <strong>{t('cash.bank')}</strong>: {copied.bank ? <span className="font-bold text-green-900 border border-green-900 p-1 rounded">{t('cash.copied-to-clipboard')}</span> : paymentInfo.bank}
                            </p>
                        </div>
                    )}
                    <p className="text-gray-500 italic mt-1">{t('cash.copy-to-clipboard-instruction')}</p>
                </div>
            </section>


            <Footer />
        </>
    )

}

export default Cash

export { getStaticPaths }
export const getStaticProps = async ctx => {
    return {
        props: {
            ...(await getI18nProps(ctx, [
                'common',
                'footer',
            ])),
        },
    }
}
