<script>
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { loggedInUser } from '$lib/stores/user';
	import { watchedTickers } from '../../stores/ticker';
	import Ticker from './Ticker.svelte';

	let watchList = [];

	const getSubscriptions = async () => {
		const user = get(loggedInUser);
		const response = await fetch(`http://localhost:5173/api/subscriptions/${user.id}`);
		const { watchList: tickers } = await response.json();
		watchList = [...tickers];
	};

	onMount(getSubscriptions);
	watchedTickers.subscribe(getSubscriptions);
</script>

<div class="watchlist">
	<div class="watchlist-header">
		<h1>WatchList: {watchList.length}</h1>
		<button on:click={getSubscriptions}>Refresh</button>
	</div>
	<div class="watchlist-tickers">
		{#each watchList as ticker}
			<Ticker {ticker} watched={true} />
		{/each}
	</div>
</div>

<style>
	.watchlist {
		margin: 40px 0;
	}
	.watchlist-tickers {
		overflow-y: scroll;
		max-height: 200px;
	}
	.watchlist-header {
		display: flex;
		align-items: center;
		justify-content: center;
		column-gap: 1em;
	}

	.watchlist-header button {
		color: #fff;
		border: none;
		cursor: pointer;
		padding: 8px 10px;
		border-radius: 4px;
		background: #0066ff;
	}
</style>
