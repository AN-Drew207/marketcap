import CMCpriceConverter from '../../components/priceConverter';

import solana from '../../assets/solana.png';
import Usd from '../../assets/svg/usd';
import { useContext, useEffect, useState } from 'react';
import Graph from '../../components/graph';
import Chat from '../../components/chat';
import { CoinMarketContext } from 'context/context';

const styles = {
	activeTab: `p-1 px-2 mr-2 rounded-lg bg-	`,
	tabItem: `px-2`,
	tabContainer: `flex items-center p-2 rounded-xl bg-overlay border border-gray-500/10 text-sm`,
	info: `min-h-screen bg-overlay`,
	main: `text-white px-16 w-full`,
	flexStart: `flex items-start`,
	flexBetween: `flex justify-between`,
	flexBetweenCenter: `flex justify-between items-center`,
	tabContainerWrapper: `p-10 pl-0 pr-0 w-2/3`,
	flexCenter: `flex items-center justify-center w-full`,
};

const Currencies = () => {
	const [coinName, setCoinName] = useState('');
	const [coinSymbol, setCoinSymbol] = useState('');
	const [coinIcon, setCoinIcon] = useState('');
	const [price, setPrice] = useState('');
	let { getCurrency } = useContext(CoinMarketContext);

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);

		const id = urlParams.get('id');
		const res = await getCurrency(id);
		console.log(res);
		setCoinName(res[id].name);
		setCoinIcon(res[id].logo);
		setPrice(Number(urlParams.get('price')).toLocaleString());
		setCoinSymbol(res[id].symbol);
	};

	return (
		<div className={styles.info}>
			<main className={styles.main}>
				<div className={styles.flexCenter}>
					<div className={styles.tabContainerWrapper}>
						<div className={styles.flexBetween}>
							<div className={styles.tabContainer}>
								<p className={styles.activeTab}>Price</p>
								<p className={styles.tabItem}>Market Cap</p>
								<p className={styles.tabItem}>Trading View</p>
								<p className={styles.tabItem}>History</p>
							</div>

							<div className={styles.tabContainer}>
								<p className={styles.activeTab}>1D</p>
								<p className={styles.tabItem}>2D</p>
								<p className={styles.tabItem}>1M</p>
								<p className={styles.tabItem}>3M</p>
								<p className={styles.tabItem}>1Y</p>
								<p className={styles.tabItem}>YTD</p>
								<p className={styles.tabItem}>ALL</p>
								<p className={styles.tabItem}>LOG</p>
							</div>
						</div>
						<br />
						<Graph />
						<br />
						<div className={styles.flexBetweenCenter}>
							<div className="flex">
								<div className={'flex items-center justify-center gap-2'}>
									<input className="outline-none flex" type="checkbox" /> USD
								</div>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								<div className={'flex items-center justify-center gap-2'}>
									<input type="checkbox" /> BTC
								</div>
							</div>

							<p>
								Want more data?{' '}
								<a
									href="https://coinmarketcap.com/api/"
									target="_blank"
									className="text-primary cursor-pointer"
								>
									Check out CMC API
								</a>
							</p>
						</div>
						<br />
						<br />
						<CMCpriceConverter
							from={coinName}
							coinIcon={<img src={coinIcon} className="w-14" />}
							fromSymbol={coinSymbol}
							fromLogo={solana}
							toLogo={<Usd />}
							price={price}
							to="United States Dollars"
							toSymbol="USD"
						/>
					</div>

					{/* <div className="pt-10 ml-5">
						<Chat />
					</div> */}
				</div>
			</main>
		</div>
	);
};

export default Currencies;
