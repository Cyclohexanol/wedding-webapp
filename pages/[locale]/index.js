import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic'
import { useEffect, useState } from "react";
import i18nextConfig from '../../next-i18next.config'
// import Link from '../../components/Link'
import Head from 'next/head'
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

// import { Header } from '../../components/Header'
// import { Footer } from '../../components/Footer'
import LanguageSwitchLink from '../../components/LanguageSwitchLink'

import IntSVG from "../../public/images/global.svg";
import ChiliSVG from "../../public/images/chili.svg";
import { userService } from '../../services/user.service';
import { alertService } from '../../services/alert.service';

const Homepage = () => {
    const router = useRouter()
    const { t } = useTranslation(['common', 'footer'])
    const currentLocale =
        router.query.locale || i18nextConfig.i18n.defaultLocale

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Group name is required'),
        password: Yup.string().required('Access code is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    const [errorMessage, setErrorMessage] = useState(null);

    const [member, setMember] = useState(null)
    const [token, setToken] = useState(null)

    useEffect(() => {
        if (!token)
            setToken(localStorage.getItem("token"));
        if(!member)
            setMember(localStorage.getItem("member"));
    }, []);

    function onSubmit({ name, password }) {
        return userService.login(name, password)
            .then(() => {
                // get return url from query parameters or default to '/auth/user-select'
                const returnUrl = router.query.returnUrl || '/auth/user-select';
                router.push(returnUrl);
            })
            .catch((error) => {
                const message = error?.response?.data?.message || 'Invalid credentials';
                alertService.error(message);
                setErrorMessage(message);
            });
    }

    if (token && member) {
        router.push('/auth/home')
    } else if (token) {
        router.push('/auth/user-select')
    }

  return (
      <>
          <main>
              <Head>
                  <title>{t('title')}</title>
              </Head>
              <section className="h-full bg-stone-100 md:h-screen">
                  <div className="container mx-auto h-full py-6 px-6">
                      <div className="flex justify-center items-center flex-wrap h-full g-6 text-stone-800">
                          <div className="xl:w-10/12">
                              <div className="block bg-white shadow-lg rounded-lg">
                                  <div className="lg:flex lg:flex-wrap g-0">
                                      <div className="lg:w-6/12 flex flex-col items-center rounded-t-lg lg:rounded-l-lg lg:rounded-r-none bg-stone-200 pt-12">
                                          <ChiliSVG className="w-20 h-20 mr-4 justify-self-center" />
                                          <div className="flex flex-col text-black px-4 py-4 md:p-8 md:mx-6">
                                              
                                              <h4 className="text-xl font-semibold mb-6">{t('welcome-title')}</h4>
                                              <p className="text-sm mb-2">
                                                  {t('login-instructions')}
                                              </p>
                                              <p className="text-sm mb-1">
                                                  {t('login-issue')}
                                              </p>
                                          </div>
                                      </div>
                                      <div className="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none">
                                          <div className="text-black px-4 py-6 md:p-12 md:mx-6">
                                              <form onSubmit={handleSubmit(onSubmit)}>
                                                    <p className="mb-4 text-sm italic">{t('login-title')}</p>
                                                    <div className="mb-4">
                                                        <input
                                                            type="text"
                                                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-stone-700 bg-white bg-clip-padding border border-solid border-stone-300 rounded transition ease-in-out m-0 focus:text-stone-700 focus:bg-white focus:border-green-900 focus:outline-none"
                                                          id="name"
                                                          {...register('name')}
                                                            placeholder={t('username')}
                                                      />
                                                      <div className="invalid-feedback">{errors.name?.message}</div>
                                                      </div>
                                                      
                                                    <div className="mb-4">
                                                        <input
                                                            type="password"
                                                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-stone-700 bg-white bg-clip-padding border border-solid border-stone-300 rounded transition ease-in-out m-0 focus:text-stone-700 focus:bg-white focus:border-green-900 focus:outline-none"
                                                          id="password"
                                                          {...register('password')}
                                                            placeholder={t('password')}
                                                      />
                                                      <div className="invalid-feedback">{errors.password?.message}</div>
                                                  </div>

                                                  {errorMessage && (
                                                      <div className="mb-4 text-red-600 text-sm">
                                                          {errorMessage}
                                                      </div>
                                                  )}
                                                    <div className="text-center pt-1 mb-12 pb-1">
                                                            <button
                                                                className="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded 
                                                                shadow-md bg-green-900 hover:bg-stone-400 hover:shadow-lg focus:shadow-lg focus:outline-none 
                                                                focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                                                                type="submit"
                                                                disabled={formState.isSubmitting}
                                                                data-mdb-ripple="true"
                                                                data-mdb-ripple-color="light"
                                                          
                                                            >
                                                            {t('login')}
                                                            </button>

                                                    </div>
                                                </form>
                                              <div className="flex items-center">
                                                  <IntSVG className="w-6 h-6 mr-4" />
                                                  {i18nextConfig.i18n.locales.map(locale => {
                                                      if (locale === currentLocale) return null
                                                      return <LanguageSwitchLink locale={locale} key={locale} />
                                                  })}
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </section>
        </main>
    </>
  )
}

export default Homepage

const getStaticProps = makeStaticProps(['common', 'footer'])
export { getStaticPaths, getStaticProps }
