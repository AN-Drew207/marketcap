import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import useMagicLink from 'hooks/useMagicLink';
import { Navbar } from 'components/Layout/navbar';

export default function AppLayoutApp() {
	const router = useRouter();

	const [isExecuted, setIsExecuted] = React.useState(false);
	// const [sideBarOpen, setSidebarOpen] = React.useState(false);
	const dispatch = useDispatch();
	const { login } = useMagicLink();
	const { magicReload } = useRouter().query;

	const chainChangedHandler = () => {
		// reload the page to avoid any errors with chain change mid use of application
		window.location.reload();
	};

	React.useEffect(() => {
		if (magicReload) {
			// connectWalletUpdateData(dispatch, network, networkName);
			login(dispatch);
		}
	}, [magicReload]);

	const accountChangedHandler = () => {
		window.location.reload();
	};

	if (
		typeof window !== 'undefined' &&
		(window as any).ethereum !== undefined &&
		(window as any).ethereum.isConnected() &&
		!isExecuted
	) {
		(window as any).ethereum.on('accountsChanged', accountChangedHandler);
		(window as any).ethereum.on('chainChanged', chainChangedHandler);
		setIsExecuted(true);
	}

	// console.log(router);

	return (
		<>
			<nav className="flex w-full sticky top-0 md:text-md sm:text-sm text-[12px] md:items-start items-center bg-primary z-[1000]">
				<div className="flex md:justify-start justify-between items-center w-full relative md:px-16 px-8 bg-[#00000077] py-2">
					<Navbar />
				</div>
			</nav>
		</>
	);
}

export const Message: React.FunctionComponent<{
	content: string;
	open: boolean;
}> = (props) => {
	const { content, open } = props;

	return (
		<div
			className={clsx(
				`absolute bottom-3.5 left-3.5 bg-purple-300 px-10 py-4 rounded-md`,
				'ease-out duration-300',
				open ? 'scale-100' : 'scale-0'
			)}
		>
			{content}
		</div>
	);
};

export const Logo = () => (
	<Link href="/">
		<div className="mr-4 md:py-0 h-16 flex items-center justify-center text-white uppercase cursor-pointer">
			<img src="/logos/shhhhlogo.png" className="h-16" alt="" />
		</div>
	</Link>
);

export const NavbarItem: React.FC<any> = ({ name, link }) => {
	return (
		<Link href={link}>
			<div className={clsx('py-2 relative cursor-pointer')}>
				<div className={clsx('gap-2 flex items-center')}>
					{/* <div className="flex items-center w-4">{icon}</div> */}
					<h3
						className={clsx(
							'text-md font-bold text-center whitespace-nowrap Raleway text-overlay'
						)}
					>
						{name}
					</h3>
				</div>
			</div>
		</Link>
	);
};
