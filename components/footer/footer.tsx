import * as React from 'react';
import clsx from 'clsx';
import {
	FacebookFilled,
	InstagramFilled,
	MailFilled,
	TwitterOutlined,
} from '@ant-design/icons';

export const Footer = () => {
	const OficialPages = [
		{
			id: 0,
			href: 'https://www.instagram.com/shhhspirits/',
			component: <InstagramFilled />,
		},
		{
			id: 1,
			href: 'https://twitter.com/shhhspirits',
			component: <TwitterOutlined />,
		},

		{
			id: 2,
			href: 'https://www.facebook.com/shhhspirits/',
			component: <FacebookFilled />,
		},

		{
			id: 3,
			href: 'https://pin.it/PFrpM0v',
			icon: '/icons/pinterest.png',
		},
		// {
		// 	id: 4,
		// 	href: 'https://www.tiktok.com/@shhhspirits',
		// 	icon: '/icons/tiktok.png',
		// },
	];

	return (
		<footer
			className="flex flex-col gap-16 md:py-16 py-10 md:px-24 px-4 bg-primaryOpacity items-center justify-center"
			id="contact"
		>
			<h1 className="text-white md:text-6xl text-5xl w-full text-center">
				CONTACT US
			</h1>

			<div className="flex flex-col gap-6 w-full items-center justify-center md:w-1/2 w-full">
				<h2 className="text-[14px] text-white Raleway w-full  text-center w-full">
					If you need assistance or have any questions or feedback related to
					our products or services, please feel free to contact us through the
					following channels:{' '}
				</h2>
				<div className="flex gap-4">
					<a
						href="mailto:help@shhhspirits.com"
						className="font-bold Raleway text-white text-2xl flex items-center justify-center"
					>
						<MailFilled className="" />
					</a>{' '}
					<a
						href="https://t.me/shhhspirits"
						target="_blank"
						className="font-bold Raleway text-white"
					>
						<img className="h-6" src="/icons/telegram.png" />
					</a>
				</div>
				<h2 className="text-[14px] text-white Raleway w-full text-center">
					Our customer service team is dedicated to providing you with the best
					possible experience, and we will respond to your message as promptly
					as possible. Thank you for choosing SHHH! Spirits!
				</h2>
			</div>
			<div className="flex flex-col items-center justify-center w-full">
				<p className="text-white  Raleway text-sm mb-4">JOIN OUR COMMUNITY:</p>
				<div className="flex justify-center gap-4 md:text-4xl text-2xl text-white">
					{OficialPages.map((page) => {
						return (
							<a
								href={page.href}
								key={'social-media-' + page.id}
								target="_blank"
								className="flex items-center"
								rel="noopener noreferrer"
							>
								{page.icon && (
									<img src={page.icon} className=" md:h-8  h-6" alt="" />
								)}
								{page.component && page.component}
							</a>
						);
					})}
				</div>
			</div>
			<div
				className={clsx(
					'flex md:flex-row flex-col text-center md:items-start items-center md:justify-between justify-center gap-10 w-full relative w-full'
				)}
			>
				<div className="flex lg:flex-row flex-col gap-6 lg:w-1/2">
					<div className="flex flex-col md:items-start md:justify-start items-center justify-center text-[10px] gap-1 w-full lg:max-w-[50%]">
						<p className="text-white RalewayThin uppercase md:text-left text-center font-bold">
							Shhh Spirits LTD
						</p>
						<p className="text-white  text-left 2xl:w-80 w-auto RalewayThin md:text-left text-center">
							85 Great Portland Street <br />
							First Floor
							<br /> London. W1W 7LT
						</p>
						<a
							href="mailto:hello@shhhspirits.com"
							className="font-bold Raleway text-white"
						>
							hello@shhhspirits.com
						</a>
					</div>
					{/* <div className="flex flex-col md:items-start md:justify-start items-center justify-center text-[10px] gap-1 w-full lg:w-1/2">
						<p className="text-white RalewayThin uppercase md:text-left text-center italic">
							Imported to the UK by:
						</p>
						<p className="text-white RalewayThin uppercase md:text-left text-center font-bold">
							Bottlebits LTD
						</p>
						<p className="text-white  text-left 2xl:w-80 w-auto RalewayThin md:text-left text-center">
							6 Melbury Road <br /> London, W14 8LN
						</p>
					</div>
					<div className="flex flex-col md:items-start md:justify-start items-center justify-center text-[10px] gap-1 w-full lg:w-1/2">
						<p className="text-white RalewayThin uppercase md:text-left text-center italic">
							Wholesales in the UK by:
						</p>
						<p className="text-white RalewayThin uppercase md:text-left text-center font-bold">
							Fine Wine Sellers Limited
						</p>
						<p className="text-white  text-left 2xl:w-80 w-auto RalewayThin md:text-left text-center">
							Baddow Park Estate
							<br /> West Hanningfield Road <br /> Chelmsford <br /> Essex, CM2
							7SY
						</p>
					</div> */}
				</div>
			</div>

			<div className="flex md:flex-row flex-col items-center gap-2 w-full justify-between">
				<a
					className="text-dark font-bold Raleway text-[13px]"
					href="http://www.drinkaware.co.uk/"
				>
					www.drinkaware.co.uk
				</a>
				<p className="text-dark font-bold Raleway text-[13px]">
					SHHH SPIRITS LTD. - ALL RIGHTS RESERVED 2023
				</p>
			</div>
		</footer>
	);
};
