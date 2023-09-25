<script>
	import { onDestroy, onMount } from 'svelte';
	import { loggedInUser } from '../../stores/user';
	import { watchedTickers } from '../../stores/ticker';
	import { get } from 'svelte/store';

	let tickerPrice;
	let tickerButton;
	let tickerInteval;

	export let ticker;
	export let watched = false;

	onMount(async () => {
		if (watched) {
			getTickerPrice();
			tickerButton.textContent = 'Unwatch';
			tickerInteval = setInterval(getTickerPrice, 5000);
			console.log('Creating Interval:', ticker['symbol']);
		} else {
			tickerPrice.style.display = 'none';
		}
	});

	onDestroy(() => {
		clearInterval(tickerInteval);
		console.log('Interval Cleared:', ticker['symbol']);
	});

	const getTickerPrice = async () => {
		const response = await fetch(`http://localhost:5173/api/tickers/${ticker.symbol}`);
		const { prices } = await response.json();
		ticker.price = prices[ticker.symbol];
	};

	const toggleItemWatchList = async () => {
		watched = !watched;
		const user = get(loggedInUser);

		// save to database
		await fetch('http://localhost:5173/api/subscriptions/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ user, ticker, watched })
		});

		// update store
		watchedTickers.update((obj) => {
			// if is no longer being watched
			if (!watched) {
				delete obj[ticker['symbol']];
				return obj;
			}
			obj[ticker['symbol']] = ticker;
			return obj;
		});
	};
</script>

<div class="ticker">
	<div class="ticker-row">
		<span class="ticker-name">{ticker.name}:</span>
		<span class="ticker-symbol">{ticker.symbol}</span>
		<span class="ticker-price" bind:this={tickerPrice}>$: {ticker.price || 'N/A'}</span>
	</div>
	<button class="ticker-button" on:click={toggleItemWatchList} bind:this={tickerButton}>
		Watch
	</button>
</div>

<style>
	.ticker-button {
		margin: 0 5%;
		color: #fff;
		border: none;
		cursor: pointer;
		padding: 2% 2%;
		border-radius: 4px;
		background: #0066ff;
	}
	.ticker {
		width: 100%;
		display: flex;
		align-items: center;
	}
	.ticker-row {
		width: 100%;
		color: #fff;
		display: flex;
		margin: 2% auto;
		padding: 2% 1%;
		column-gap: 1em;
		border-radius: 4px;
		text-align: center;
		background: #181a1b;
		justify-content: center;
	}
	.ticker-row:hover {
		background: #2e3235;
	}
	.ticker-name {
		color: #0066ff;
	}
	.ticker-symbol {
		font-weight: 700;
	}
	.ticker-price {
		color: #599b2d;
	}
</style>
