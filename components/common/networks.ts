const publicRpc = {
	polygon: 'https://polygon-rpc.com/',
};

export const networkConfigs: any = {
	137: {
		name: 'Polygon Mainnet',
		rpc: publicRpc['polygon'],
		blockExplorerURl: 'https://polygonscan.com/',
		currencySymbol: 'MATIC',
	},
	80001: {
		name: 'Polygon Testnet',
		rpc:
			'https://polygon-mumbai.g.alchemy.com/v2/HxxZ-aFZZPrlenpzbC_UdAMg-4tN4UzM' ||
			publicRpc['polygon'],
		blockExplorerURl: 'https://rpc-mumbai.maticvigil.com',
		currencySymbol: 'MATIC',
	},
};

export const getNativeByChain = (chainId: any) =>
	networkConfigs[chainId]?.currencySymbol || 'ETH';

export const getExplorer = (chainId: any) =>
	networkConfigs[chainId]?.blockExplorerUrl;
