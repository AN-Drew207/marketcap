import { createContext, useState, ContextType } from 'react';

import {
	dogeAbi,
	daiAbi,
	linkAbi,
	usdcAbi,
	dogeAddress,
	linkAddress,
	daiAddress,
	usdcAddress,
} from '../lib/constants';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

export const CoinMarketContext: any = createContext(null);

export const CoinMarketProvider = ({ children }: any) => {
	const router = useRouter();
	const { ethAddress: account } = useSelector((state: any) => state.state.user);
	const { network, networkName } = useSelector((state: any) => state.state);

	const [currentAccount, setCurrentAccount] = useState('');
	const [openBuyCryptoModal, setOpenBuyCryptoModal] = useState(false);
	const [fromToken, setFromToken] = useState('ETH');
	const [toToken, setToToken] = useState('');
	const [amount, setAmount] = useState('');

	const getContractAddress = () => {
		if (fromToken === 'Dai') return daiAddress;
		if (fromToken === 'Dogecoin') return dogeAddress;
		if (fromToken === 'Link') return linkAddress;
		if (fromToken === 'usdc') return usdcAddress;
	};

	const getToAddress = () => {
		if (toToken === 'Dai') return daiAddress;
		if (toToken === 'Dogecoin') return dogeAddress;
		if (toToken === 'Link') return linkAddress;
		if (toToken === 'Usdc') return usdcAddress;
	};

	const getToAbi = () => {
		if (toToken === 'Dai') return daiAbi;
		if (toToken === 'Dogecoin') return dogeAbi;
		if (toToken === 'Link') return linkAbi;
		if (toToken === 'Usdc') return usdcAbi;
	};

	const openModal = () => {
		setOpenBuyCryptoModal(true);
	};

	//Mint function for the token with send ether to the contract
	const mint = async () => {
		try {
			if (fromToken === 'ETH') {
				if (!account) {
					setOpenBuyCryptoModal(false);
					return router.push('/login');
				}

				if (fromToken === toToken)
					return toast.error("You can't swap the same token");

				console.log(amount, fromToken, toToken, 'HI');

				// 	const contractAddress = getToAddress();
				// 	const abi = getToAbi();
				// 	let options = {
				// 		contractAddress: contractAddress,
				// 		functionName: 'mint',
				// 		abi: abi,
				// 		params: {
				// 			to: currentAccount,
				// 			amount: Moralis.Units.Token(amount),
				// 		},
				// 	};
				// 	sendEth();
				// 	const transaction = await Moralis.executeFunction(options);
				// 	const receipt = await transaction.wait(4);
				// 	console.log(receipt);
				// } else {
				// 	swapTokens();
			} else {
				swapTokens();
			}
		} catch (error: any) {
			console.error(error.message);
		}
	};

	const swapTokens = async () => {
		try {
			console.log(amount, fromToken, toToken, 'HI');

			// if (!ethAddress) return;
			// await Moralis.enableWeb3();
			if (fromToken === toToken) return alert('You cannot swap the same token');
			// const fromOptions = {
			// 	type: 'erc20',
			// 	amount: Moralis.Units.Token(amount, '18'),
			// 	receiver: getContractAddress(),
			// 	contractAddress: getContractAddress(),
			// };
			// const toMintOptions = {
			// 	contractAddress: getToAddress(),
			// 	functionName: 'mint',
			// 	abi: getToAbi(),
			// 	params: {
			// 		to: currentAccount,
			// 		amount: Moralis.Units.Token(amount, '18'),
			// 	},
			// };
			// let fromTransaction = await Moralis.transfer(fromOptions);
			// let toMintTransaction = await Moralis.executeFunction(toMintOptions);
			// let fromReceipt = await fromTransaction.wait();
			// let toReceipt = await toMintTransaction.wait();
			// console.log(fromReceipt);
			// console.log(toReceipt);
		} catch (error: any) {
			console.error(error.message);
		}
	};

	//Send eth function
	const sendEth = async () => {
		// if (!isAuthenticated) return;
		// const contractAddress = getToAddress();
		// let options = {
		// 	type: 'native',
		// 	amount: Moralis.Units.ETH('0.01'),
		// 	receiver: contractAddress,
		// };
		// const transaction = await Moralis.transfer(options);
		// const receipt = await transaction.wait();
		// console.log(receipt);
	};

	const getTopTenCoins = async () => {
		try {
			const res = await fetch('/api/getTopTen');
			const data = await res.json();
			return data.data.data;
		} catch (e: any) {
			console.log(e.message);
		}
	};

	const getCurrency = async (id: string) => {
		try {
			console.log(id);
			const res = await fetch(`/api/getCurrency/${id}`);
			const data = await res.json();

			return data.data.data;
		} catch (e: any) {
			console.log(e.message);
		}
	};

	return (
		<CoinMarketContext.Provider
			value={{
				getCurrency,
				getTopTenCoins,
				openBuyCryptoModal,
				setOpenBuyCryptoModal,
				fromToken,
				toToken,
				setFromToken,
				setToToken,
				amount,
				setAmount,
				mint,
				sendEth,
				openModal,
			}}
		>
			{children}
		</CoinMarketContext.Provider>
	);
};
