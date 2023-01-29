import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic'
import i18nextConfig from '../../next-i18next.config'

import { Header } from '../../components/Header'
// import { Footer } from '../../components/Footer'
import LanguageSwitchLink from '../../components/LanguageSwitchLink'

import IntSVG from "../../public/images/global.svg";

const Homepage = () => {
    const router = useRouter()
    const { t } = useTranslation(['common', 'footer'])
    const currentLocale =
        router.query.locale || i18nextConfig.i18n.defaultLocale

  return (
    <>
        <main>
              <Header heading="" title={t('title')} />
              <section className="h-full gradient-form bg-stone-200 md:h-screen">
                  <div className="container py-12 px-6 h-full">
                      <div className="flex justify-center items-center flex-wrap h-full g-6 text-stone-800">
                          <div className="xl:w-10/12">
                              <div className="block bg-white shadow-lg rounded-lg">
                                  <div className="lg:flex lg:flex-wrap g-0">
                                      <div className="lg:w-6/12 flex items-center rounded-t-lg lg:rounded-l-lg  lg:rounded-r-none bg-stone-400">
                                          <div className="text-white px-4 py-6 md:p-12 md:mx-6">
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
                                              <form>
                                                  <p className="mb-4 text-sm italic">{t('login-title')}</p>
                                                  <div className="mb-4">
                                                      <input
                                                          type="text"
                                                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-stone-700 bg-white bg-clip-padding border border-solid border-stone-300 rounded transition ease-in-out m-0 focus:text-stone-700 focus:bg-white focus:border-lime-700 focus:outline-none"
                                                          id="exampleFormControlInput1"
                                                          placeholder={t('username')}
                                                      />
                                                  </div>
                                                  <div className="mb-4">
                                                      <input
                                                          type="password"
                                                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-stone-700 bg-white bg-clip-padding border border-solid border-stone-300 rounded transition ease-in-out m-0 focus:text-stone-700 focus:bg-white focus:border-lime-700 focus:outline-none"
                                                          id="exampleFormControlInput1"
                                                          placeholder={t('password')}
                                                      />
                                                  </div>
                                                  <div className="text-center pt-1 mb-12 pb-1">
                                                      <button
                                                          className="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md bg-lime-700 hover:bg-stone-400 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                                                          type="button"
                                                          data-mdb-ripple="true"
                                                          data-mdb-ripple-color="light"
                                                      >
                                                          {t('login')}
                                                      </button>
                                                  </div>
                                              </form>
                                              <p className="flex items-center">
                                                  <div className="mr-4">{t('switch-laguage')}</div>
                                                  {i18nextConfig.i18n.locales.map(locale => {
                                                      if (locale === currentLocale) return null
                                                      return <LanguageSwitchLink locale={locale} key={locale} />
                                                  })}
                                              </p>
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
