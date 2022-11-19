import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Monitoring Links - Best Way to Monitor your Website Link</title>
        <meta
          name="description"
          content="Check out this! Here you can monitor your website with just a few clicks. Try it now and you even can compare with other sites."
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
