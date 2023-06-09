import { CHAIN_CONFIG, CHAIN_CONFIG_TYPE } from 'hooks/config/chainConfig';
import {
	WEB3AUTH_NETWORK,
	WEB3AUTH_NETWORK_TYPE,
} from 'hooks/config/web3AuthNetwork';
// import { Web3AuthContext } from 'hooks/web3Auth/web3Auth';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import styles from '../styles/Home.module.css';
// import { useContext } from 'react';

interface IProps {
	setNetwork: Dispatch<SetStateAction<WEB3AUTH_NETWORK_TYPE>>;
	setChain: Dispatch<SetStateAction<CHAIN_CONFIG_TYPE>>;
}

const Setting = ({ setNetwork, setChain }: IProps) => {
	const networkChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
		console.log('Settings', e.target.value);
		setNetwork(e.target.value as WEB3AUTH_NETWORK_TYPE);
	};

	const chainChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
		console.log('Settings', e.target.value);
		setChain(e.target.value as CHAIN_CONFIG_TYPE);
	};
	// const { provider } = useContext(Web3AuthContext);
	// const isLoggedIn = provider !== null;

	return (
		<div className={styles.setting}>
			<div className={styles.row}>
				<label htmlFor="network" className={styles.label}>
					Web3Auth Network
				</label>
				<select
					id="network"
					onChange={networkChangeHandler}
					className={styles.select}
					// disabled={isLoggedIn}
				>
					{Object.keys(WEB3AUTH_NETWORK).map((x: string) => {
						return (
							<option key={x} value={x}>
								{WEB3AUTH_NETWORK[x as WEB3AUTH_NETWORK_TYPE].displayName}
							</option>
						);
					})}
				</select>
			</div>
			<div className={styles.row}>
				<label htmlFor="network" className={styles.label}>
					Blockchain
				</label>
				<select
					onChange={chainChangeHandler}
					className={styles.select}
					// disabled={isLoggedIn}
				>
					{Object.keys(CHAIN_CONFIG).map((x: string) => {
						return (
							<option key={x} value={x}>
								{CHAIN_CONFIG[x as CHAIN_CONFIG_TYPE].displayName}
							</option>
						);
					})}
				</select>
			</div>
		</div>
	);
};

export default Setting;
