import { json } from '@sveltejs/kit';
import { getUserWatchList as getPostgresWatchListResults } from '$lib/database/postgres/main';

export async function GET({ params }) {
	const { userId } = params;
	const result = await getPostgresWatchListResults(userId);
	return json({ watchList: result });
}
