import languageDetector from '../lib/languageDetector'
import { useRouter } from 'next/router'
import Link from 'next/link'

const LanguageSwitchLink = ({ locale, ...rest }) => {
  const router = useRouter()

  let href = rest.href || router.asPath
  let pName = router.pathname
  Object.keys(router.query).forEach(k => {
    if (k === 'locale') {
      pName = pName.replace(`[${k}]`, locale)
      return
    }
    pName = pName.replace(`[${k}]`, router.query[k])
  })
  if (locale) {
    href = rest.href ? `/${locale}${rest.href}` : pName
  }

  return (
    <Link href={href}>
      <button
              className="bg-transparent hover:bg-stone-600 text-stone-600 font-semibold hover:text-white py-2 px-4 border border-stone-600 hover:border-transparent rounded"
        onClick={() => languageDetector.cache(locale)}
      >
        {locale}
      </button>
    </Link>
  )
}

export default LanguageSwitchLink
