import Head from 'next/head';
import { ThemeProvider } from 'styled-components';

import '../assets/fonts/index.css';
import '../styles/global.css';
import '../styles/loading.min.css';
import '../styles/ldbtn.min.css';

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
