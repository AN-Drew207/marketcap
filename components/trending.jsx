import React, { useContext, useState } from 'react';
import Rate from './cmc-table/rate';
import fire from '../assets/fire.png';
import btc from '../assets/btc.png';
import usdc from '../assets/usdc.png';
import usdt from '../assets/usdt.png';
import xrp from '../assets/xrp.png';
import gainers from '../assets/gainers.png';
import recent from '../assets/recent.png';
import TrendingCard from './trendingCard';
import ReactSwitch from 'react-switch';
import { CoinMarketContext } from 'context/context';

const styles = {
	trendingWrapper: `max-w-screen-[95vw] w-full px-16`,
	h1: `text-3xl Raleway font-bold text-white`,
	flexCenter: `flex items-center,`,
};

const Trending = () => {
	const [checked, setChecked] = useState(false);

	const trendingData = [
		{
			number: 1,
			symbol: 'BTC',
			name: 'Bitcoin',
			icon: btc,
			isIncrement: true,
			rate: '2.34%',
		},
		{
			number: 2,
			symbol: 'USDT',
			name: 'Tether',
			icon: usdt,
			isIncrement: true,
			rate: '2.32%',
		},
		{
			number: 3,
			symbol: 'USDC',
			name: 'USD Coin',
			icon: usdc,
			isIncrement: false,
			rate: '15.40%',
		},
	];

	const gainersData = [
		{
			number: 1,
			symbol: 'XRP',
			name: '',
			icon: xrp,
			isIncrement: true,
			rate: '10.45%',
		},
		{
			number: 2,
			symbol: 'BTC',
			name: 'Bitcoin',
			icon: btc,
			isIncrement: true,
			rate: '2.34%',
		},
		{
			number: 3,
			symbol: 'USDT',
			name: 'Tether',
			icon: usdt,
			isIncrement: true,
			rate: '2.32%',
		},
	];

	const recentlyData = [
		{
			number: 1,
			symbol: 'USDC',
			name: 'USD Coin',
			icon: usdc,
			isIncrement: false,
			rate: '15.40%',
		},
		{
			number: 2,
			symbol: 'XRP',
			name: '',
			icon: xrp,
			isIncrement: true,
			rate: '10.45%',
		},
		{
			number: 3,
			symbol: 'USDT',
			name: 'Tether',
			icon: usdt,
			isIncrement: true,
			rate: '2.32%',
		},
	];

	return (
		<div className="text-white flex flex-col items-center justify-center pt-16">
			<div className={styles.trendingWrapper}>
				<div className="flex justify-between">
					<h1 className={styles.h1}>
						Todays Cryptocurrency Prices by Market Cap
					</h1>

					<div className="flex">
						<p className="text-gray-400 ">Highlights &nbsp;</p>
						<ReactSwitch
							checked={checked}
							onChange={() => {
								setChecked(!checked);
							}}
						/>
					</div>
				</div>
				<br />
				<div className="flex text-white">
					<p>The global crypto market cap is $1.74T, a &nbsp; </p>
					<span>
						{' '}
						<Rate isIncrement={true} rate="0.53%" />{' '}
					</span>
					<p>
						{' '}
						&nbsp; {'increase'} over the last day.{' '}
						{/* <span className="underline">Read More</span>{' '} */}
					</p>
				</div>
				<br />

				<div className={styles.flexCenter}>
					<TrendingCard
						title="Trending"
						icon={fire}
						trendingData={trendingData}
					/>
					<TrendingCard
						title="Biggest Gainers"
						icon={gainers}
						trendingData={gainersData}
					/>
					<TrendingCard
						title="Recently Added"
						icon={recent}
						trendingData={recentlyData}
					/>
				</div>
			</div>
		</div>
	);
};

export default Trending;
