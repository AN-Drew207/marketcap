import { useState, useEffect } from 'react';
import CoinDetails from '../../components/coinDetails';

const Price = () => {
	const [coinName, setCoinName] = useState('');
	const [coinSymbol, setCoinSymbol] = useState('');
	const [price, setPrice] = useState('');

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);

		setCoinName(urlParams.get('coin') || '');
		setPrice(Number(urlParams.get('price'))?.toLocaleString());
		setCoinSymbol(urlParams.get('symbol') || '');
	};

	return (
		<div>
			<CoinDetails coinName={coinName} price={price} coinSymbol={coinSymbol} />
		</div>
	);
};

export default Price;
