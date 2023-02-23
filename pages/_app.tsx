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
          content="Discover how you can monitor your website's performance with just a few clicks. Try it now and compare your site's performance with others in your industry."
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
