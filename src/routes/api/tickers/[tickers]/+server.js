import { json } from '@sveltejs/kit';

export async function GET(requestEvent) {
	const { params } = requestEvent;
	const { tickers } = params;

	const response = await fetch(
		`https://app.albert.com/casestudy/stock/prices/?tickers=${tickers}`,
		{
			method: 'GET',
			headers: { 'Albert-Case-Study-API-Key': 'd2db5753-33f6-4e25-b915-6cbdda7953e7' }
		}
	);

	const prices = await response.json();
	return json({ prices });
}
