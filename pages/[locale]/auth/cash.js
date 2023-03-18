import { useTranslation } from "react-i18next";
import {
    getStaticPaths,
    getI18nProps,
} from '../../../lib/getStatic'
import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'
import WishItem from '../../../components/WishItem';
import CartBanner from '../../../components/CartBanner';
import { useEffect, useState } from "react";

const Cash = () => {

    const [cart, setCart] = useState(undefined);

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem('cart')))
        console.log(cart)
    }, [])

    return (
        <>
            <Header />
            { cart ? 
                <div>
                    <h1>Thank you for your purchase!</h1>
                </div>
            : null
            }
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
