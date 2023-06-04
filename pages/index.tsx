import { Navbar } from 'components/Layout/navbar';
import CMCtable from 'components/cmc-table/cmcTable';
import Trending from 'components/trending';

import * as React from 'react';

const Home = () => {
	return (
		<div className="min-h-screen bg-overlay flex flex-col gap-10 w-full pb-16">
			<Trending />
			<CMCtable />
		</div>
	);
};
export default Home;
