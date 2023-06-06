import { AxiosInstance } from 'axios';
import axiosClient from './AxiosClientConfig';

class Service {
	constructor(private client: AxiosInstance) {}

	async getCurrency(): Promise<any> {
		return this.client.get(
			`cryptocurrency/info?id${2}?CMC_PRO_API_KEY=${
				process.env.NEXT_PUBLIC_CMC_API_KEY
			}`
		);
	}
}

export const CurrencyApiService = new Service(axiosClient);
