import { useContext, useEffect, useState, useCallback } from 'react';
import btc from '../../assets/btc.png';
import { CoinMarketContext } from '../../context/context';
import CMCtableHeader from './cmcTableHeader';
import CMCtableRow from './cmcTableRow';

const CMCtable = () => {
	let context = useContext(CoinMarketContext);
	let [coinData, setCoinData] = useState(null);

	useEffect(() => {
		setData();
	}, [context]);

	const setData = useCallback(async () => {
		try {
			let apiResponse = await context.getTopTenCoins();
			let filteredResponse = [];
			console.log(apiResponse, 'api');
			for (let i = 0; i < apiResponse.length; i++) {
				const element = apiResponse[i];
				if (element.cmc_rank <= 10) filteredResponse.push(element);
			}

			setCoinData(filteredResponse);
		} catch (e) {
			console.log(e.message);
		}
	}, [context]);

	return (
		<div className="text-white font-bold w-full px-16">
			<div className="p-6 bg-[#750000] rounded-xl">
				<table className="w-full  ">
					<CMCtableHeader />

					{coinData && coinData ? (
						coinData.map((coin, index) => {
							return (
								<CMCtableRow
									key={index}
									starNum={coin.cmc_rank}
									coinName={coin.name}
									coinSymbol={coin.symbol}
									coinIcon={btc}
									showBuy={true}
									hRate={coin.quote.USD.percent_change_24h}
									dRate={coin.quote.USD.percent_change_7d}
									hRateIsIncrement={true}
									price={coin.quote.USD.price}
									marketCapValue={coin.quote.USD.market_cap}
									volumeCryptoValue={coin.quote.USD.volume_24h}
									volumeValue={coin.total_supply}
									circulatingSupply={coin.circulating_supply}
								/>
							);
						})
					) : (
						<></>
					)}
				</table>
			</div>
		</div>
	);
};

export default CMCtable;
