import Head from 'next/head';
import { ThemeProvider } from 'styled-components';

const theme = {};

export default ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Transformers</title>
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};
