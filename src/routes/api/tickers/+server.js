import { error, json } from '@sveltejs/kit';

export async function GET() {
	const response = await fetch('https://app.albert.com/casestudy/stock/tickers/', {
		method: 'GET',
		headers: { 'Albert-Case-Study-API-Key': 'd2db5753-33f6-4e25-b915-6cbdda7953e7' }
	});

	const jsonRespnse = await response.json();
	return json({ tickers: jsonRespnse });
}
