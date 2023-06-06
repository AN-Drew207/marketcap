import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ConnectionType } from 'utils/connection';

export interface State {
	user: {
		ethAddress: string;
		email: string;
		wallet: any;
		networkId: any;
	};
	blur: boolean;
	message: string;
	provider: any;
	providerName: string;
}

const initialState: State = {
	blur: false,
	message: '',
	user: {
		ethAddress: '',
		email: '',
		wallet: ConnectionType.INJECTED,
		networkId: null,
	},
	providerName: '',
	provider: undefined,
};

export const stateSlice = createSlice({
	name: 'state',
	initialState,
	reducers: {
		onUpdateUser: (state, action: PayloadAction<any>) => {
			state.user.email = action.payload.email;
			state.user.ethAddress = action.payload.ethAddress;
			state.provider = action.payload.provider;
			state.providerName = action.payload.providerName;
		},
	},
});

// Action creators are generated for each case reducer function
export const { onUpdateUser } = stateSlice.actions;

export default stateSlice.reducer;
