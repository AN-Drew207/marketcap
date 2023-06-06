/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoadingOutlined, MailOutlined } from '@ant-design/icons';
import { ChevronLeftIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { Button } from 'components/common/button';
import { Input } from 'components/common/form/input';
import { Loading } from 'components/landing/loadingComponent';
import { useModal } from 'hooks/modal';
import useMagicLink from 'hooks/useMagicLink';
import Link from 'next/link';
import router from 'next/router';
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

export const LoginPersonal = () => {
	const dispatch = useDispatch();
	const { login, loading } = useMagicLink();

	// const { email } = useRouter().query;

	return (
		<div className="min-h-screen h-full flex flex-col justify-center items-center relative w-full">
			<div className="w-full h-full absolute bg-primary lg:opacity-100 opacity-[0.40]"></div>
			<form className="w-full flex flex-col items-center justify-center max-w-[600px] gap-2 px-10 relative">
				<h1 className="text-white text-4xl w-full text-center Raleway">
					Welcome Back
				</h1>
				{/* <h2 className="text-primary text-sm w-full text-center">
					Login with the same email of Shopify
				</h2> */}
				<div className="flex flex-col w-full">
					{/* <InputEmail
						register={register}
						name="email"
						placeholder="Email"
						required
						defaultValue={email ? email : ''}
						error={errors.email}
					/> */}
					<div className="flex gap-2 xl:flex-row flex-col items-center justify-center">
						{/* <Input
							register={register}
							placeholder="Realm"
							name="wallet"
							disabled
							required
							value={wallet.wallet}
						></Input> */}
					</div>
				</div>
				{loading ? (
					<LoadingOutlined className="text-4xl !text-white" />
				) : (
					<button
						onClick={async () => {
							try {
								const passed = await login(dispatch);
								if (!passed) {
									throw new Error('Canceled login by user');
								}
								router.push('/app/personal');
							} catch (error) {
								toast.error('Login canceled by the user');
								console.log(error);
							}
						}}
						type="button"
						className="z-10 border Raleway mt-4 !border-gray-900 px-4 py-2 text-white hover:bg-gray-900 hover:text-white transition-all duration-300 rounded-md"
					>
						Enter to your Realm
					</button>
				)}
				{/* <div className="text-center flex mt-4">
					<h2 className="text-primary text-[12px]">
						You don't have account?{' '}
						<Link href="/app/personal/register">
							<a className="text-white font-bold">Sign Up</a>
						</Link>
					</h2>
				</div> */}
			</form>
			<Toaster></Toaster>
		</div>
	);
};
