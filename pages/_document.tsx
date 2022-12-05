import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@200&family=Roboto:wght@300&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#334155" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
