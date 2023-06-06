// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default function handler(req, res) {
	const getData = async () => {
		const {
			query: { id },
		} = req;
		const response = await fetch(
			`https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?id=${id}&CMC_PRO_API_KEY=${process.env.NEXT_PUBLIC_CMC_API_KEY}`,
			{
				method: 'GET',
				headers: {
					Accept: '*/*',
				},
			}
		);

		const data = await response.json();

		res.status(200).json({ data });
	};

	getData();
}
