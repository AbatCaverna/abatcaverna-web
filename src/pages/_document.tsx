import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

const appName = 'ABatCaverna App'
const appDescription = 'O site da república ABatCaverna de Florestal'
const bannerImage = 'https://abatcaverna.app/abat-banner.png'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    return await Document.getInitialProps(ctx)
  }

  render() {
    return (
      <Html lang='pt-BR' dir='ltr'>
        <Head>
          <meta name='application-name' content={appName} />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='default' />
          <meta name='apple-mobile-web-app-title' content={appName} />
          <meta name='description' content={appDescription} />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='msapplication-config' content='/icons/browserconfig.xml' />
          <meta name='msapplication-TileColor' content='#FFC74A' />
          <meta name='msapplication-tap-highlight' content='no' />
          <meta name='theme-color' content='#000000' />

          <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
          <link rel='manifest' href='/manifest.json' />
          <link rel='mask-icon' href='/icons/maskable_icon.png' color='#FFC74A' />
          <link rel='shortcut icon' href='/favicon.ico' />
          
          {/* Twitter meta tags */}
          <meta name='twitter:card' content='summary' />
          <meta name='twitter:url' content='https://abatcaverna.app' />
          <meta name='twitter:title' content='ABatCaverna App' />
          <meta name='twitter:description' content='O site da república ABatCaverna de Florestal' />
          <meta name='twitter:image' content={bannerImage} />
          <meta name='twitter:creator' content='@AbatCaverna' />
          {/* Facebook meta tags  */}
          <meta property='og:type' content='website' />
          <meta property='og:title' content='ABatCaverna App' />
          <meta property='og:description' content='O site da república ABatCaverna de Florestal' />
          <meta property='og:site_name' content='ABatCaverna' />
          <meta property='og:url' content='https://abatcaverna.app' />
          <meta property='og:image' content={bannerImage} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}