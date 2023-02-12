import Link from '../../../components/Link'

import { useTranslation } from 'next-i18next'
import {
    getStaticPaths /*, makeStaticProps*/,
    getI18nProps,
} from '../../../lib/getStatic'

import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'
import { RegisterForm } from '../../../components/RegisterForm'

import { userService } from '../../../services/user.service';





const Register = () => {
    const { t } = useTranslation(['common'])

   

    return (
        <>
            <main>
                <Header title={t('title')} />
                <div className="flex items-center justify-left px-6 py-2 border-b border-stone-300 bg-stone-100">
                    <p>{t('register')}</p>
                </div>
                <div className="container mx-auto">
                    <div className="m-4 grid grid-cols-1 gap-4">
                        {userService.infoValue && userService.infoValue?.users.map((member) => (<RegisterForm key={member._id} member={member} />))}
                        <Link
                            
                            href="/auth/home"
                            className="text-center inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded 
                                                                shadow-md bg-green-900 hover:bg-stone-400 hover:shadow-lg focus:shadow-lg focus:outline-none 
                                                                focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                        >
                            {t('confirm')}
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default Register


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
