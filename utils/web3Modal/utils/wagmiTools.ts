import { chain, InjectedConnector } from '@wagmi/core';
import { CoinbaseWalletConnector } from '@wagmi/core/connectors/coinbaseWallet';
import { MetaMaskConnector } from '@wagmi/core/connectors/metaMask';
import { WalletConnectConnector } from '@wagmi/core/connectors/walletConnect';
import { alchemyProvider } from '@wagmi/core/providers/alchemy';
import { infuraProvider } from '@wagmi/core/providers/infura';
import { jsonRpcProvider } from '@wagmi/core/providers/jsonRpc';
import { publicProvider } from '@wagmi/core/providers/public';
import type {
	GetDefaultConnectorsOpts,
	GetWalletConnectProviderOpts,
} from '../../../types/apiTypes';

import { NAMESPACE } from './constants';

// -- providers ------------------------------------------------------- //
function walletConnectProvider({ projectId }: GetWalletConnectProviderOpts) {
	return jsonRpcProvider({
		rpc: (rpcChain) => {
			return {
				http: `https://rpc.walletconnect.com/v1/?chainId=${NAMESPACE}:${rpcChain.id}&projectId=${projectId}`,
			};
		},
	});
}

export const providers = {
	alchemyProvider,
	infuraProvider,
	jsonRpcProvider,
	publicProvider,
	walletConnectProvider,
};

// -- chains ---------------------------------------------------------- //

export const chains = {
	...chain,
};

// -- connectors ------------------------------------------------------ //
export function defaultConnectors({
	appName,
	chains: connectorChains,
}: GetDefaultConnectorsOpts) {
	return [
		new WalletConnectConnector({
			chains: connectorChains,
			options: { qrcode: false },
		}),
		new InjectedConnector({
			chains: connectorChains,
			options: { shimDisconnect: true },
		}),
		new CoinbaseWalletConnector({
			chains: connectorChains,
			options: { appName, headlessMode: true },
		}),
		new MetaMaskConnector({
			chains: connectorChains,
			options: {
				shimDisconnect: true,
				shimChainChangedDisconnect: false,
				UNSTABLE_shimOnConnectSelectAccount: true,
			},
		}),
	];
}
