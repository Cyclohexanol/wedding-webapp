import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import LanguageSwitchLink from './LanguageSwitchLink'

import i18nextConfig from '../next-i18next.config'

import IntSVG from "../public/images/global.svg";
import ChiliSVG from "../public/images/chili.svg";

export const Footer = () => {
  const router = useRouter()
  const { t } = useTranslation('common')
  const currentLocale =
    router.query.locale || i18nextConfig.i18n.defaultLocale

  return (
      <footer className="text-center lg:text-left bg-stone-100 text-stone-600">
          <div className="flex justify-center items-center gap-6 lg:justify-evenly p-6 border-b text-center bg-stone-200">
              <div className="flex items-center justify-center">
                  <IntSVG className="w-6 h-6 mr-4" />
                  {i18nextConfig.i18n.locales.map(locale => {
                      if (locale === currentLocale) return null
                      return <LanguageSwitchLink locale={locale} key={locale} />
                  })}
              </div>
              <div className="flex flex-col items-center justify-center">
                  <p>
                      {t('dev-by')}
                  </p>
                  <div className="flex gap-2 ">
                      <span>{t('copyright-text')}</span>
                      <ChiliSVG className="hover:stroke-white w-6 h-6" />
                      <span>{t('copyright-text-2')}</span>
                  </div>
                  
              </div>
          </div>
    </footer>
  )
}
