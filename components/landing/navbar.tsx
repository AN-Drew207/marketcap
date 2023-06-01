/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Footer } from 'components/footer';
import { SwiperSlide, Swiper } from 'swiper/react';
import 'swiper/css';
import Link from 'next/link';
import { MenuIcon } from '@heroicons/react/outline';
import { UserOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { State } from 'redux/actions';
import { Dropdown } from 'components/common/dropdown/dropdown';
import { NavbarItem } from 'components/personal/Layout';
import router, { useRouter } from 'next/router';
import useMagicLink from 'hooks/useMagicLink';
import { Button } from 'components/common/button';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { keyframes } from '@emotion/react';
import { SidebarMobile } from 'components/personal/Layout/sidebars/mobile';

export const Navbar = () => {
	const { address, network, networkName, typeOfWallet } = useSelector(
		(state: { state: State }) => {
			return state.state;
		}
	);

	const dispatch = useDispatch();
	const { showWallet, disconnect } = useMagicLink();
	const [isExecuted, setIsExecuted] = React.useState(false);
	const [sideBarOpen, setSidebarOpen] = React.useState(false);

	const navItems = [
		{ name: 'OUR MEZCAL', link: '/#mezcal' },
		{ name: 'OUR STORY', link: '/#story' },
		{ name: 'SOUL', link: '/#soul' },
		{
			name: 'SHOP',
			link: '/#shop',
		},
		{ name: 'STOCKISTS', link: '/#rest_bars"' },
		{ name: 'CONTACT', link: '/#contact' },
	];

	return (
		<>
			{' '}
			<div className="xl:w-[45%] w-[42.5%]  xs:gap-[10%] gap-[5%] md:flex hidden justify-end items-center">
				<a
					href="/#mezcal"
					className="cursor-pointer text-center text-gray-900 py-4 Raleway"
				>
					OUR MEZCAL
				</a>
				<a
					href="/#story"
					className="cursor-pointer text-center Raleway text-gray-900 py-4"
				>
					OUR STORY
				</a>

				<a href="/#soul" className="cursor-pointer Raleway text-gray-900 py-4">
					SOUL
				</a>
			</div>
			<div className="xl:w-[10%] md:w-[15%] flex items-center justify-center shrink-0">
				<Link href={'/'}>
					<img
						src="/logos/shhhhlogo.png"
						className={clsx(
							'md:absolute md:pt-[40px] md:w-12 w-10 cursor-pointer'
						)}
						alt=""
					/>
				</Link>
			</div>
			<div className="xl:w-[45%] w-[42.5%] xs:gap-[10%] gap-[5%] md:flex hidden justify-start">
				<a
					href="/#rest_bars"
					className="cursor-pointer text-center Raleway text-gray-900 py-4"
				>
					STOCKIST
				</a>
				<Link href="/#shop">
					<div className="cursor-pointer Raleway text-gray-900 py-4">SHOP</div>
				</Link>

				{/* <Link href="/app/personal/register">
						<div className="cursor-pointer Raleway text-gray-900 py-4">
							SIGN UP
						</div>
					</Link> */}

				<a
					href="/#contact"
					className="cursor-pointer Raleway text-gray-900 py-4"
				>
					CONTACT
				</a>
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
			<div className="absolute lg:right-8 right-2 top-0 bottom-0 my-auto md:flex hidden items-center justify-center">
				{!address ? (
					<Link href="/app/personal/login">
						<div className="cursor-pointer Raleway text-gray-900 flex items-center justify-center">
							REALM
						</div>
					</Link>
				) : (
					<Dropdown
						title={
							<div className="cursor-pointer Raleway text-gray-900 flex items-center justify-center">
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
									name={'MY REALM'}
									icon={''}
									link={'/app'}
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
		</>
	);
};
