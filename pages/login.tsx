import React from 'react';
import { Button } from '../components/common/button';
import clsx from 'clsx';
import useMagicLink from '../hooks/useMagicLink';
import { WALLETS } from '../utils/connection/utils';
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useAppDispatch } from 'redux/hooks';
import { onUpdateUser } from 'redux/actions';
import { switchChain } from 'components/common/switchChain';
import { useWeb3React } from '@web3-react/core';

type Values = {
	email?: string;
	password?: string;
	address: string;
	walletType: 'metamask' | 'wallet_connect';
};

const Login = () => {
	const [loading, setLoading] = React.useState(false);
	const { login, isAuthenticated } = useMagicLink();

	const { provider, providerName } = useSelector((state: any) => state.state);
	const { account: user } = useWeb3React();

	const router = useRouter();
	const dispatch = useDispatch();
	const handleLogin = async () => {
		setLoading(true);
		try {
			await login(dispatch);
			console.log('a');
			localStorage.setItem('typeOfConnection', 'magic');
			localStorage.setItem('loginTime', new Date().getTime().toString());
			router.push('/');
		} catch (err) {
			console.log({ err });
			setLoading(false);
		}
		setLoading(false);
	};

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

			await switchChain(80001, providerName, provider);

			dispatch(
				onUpdateUser({
					ethAddress: user,
					email: '',
					provider: provider?.provider,
					providerName: 'web3react',
					// ownsBattlePass: balance > 0,
				})
			);

			router.push('/');
		} catch (err) {
			setLoading(false);
			console.log({ err });
		}
		setLoading(false);
	};

	return (
		<div className="max-w-[100vw] h-screen overflow-hidden">
			<div className="max-w-[100vw] overflow-hidden h-screen w-full flex flex-col items-center justify-center gap-10">
				<div className="absolute h-screen max-w-full overflow-hidden">
					<img
						className={`relative min-w-[100vw] min-h-[100vh] top-0 left-0`}
						src="img/bg.jpg"
						alt=""
					/>
				</div>
				<div className="absolute h-screen w-full overflow-hidden bg-overlay-2 opacity-75"></div>

				<h1 className="font-bold text-white text-3xl relative">Let's Login</h1>
				<div
					className={clsx(
						'flex flex-col gap-4 relative h-80 items-center justify-center'
					)}
				>
					{loading == true ? (
						<LoadingOutlined className="text-5xl !text-white" />
					) : (
						<>
							<Button
								disabled={loading}
								className="cursor-pointer z-10 border Raleway !border-white px-4 py-2 text-white hover:bg-white hover:text-overlay-2 transition-all duration-300 rounded-md w-full"
								onClick={() => handleLogin()}
							>
								{loading ? '...' : 'Login with Email'}
							</Button>
							{WALLETS.map((k: any, i: any) => (
								<Button
									disabled={loading}
									className="cursor-pointer z-10 border Raleway !border-white px-4 py-2 text-white hover:bg-white hover:text-overlay-2 transition-all duration-300 rounded-md w-full"
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

export default Login;
