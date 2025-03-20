import { redirect } from 'next/navigation';

type Props = {
	searchParams: { stop?: string; routeId?: string; direction?: string };
};

export default async function Page({ searchParams }: Props) {
	const { stop, ...restParams } = searchParams;

	if (stop) {
		const queryString = new URLSearchParams(restParams).toString();
		const targetUrl = `/stop/${stop}${queryString ? `?${queryString}` : ''}`;
		redirect(targetUrl);
	} else {
		redirect('/');
	}
}
