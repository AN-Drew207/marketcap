import React from 'react';
import { Button } from '../components/common/button';
// import Dialog from "../components/common/dialog";
// import { Typography } from "../components/common/typography";
// import { InputPassword } from "../components/common/form/input-password";
// import { InputEmail } from "../components/common/form/input-email";
import clsx from 'clsx';
import useMagicLink from '../hooks/useMagicLink';
import { WALLETS } from '../utils/connection/utils';
import { LoadingOutlined } from '@ant-design/icons';
// import { onUpdateUser } from '../redux/actions';
import { useWeb3React } from '@web3-react/core';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

type Values = {
	email?: string;
	password?: string;
	address: string;
	walletType: 'metamask' | 'wallet_connect';
};

const Login = () => {
	const [loading, setLoading] = React.useState(false);
	const { login, isAuthenticated, magic } = useMagicLink();

	const { ethAddress: account } = useSelector(
		(state: any) => state.blockchain.user
	);

	const { network, networkName } = useSelector(
		(state: any) => state.blockchain
	);

	const { account: user, provider } = useWeb3React();

	// const {
	// 	matic: { battlePass },
	// } = getAddresses();

	const router = useRouter();
	const { query } = useRouter();
	const dispatch = useDispatch();
	const handleLogin = async () => {
		setLoading(true);
		try {
			await login(dispatch);
			localStorage.setItem('typeOfConnection', 'magic');
			localStorage.setItem('loginTime', new Date().getTime().toString());
			router.push('/');
		} catch (err) {
			console.log({ err });
			setLoading(false);
		}
		setLoading(false);
	};

	React.useEffect(() => {
		if (isAuthenticated || account !== '') router.push('/');
	}, [isAuthenticated, account]);

	// const setUser = async () => {};

	const handleConnection = async (connection: any, title: any) => {
		setLoading(true);
		try {
			await connection.connector.activate();
			console.log(connection);
			localStorage.setItem('typeOfConnection', title);
			localStorage.setItem('loginTime', new Date().getTime().toString());

			const typeOfConnection = localStorage.getItem('typeOfConnection');
			const savedLoginTime = localStorage.getItem('loginTime');
			console.log(savedLoginTime, typeOfConnection, 'xddd');

			// await switchChain(network, networkName, provider);
			// const battlePassContract = getContractCustom(
			//   "BattlePass",
			//   battlePass,
			//   provider,
			// );
			// const season = (
			//   await battlePassContract.methods
			//     .seasons(await battlePassContract.methods.currentSeason().call())
			//     .call()
			// ).rewardId;
			// const balance = await battlePassContract.methods.balanceOf(user, season);
			// dispatch(
			// 	onUpdateUser({
			// 		ethAddress: user,
			// 		email: '',
			// 		provider: provider?.provider,
			// 		providerName: 'web3react',
			// 		// ownsBattlePass: balance > 0,
			// 	})
			// );
			router.push('/');
		} catch (err) {
			console.log({ err });
		}
		setLoading(false);
	};

	return (
		<div className="max-w-[100vw] h-screen overflow-hidden">
			<div className="max-w-[100vw] overflow-hidden h-screen w-full flex flex-col items-center justify-center gap-10">
				<div className="absolute h-screen max-w-full overflow-hidden">
					<img
						className={`relative min-w-[120vw] min-h-[101vh] top-0 right-0 left-[-8%] mx-auto`}
						alt=""
					/>
				</div>
				<h1 className="font-bold text-white text-3xl relative">
					WELCOME TO ENDERS GATE
				</h1>
				<div
					className={clsx(
						'flex flex-col gap-4 relative h-80 items-center justify-center'
					)}
				>
					{loading == true ? (
						<LoadingOutlined className="text-5xl text-white" />
					) : (
						<>
							<Button
								disabled={loading}
								className="w-full mb-2 bg-overlay rounded-md  text-white hover:text-overlay"
								onClick={() => handleLogin()}
							>
								{loading ? '...' : 'Login with Email'}
							</Button>
							{WALLETS.map((k: any, i: any) => (
								<Button
									disabled={loading}
									className="w-full mb-2 bg-overlay rounded-md  text-white hover:text-overlay"
									onClick={() => handleConnection(k.connection, k.title)}
								>
									{loading ? '...' : 'Login with ' + k.title}
								</Button>
							))}
						</>
					)}
				</div>
			</div>
		</div>
	);
};
