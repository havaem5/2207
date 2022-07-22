import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Next.js App</title>
			</Head>
			<GoogleReCaptchaProvider reCaptchaKey={process.env.RECAPTCHA_PUBLIC as string}>
				<Component {...pageProps} />
			</GoogleReCaptchaProvider>
		</>
	);
}

export default MyApp;
