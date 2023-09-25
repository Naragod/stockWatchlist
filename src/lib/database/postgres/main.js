import { DB_USER, DB_PASSWORD, DB_DATABASE } from '$env/static/private';
import { Client } from 'pg';

const executeInClientContext = async (callback) => {
	const options = { host: 'db', user: DB_USER, database: DB_DATABASE, password: DB_PASSWORD };
	const client = new Client(options);
	await client.connect();
	const result = await callback(client);
	await client.end();
	return result;
};

const createTickerIfNotExist = async (client, ticker) => {
	let text = 'SELECT * FROM casestudy_stocks WHERE symbol = $1';
	const result = await client.query({ text, values: [ticker.symbol] });

	// if it exists, exit
	if (result.rows.length > 0) return;
	text = 'INSERT INTO casestudy_stocks(symbol, "name") VALUES($1, $2)';
	await client.query({ text, values: [ticker.symbol, ticker.name] });
};

export const toggleTickerToUserWatchList = async (user, ticker, insert) => {
	await executeInClientContext(async (client) => {
		const values = [user.id, ticker.symbol];

		await createTickerIfNotExist(client, ticker);
		let text =
			'DELETE FROM casestudy_ticker_subscriptions where user_id = $1 and stock_id = $2 RETURNING *';

		if (insert) {
			text = 'INSERT INTO casestudy_ticker_subscriptions(user_id, stock_id) VALUES($1, $2)';
		}
		let query = { values, text };
		await client.query(query).catch((err) => console.error(err.message));
	});
};

export const getUserWatchList = async (userId) => {
	return await executeInClientContext(async (client) => {
		const text =
			'SELECT * FROM casestudy_ticker_subscriptions AS cts JOIN casestudy_stocks AS cs on cs.symbol = cts.stock_id WHERE cts.user_id = $1';
		const result = await client.query({ text, values: [userId] });
		return result.rows;
	});
};

export const getUsers = async () => {
	return await executeInClientContext(async (client) => {
		const query = { text: 'SELECT * FROM casestudy_users' };
		const result = await client.query(query);
		return result.rows;
	});
};
