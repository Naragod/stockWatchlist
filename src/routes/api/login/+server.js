import { getUsers } from '$lib/database/postgres/main';
import { error, json } from '@sveltejs/kit';

export async function POST({ request }) {
	const users = await getUsers();
	const { username } = await request.json();
	const validUser = users.filter((user) => user.username == username);

	if (validUser.length == 0) throw error(404, 'Invalid User.');
	return json(validUser[0]);
}
