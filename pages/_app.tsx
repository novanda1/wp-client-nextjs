import globalStyles from '../styles/globalStyles';
import { DefaultSeo } from 'next-seo';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '../lib/constants';
import React from 'react';

const App: React.FC<{ Component: any; pageProps: any }> = ({ Component, pageProps }) => {
    globalStyles();
    return (
        <>
            <DefaultSeo
                title={SITE_NAME + ' - ' + SITE_DESCRIPTION}
                openGraph={{
                    type: 'website',
                    locale: 'en_IE',
                    url: SITE_URL,
                    site_name: SITE_NAME,
                }}
                twitter={{
                    handle: '@handle',
                    site: '@site',
                    cardType: 'summary_large_image',
                }}
            />
            <Component {...pageProps} />
        </>
    );
};

export default App;
