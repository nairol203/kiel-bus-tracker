import { Metadata } from 'next';
import RecommendedSearches from './(components)/RecommendedSearches';
import Searchbar from './(components)/Searchbar';

export const metadata: Metadata = {
	alternates: {
		canonical: '/',
	},
};

export default function Page() {
	return (
		<div className='mx-2 grid gap-2'>
			<Searchbar />
			<RecommendedSearches />
		</div>
	);
}
