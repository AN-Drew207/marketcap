import * as React from 'react';
import type { AppProps } from 'next/app';
import clsx from 'clsx';
import { ThemeContext, ThemeType } from 'context';
import { QueryClientProvider, QueryClient } from 'react-query';
import 'styles/global-tailwind.css';
import 'styles/globals.scss';
import 'styles/fonts.scss';
import 'styles/styles-ant.scss';
import 'styles/index.scss';
import 'styles/fontawesome/fontawesome.css';
import Head from 'next/head';
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import AppLayoutApp from 'components/Layout';
import { CoinMarketProvider } from 'context/context';
import { GunProvider } from 'context/gunContext';
import Web3Provider from 'components/Web3Provider';
import { Toaster } from 'react-hot-toast';

function MyApp({
	Component,
	pageProps,
}: AppProps & { Component: any }): JSX.Element {
	const [theme, setTheme] = React.useState<ThemeType>('light');
	const queryClientRef = React.useRef<QueryClient | null>(null);

	if (!queryClientRef.current) {
		queryClientRef.current = new QueryClient();
	}

	return (
		<>
			<Head>
				<title>AN-Drew Marketcap</title>
				<meta name="description" content="" />
				<meta name="theme-color" content="#300" />
				<meta property="og:title" content="AN-Drew Marketcap" />
				<meta property="og:description" content="" />
				<meta property="og:image:width" content="300" />
				<meta property="og:image:height" content="200" />
				<meta property="og:title" content="AN-Drew Marketcap" />
				<meta property="og:site_name" content="AN-Drew Marketcap" />
				<meta name="viewport" content="initial-scale=1, width=device-width" />
				<link rel="icon" href="/logos/logo.png" />

				<meta
					name="p:domain_verify"
					content="435ca054f0bb2782922ffceb8a3f7314"
				/>
			</Head>
			<Provider store={store}>
				<Web3Provider>
					<CoinMarketProvider>
						{/* <GunProvider> */}
						<QueryClientProvider client={queryClientRef.current}>
							<ThemeContext.Provider value={{ theme, setTheme }}>
								<div
									className={clsx(
										'font-montserrat min-h-screen text-gray-800',
										'transition-colors duration-1000 bg-primary',
										theme
									)}
								>
									<AppLayoutApp />

									<Component {...pageProps} />
									<Toaster />
								</div>
							</ThemeContext.Provider>
						</QueryClientProvider>
						{/* </GunProvider> */}
					</CoinMarketProvider>
				</Web3Provider>
			</Provider>
		</>
	);
}

export default MyApp;
