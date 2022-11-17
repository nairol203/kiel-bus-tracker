import axios from 'axios';
import { API_ENDPOINT } from '@lib/api';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { stop, routeId, direction } = req.query;

	try {
		const { data } = await axios(`${API_ENDPOINT}/passageInfo/stopPassages/stop?stop=${stop}&routeId=${routeId}&direction=${direction}`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		});

		res.json(data);
	} catch (error) {
		console.error(error);
	}
}
