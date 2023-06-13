import { useState } from 'react';
import { Magic } from 'magic-sdk';
import { ConnectExtension } from '@magic-ext/connect';
import Web3 from 'web3';
import BottleCollectionABI from '../contracts/MezcalCollection.json';
import ERC20ABI from '../contracts/ERC20.json';
import BottleExchangeABI from '../contracts/BottleExchange.json';
import bottlesTestnet from 'bottles_mumbai.json';
import { onUpdateUser } from 'redux/actions';
import toast from 'react-hot-toast';
import { multiply } from 'components/common/multiply';

export default function useMagicLink() {
	const [account, setAccount] = useState<any>(null);
	const [loading, setLoading] = useState<any>(null);
	const [web3, setWeb3] = useState<any>(null);
	const [magic, setMagic] = useState<any>(null);
	const [isAuthenticated, setIsAuthenticated] = useState<any>(false);
	const [provider, setProvider] = useState<any>(null);

	if (
		typeof window !== 'undefined' &&
		magic == null &&
		process.env.NEXT_PUBLIC_MAGIC_KEY
	) {
		// Client-side-only code
		const key = process.env.NEXT_PUBLIC_MAGIC_KEY
			? process.env.NEXT_PUBLIC_MAGIC_KEY
			: '';
		const chainId = process.env.NEXT_PUBLIC_POLYGON_ID
			? process.env.NEXT_PUBLIC_POLYGON_ID
			: '';
		const rpcUrl = process.env.NEXT_PUBLIC_SECONDARY_RPC
			? process.env.NEXT_PUBLIC_SECONDARY_RPC
			: '';
		console.log(chainId, rpcUrl);
		const magic = new Magic(key, {
			network: {
				rpcUrl: rpcUrl,
				chainId: parseInt(chainId),
			},
			locale: 'en_US',
			extensions: [new ConnectExtension()],
		});
		setMagic(magic);
		setWeb3(new Web3(magic.rpcProvider));
		setProvider(magic.rpcProvider);
	}

	const login = async (dispatch: any) => {
		setLoading(true);
		try {
			const key = process.env.NEXT_PUBLIC_MAGIC_KEY
				? process.env.NEXT_PUBLIC_MAGIC_KEY
				: '';
			const chainId = process.env.NEXT_PUBLIC_POLYGON_ID
				? process.env.NEXT_PUBLIC_POLYGON_ID
				: '';
			const rpcUrl = process.env.NEXT_PUBLIC_SECONDARY_RPC
				? process.env.NEXT_PUBLIC_SECONDARY_RPC
				: '';
			const magic = new Magic(key, {
				network: {
					rpcUrl: rpcUrl,
					chainId: parseInt(chainId),
				},
				locale: 'en_US',
				extensions: [new ConnectExtension()],
			});
			const web3 = new Web3(magic.rpcProvider);
			console.log(web3, magic);
			const publicAddress = (await web3.eth.getAccounts())[0];
			setAccount(publicAddress);
			dispatch(
				onUpdateUser({
					ethAddress: publicAddress,
					provider: provider,
					providerName: 'magic',
				})
			);
			setIsAuthenticated(true);

			setLoading(false);
			return true;
		} catch (error) {
			console.log(error, 'aqui');
			setLoading(false);

			return false;
		}
	};

	const sendTransaction = async () => {
		const publicAddress = (await web3.eth.getAccounts())[0];
		const txnParams = {
			from: publicAddress,
			to: publicAddress,
			value: web3.utils.toWei('0.01', 'ether'),
			gasPrice: web3.utils.toWei('30', 'gwei'),
		};
		web3.eth
			.sendTransaction(txnParams as any)
			.on('transactionHash', (hash: any) => {
				console.log('the txn hash that was returned to the sdk:', hash);
			})
			.then((receipt: any) => {
				console.log('the txn receipt that was returned to the sdk:', receipt);
			})
			.catch((error: any) => {
				console.log(error);
			});
	};

	const signMessage = async () => {
		const publicAddress = (await web3.eth.getAccounts())[0];
		const signedMessage = await web3.eth.personal
			.sign('My Message', publicAddress, '')
			.catch((e: any) => console.log(e));
		console.log(signedMessage);
	};

	const showWallet = () => {
		console.log('Show Account');
		magic.connect.showWallet().catch((e: any) => {
			console.log(e);
		});
	};

	const getEmail = async () => {
		try {
			console.log('xd');
			const accounts = await magic.wallet.connectWithUI();
			console.log(accounts);
			const email = await magic.wallet.requestUserInfoWithUI({
				scope: { email: 'required' },
			});
			console.log(accounts, email);
			return { email: email.email, error: false };
		} catch (e: any) {
			return { email: null, error: true };
		}
	};

	const disconnect = async (dispatch: any) => {
		setLoading(true);
		await magic.connect.disconnect().catch((e: any) => {
			console.log(e);
		});
		setAccount(null);
		setIsAuthenticated(true);

		dispatch(
			onUpdateUser({
				ethAddress: '',
				providerName: '',
				email: '',
				provider: undefined,
			})
		);
		setLoading(false);
	};

	const acceptAnOfferMagic = async (
		accept: boolean,
		bottleContract: any,
		setIsLoading: any,
		setMessage: any,

		dispatch: any,
		network: any,
		networkName: any,
		hideOptions: any
	) => {
		setIsLoading(true);
		try {
			const publicAddress = (await web3.eth.getAccounts())[0];
			const BottleCollectionContract = new (web3 as any).eth.Contract(
				BottleCollectionABI,
				bottleContract
			);
			if (accept == true) {
				setMessage('Accepting the offer...');
			} else {
				setMessage('Denying the offer...');
			}
			await BottleCollectionContract.methods
				.respondAnOffer(accept)
				.send({ from: publicAddress });
			toast.success('Your respond to the offer was made successfully.', {
				duration: 7000,
			});
			hideOptions();
		} catch (error) {
			toast.error(
				'An error occurred while you made the offer, please look at the console to more information.',
				{
					duration: 7000,
				}
			);
			console.log(error);
		}
		setMessage('');
		setIsLoading(false);
	};

	const cancelAnOfferMagic = async (
		bottleContract: any,
		setIsLoading: any,
		setMessage: any,
		dispatch: any,
		hideOptions: any
	) => {
		setIsLoading(true);
		try {
			const publicAddress = (await web3.eth.getAccounts())[0];

			const BottleCollectionContract = new (web3 as any).eth.Contract(
				BottleCollectionABI,
				bottleContract
			);
			setMessage('Canceling your offer...');

			await BottleCollectionContract.methods
				.cancelLastOffer()
				.send({ from: publicAddress });
			toast.success('Your offer has been cancelled successfully.', {
				duration: 7000,
			});
			hideOptions();
		} catch (error) {
			toast.error(
				'An error occurred while you made the offer, please look at the console to more information.',
				{
					duration: 7000,
				}
			);
			console.log(error);
		}
		setMessage('');
		setIsLoading(false);
	};

	const exchangeCollectionMagic = async (
		bottleContract: any,
		setIsLoading: any,
		setMessage: any,
		dispatch: any,
		hideOptions: any
	) => {
		setIsLoading(true);
		setMessage('Redeeming your collection...');
		try {
			const publicAddress = (await web3.eth.getAccounts())[0];

			const BottleExchangeContract = new (web3 as any).eth.Contract(
				BottleExchangeABI,
				'0x9Cf0C4bB20d6a2565b695B7610dD5DDf19542a50'
			);
			await BottleExchangeContract.methods
				.exchangeCollection(bottleContract)
				.send({ from: publicAddress });
			toast.success('You have exchanged the collection successfully!', {
				duration: 7000,
			});
			hideOptions();
		} catch (error) {
			toast.error(
				'An error occurred while you made the exchange, please look at the console to more information.',
				{
					duration: 7000,
				}
			);
			console.log(error);
		}
		setMessage('');
		setIsLoading(false);
	};

	const increaseAllowanceMagic = async (
		bottleContract: any,
		setIsLoading: any,
		setMessage: any
	) => {
		setIsLoading(true);
		try {
			const publicAddress = (await web3.eth.getAccounts())[0];
			const Erc20Instance = new (web3 as any).eth.Contract(
				ERC20ABI,
				process.env.NEXT_PUBLIC_USDC_ADDRESS
			);
			setMessage('Allowing us to accept USDC...');
			await Erc20Instance.methods
				.increaseAllowance(
					bottleContract,
					'1000000000000000000000000000000000000000000000000'
				)
				.send({ from: publicAddress });
		} catch (error) {
			console.log(error);
		}
		setIsLoading(false);
	};

	const makeAnOfferMagic = async (
		price: string,
		bottleContract: any,
		setIsLoading: any,
		setMessage: any,
		hideOptions: any
	) => {
		setIsLoading(true);
		try {
			const publicAddress = (await web3.eth.getAccounts())[0];

			const BottleCollectionContract = new (web3 as any).eth.Contract(
				BottleCollectionABI,
				bottleContract
			);

			await BottleCollectionContract.methods
				.makeAnOfferForAll(multiply(price, '1000000'))
				.send({ from: publicAddress });
			toast.success('Your offer was made successfully.', {
				duration: 7000,
			});
			hideOptions();
		} catch (error) {
			toast.error(
				'An error occurred while you made the offer, please look at the console to more information.',
				{
					duration: 7000,
				}
			);
			console.log(error);
		}
		setMessage('');
		setIsLoading(false);
	};

	const getAmountBackMagic = async (
		bottleContract: any,
		setIsLoading: any,
		setMessage: any,
		hideOptions: any
	) => {
		setIsLoading(true);

		try {
			const publicAddress = (await web3.eth.getAccounts())[0];
			const BottleCollectionContract = new (web3 as any).eth.Contract(
				BottleCollectionABI,
				bottleContract
			);
			setMessage('Transfering your amount to your address...');
			await BottleCollectionContract.methods
				.getOfferAmountBack()
				.send({ from: publicAddress });
			toast.success(
				'Your balance in the smart contract was transfered to your address successfully.',
				{
					duration: 7000,
				}
			);
			hideOptions();
		} catch (error) {
			toast.error(
				'An error occurred while you made the transaction, please look at the console to more information.',
				{
					duration: 7000,
				}
			);

			console.log(error);
		}
		setMessage('');
		setIsLoading(false);
	};

	return {
		loading,
		login,
		signMessage,
		disconnect,
		showWallet,
		sendTransaction,
		account,
		isAuthenticated,
		getEmail,
		acceptAnOfferMagic,
		exchangeCollectionMagic,
		cancelAnOfferMagic,
		increaseAllowanceMagic,
		makeAnOfferMagic,
		getAmountBackMagic,
	};
}
