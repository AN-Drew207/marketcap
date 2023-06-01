import { useState } from 'react';
import { Magic } from 'magic-sdk';
import { ConnectExtension } from '@magic-ext/connect';
import Web3 from 'web3';
import BottleCollectionABI from '../contracts/MezcalCollection.json';
import ERC20ABI from '../contracts/ERC20.json';
import BottleExchangeABI from '../contracts/BottleExchange.json';
import bottlesTestnet from 'bottles_mumbai.json';
import { updateState } from 'redux/actions';
import toast from 'react-hot-toast';
import { multiply } from 'components/common/multiply';
import { send } from '@emailjs/browser';

export default function useMagicLink() {
	const [account, setAccount] = useState<any>(null);
	const [loading, setLoading] = useState<any>(null);
	const [web3, setWeb3] = useState<any>(null);
	const [magic, setMagic] = useState<any>(null);

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
	}

	const login = async (dispatch: any) => {
		setLoading(true);
		try {
			const publicAddress = (await web3.eth.getAccounts())[0];
			setAccount(publicAddress);
			dispatch(
				updateState({
					address: publicAddress,
					typeOfWallet: 'magic',
				})
			);
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

	const loginSet = async (setWallet: any) => {
		setLoading(true);
		try {
			const publicAddress = (await web3.eth.getAccounts())[0];
			setAccount(publicAddress);
			// const offersReceived = [];
			// const offersDone = [];
			setWallet(publicAddress);
			setLoading(false);
			return publicAddress;
		} catch (error) {
			toast.error((error as any).message, { duration: 4000 });
			console.log(error, 'aqui');
			setLoading(false);

			return false;
		}
	};

	const loginDoubleSet = async (type: any, code: any) => {
		setLoading(true);
		try {
			const publicAddress = (await web3.eth.getAccounts())[0];
			setAccount(publicAddress);
			// const offersReceived = [];
			// const offersDone = [];

			const email = await getEmail();
			if (email.error) {
				throw new Error(
					'You have rejected to share your email, please accept to continue'
				);
			}
			console.log(email, 'mail');
			setLoading(false);
			if (!publicAddress) {
				return toast.error('Please connect your realm before submitting.');
			}
			if (!email) {
				return toast.error(
					'To create your personal Realm, the Keeper requires your email.'
				);
			}

			let submitted;
			if (type == 'Soul') {
				submitted = await (
					await fetch(
						'https://api.hsforms.com/submissions/v3/integration/submit/27162245/21d8020c-213b-4ddb-aaac-39829a4ae0a2',
						{
							method: 'POST',
							headers: {
								['Content-Type']: 'application/json',
								Authorization: 'pat-eu1-dde296ba-227c-47b4-bde2-2429abfb4f4d',
							},
							body: JSON.stringify({
								fields: [
									{ objectTypeId: '0-1', name: 'email', value: email.email },
								],
							}),
						}
					)
				).json();
			} else {
				submitted = await (
					await fetch(
						'https://api.hsforms.com/submissions/v3/integration/submit/27162245/15e7e5e8-514c-4c5f-a546-4a51231be851',
						{
							method: 'POST',
							headers: {
								['Content-Type']: 'application/json',
								Authorization: 'pat-eu1-dde296ba-227c-47b4-bde2-2429abfb4f4d',
							},
							body: JSON.stringify({
								fields: [
									{ objectTypeId: '0-1', name: 'email', value: email.email },
								],
							}),
						}
					)
				).json();
			}
			console.log(submitted, 'test');
			if (submitted) {
				console.log('Done!');
			}

			send(
				'service_9anqujx',
				'template_ua6etor',
				{
					token_name: type,
					email: email.email,
					code: code,
					wallet: publicAddress,
				},
				'BABARAkzQRmw9GBAa'
			).then(
				() => {
					// hide();
					const string =
						"Congratulations! you have created your Realm. You'll receive your " +
						type +
						' soon!';
					toast.success(string, {
						duration: 5000,
					});
					return true;
				},
				(error) => {
					console.log(error.text);
					return false;
				}
			);

			return publicAddress;
		} catch (error) {
			toast.error((error as any).message, { duration: 4000 });
			console.log(error, 'aqui');
			setLoading(false);

			return false;
		}
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
		dispatch(
			updateState({
				address: '',
				typeOfWallet: '',
				offersActiveReceived: [],
				offersActiveMade: [],
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
		loginSet,
		loginDoubleSet,
		signMessage,
		disconnect,
		showWallet,
		sendTransaction,
		account,
		getEmail,
		acceptAnOfferMagic,
		exchangeCollectionMagic,
		cancelAnOfferMagic,
		increaseAllowanceMagic,
		makeAnOfferMagic,
		getAmountBackMagic,
	};
}
