import KVGTable from './(components)/KVGTable';
import { getStopData } from './(components)/actions';

export default async function Page() {
	const rathausKronshagen = await getStopData({
		stopId: '1624',
		direction: 'Am Wellsee',
	});

	const heischberg = await getStopData({
		stopId: '1317',
		direction: 'Ellerbeker Weg',
	});

	const amLangsee = await getStopData({
		stopId: '1312',
		direction: 'Albert-Schweitzer-Straße',
	});

	const preetzerStraße = await getStopData({
		stopId: '2246',
		direction: 'Kronshagen, Schulzentrum',
	});

	return (
		<div className='grid gap-4 m-4'>
			<h1>Nairol Bus Tracker</h1>
			<div className='grid gap-2'>
				<h2>Rathaus Kronshagen</h2>
				<KVGTable data={rathausKronshagen.actual} />
				<h2>Heischberg</h2>
				<KVGTable data={heischberg.actual} />
				<h2>Am Langsee</h2>
				<KVGTable data={amLangsee.actual} />
				<h2>Preetzer Straße/Ostring</h2>
				<KVGTable data={preetzerStraße.actual} />
			</div>
			<div>
				<a className='px-2.5 py-1.5 rounded bg-black/25 dark:bg-white/25' href='/'>
					Neu laden
				</a>
			</div>
			<span className='text-sm opacity-70'>Letztes Update: {new Date().toLocaleTimeString('de-DE', { timeZone: 'Europe/Berlin' })}</span>
		</div>
	);
}
