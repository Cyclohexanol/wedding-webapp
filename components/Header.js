import Head from 'next/head'

export const Header = ({ heading, title }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    <h2>
      next-language-detector example
      <hr />
    </h2>
    <h1>{heading}</h1>
  </>
)
