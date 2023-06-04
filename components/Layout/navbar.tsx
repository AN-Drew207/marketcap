/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import 'swiper/css';
import Link from 'next/link';
import { MenuIcon } from '@heroicons/react/outline';
import { UserOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { State } from 'redux/actions';
import { Dropdown } from 'components/common/dropdown/dropdown';
import { NavbarItem } from 'components/Layout';
import router, { useRouter } from 'next/router';
import useMagicLink from 'hooks/useMagicLink';
import { Button } from 'components/common/button';
import 'aos/dist/aos.css';
import { SidebarMobile } from 'components/Layout/sidebars/mobile';
import { Logo } from 'components/logo';

export const Navbar = () => {
	const { address, network, networkName, typeOfWallet } = useSelector(
		(state: { state: State }) => {
			return state.state;
		}
	);

	const dispatch = useDispatch();
	const { showWallet, disconnect } = useMagicLink();
	const [sideBarOpen, setSidebarOpen] = React.useState(false);

	const navItems = [
		{ name: 'Cryptocurrencies', link: '/#crypto' },
		{ name: 'Exchanges', link: '/#exchanges' },
		{ name: 'NFT', link: '/#nft' },
		{
			name: 'Portfolio',
			link: '/#portfolio',
		},
		{ name: 'Watchlist', link: '/#watchlist"' },
		{ name: 'Products', link: '/#products' },
		{ name: 'Learn', link: '/#learn' },
	];

	return (
		<div className="w-full flex justify-between gap-10 items-center">
			<div className="flex items-center justify-center gap-4">
				<Logo className="w-20" />
				{navItems.map((item, index) => {
					return <NavbarItem key={index} name={item.name} link={item.link} />;
				})}
			</div>
			<div className="md:hidden flex items-center justify-center">
				<div
					className="lg:hidden flex"
					onClick={() => {
						setSidebarOpen(true);
					}}
				>
					<MenuIcon
						className="h-6 w-6 text-gray-800 cursor-pointer"
						aria-hidden="true"
					/>
				</div>
			</div>
			<div className="md:flex hidden items-center justify-center">
				{!address ? (
					<Link href="/app/personal/login">
						<div className="cursor-pointer z-10 border Raleway !border-overlay px-4 py-2 text-overlay hover:bg-overlay hover:text-primary transition-all duration-300 rounded-md">
							Connect Wallet
						</div>
					</Link>
				) : (
					<Dropdown
						title={
							<div className="cursor-pointer Raleway text-overlay flex items-center justify-center">
								<UserOutlined className="xl:text-xl text-lg" />
							</div>
						}
						classTitle="sm:px-4 px-2 py-2 relative cursor-pointer text-gray-800"
					>
						<div className="flex flex-col gap-4 p-4 items-center justify-center">
							{/* <div>
								<NavbarItem
									name={'PROFILE'}
									icon={''}
									link={'/app/personal'}
									route={router.asPath}
								/>
							</div> */}
							<div>
								<NavbarItem
									name={'My Account'}
									icon={''}
									link={'/account'}
									route={router.asPath}
								/>
							</div>
							{typeOfWallet == 'magic' && (
								<>
									{/* <Button
										className={clsx(
											'z-10 border border-gray-800 mb-3 px-4 py-2 text-gray-800 hover:bg-gray-800 hover:text-white transition-all duration-300 whitespace-nowrap'
										)}
										onClick={() => showWallet()}
									>
										Show Account
									</Button> */}
									<Button
										className={clsx(
											'z-10 border border-gray-800  px-4 py-2 text-gray-800 hover:bg-gray-800 hover:text-white transition-all duration-300 RalewayThin'
										)}
										onClick={() => disconnect(dispatch)}
									>
										Disconnect
									</Button>
								</>
							)}
						</div>
					</Dropdown>
				)}
			</div>
			<SidebarMobile
				sidebarOpen={sideBarOpen}
				setSidebarOpen={setSidebarOpen}
				navItems={navItems}
				// offersActiveReceived={offersActiveReceived}
				// offersActiveMade={offersActiveMade}
				dispatch={dispatch}
				network={network}
				networkName={networkName}
			/>
		</div>
	);
};
