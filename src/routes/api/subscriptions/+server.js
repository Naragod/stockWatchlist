import { json } from '@sveltejs/kit';
import { toggleTickerToUserWatchList } from '$lib/database/postgres/main.js';

export async function POST({ request }) {
	const { user, ticker, watched } = await request.json();
	await toggleTickerToUserWatchList(user, ticker, watched);
	return json({ success: true });
}
