import Document, { Html, Head, Main, NextScript } from "next/document";
import * as gtag from "../lib/gtag";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="description" content="Rent a Roof" />
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="/icons/favicon/apple-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="/icons/favicon/apple-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/icons/favicon/apple-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/icons/favicon/apple-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/icons/favicon/apple-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/icons/favicon/apple-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/icons/favicon/apple-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/icons/favicon/apple-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/icons/favicon/apple-icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/icons/favicon/android-icon-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/icons/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/icons/favicon/favicon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/icons/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/icons/favicon/manifest.json" />
          <meta name="msapplication-TileColor" content="#2196f3" />
          <meta
            name="msapplication-TileImage"
            content="/icons/favicon/ms-icon-144x144.png"
          />
          <meta name="theme-color" content="#2196f3" />
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          {gtag.GA_ADS_ID && (
            <script
              async
              data-ad-client={gtag.GA_ADS_ID}
              src="http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
            ></script>
          )}
          {gtag.GA_TRACKING_ID && (
            <>
              <script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
              ></script>
              <script
                id="gtag-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
                }}
              ></script>
            </>
          )}
        </Head>
        <body>
          <div id="portal" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
