import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface State {
	address: string;
	offersActiveReceived: any;
	offersActiveMade: any;
	network: string;
	networkName: string;
	exchange: string;
	typeOfWallet: string;
	email: string;
}

const initialState: State = {
	address: '',
	typeOfWallet: '',
	offersActiveReceived: [],
	offersActiveMade: [],
	network: process.env.NEXT_PUBLIC_POLYGON_ID
		? process.env.NEXT_PUBLIC_POLYGON_ID
		: '80001', //testnet 80001; mainnet 137;
	networkName: process.env.NEXT_PUBLIC_NETWORK_NAME
		? process.env.NEXT_PUBLIC_NETWORK_NAME
		: 'mumbai',
	exchange: process.env.NEXT_PUBLIC_EXCHANGE_ADDRESS
		? process.env.NEXT_PUBLIC_EXCHANGE_ADDRESS
		: '',
	email: '',
};

export const stateSlice = createSlice({
	name: 'state',
	initialState,
	reducers: {
		updateState: (state, action: PayloadAction<any>) => {
			state.address = action.payload.address;
			state.typeOfWallet = action.payload.typeOfWallet;
			// state.offersActiveReceived = action.payload.offersActiveReceived;
			// state.offersActiveMade = action.payload.offersActiveMade;
		},
		updateEmail: (state, action: PayloadAction<any>) => {
			state.email = action.payload.email;
		},
	},
});

// Action creators are generated for each case reducer function
export const { updateState, updateEmail } = stateSlice.actions;

export default stateSlice.reducer;
