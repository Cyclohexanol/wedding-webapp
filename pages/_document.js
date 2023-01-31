import Document, {
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document'
import i18nextConfig from '../next-i18next.config'

class MyDocument extends Document {
  render() {
    const currentLocale =
      this.props.__NEXT_DATA__.query.locale ||
      i18nextConfig.i18n.defaultLocale
    return (
      <Html lang={currentLocale}>
        <Head>
              <link
                    rel="shortcut icon"
                    href="/favicon.ico"
                />
        </Head>
        <body>
          <Main />
                <NextScript />
                <div id="logout-modal" />
        </body>
      </Html>
    )
  }
}

export default MyDocument
