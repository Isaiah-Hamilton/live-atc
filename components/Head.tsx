import Head from 'next/head'

interface Props {
  title?: string
}

const Header = (props: Props) => {
  const { title } = props
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="description"
        content="Live ATC - Listen to real time ATC (Air Traffic Control) audio"
      />
      <meta name="author" content="Isaiah Hamilton" />
      <meta name="author" content="Isaiah-Hamilton" />
      <meta name="author" content="Isaiah7Hamilton" />
      <link rel="apple-touch-icon" href="/live-atc.png" />
      <link rel="shortcut icon" href="/live-atc.png" />
      <meta name="twitter:card" content="/card.png" />
      <meta name="twitter:site" content="@Isaiah7Hamilton" />
      <meta name="twitter:creator" content="@Isaiah7Hamilton" />
      <meta name="twitter:image" content="/card.png" />
      <meta property="og:site_name" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/card.png" />
    </Head>
  )
}

export default Header
