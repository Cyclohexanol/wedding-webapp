import { appWithTranslation } from 'next-i18next'
import '../css/output.css'

const MyApp = ({ Component, pageProps }) => (
  <Component {...pageProps} />
)

export default appWithTranslation(MyApp)
