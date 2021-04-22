import globalStyles from "../styles/globalStyles";
import { DefaultSeo } from "next-seo";

const App = ({ Component, pageProps }) => {
  globalStyles();
  return (
    <>
      <DefaultSeo
        title={process.env.SITE_NAME + " - " + process.env.SITE_DESCRIPTION}
        openGraph={{
          type: "website",
          locale: "en_IE",
          url: process.env.SITE_URL || "http://localhost:3000",
          site_name: process.env.SITE_NAME,
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <Component {...pageProps} />
    </>
  );
};

export default App;
