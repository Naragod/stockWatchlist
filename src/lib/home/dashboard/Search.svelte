<script>
	import { onMount } from 'svelte';
	import Ticker from './Ticker.svelte';
	import { watchedTickers } from '../../stores/ticker';

	let errLabel;
	let searchTerm = '';
	let stockNames = [];
	let tickerNames = [];
	let searchResults = [];
	let tickersToStockNames = {};
	let stockNamesToTickers = {};

	onMount(async () => {
		const response = await fetch('http://localhost:5173/api/tickers/');
		const { tickers } = await response.json();
		tickersToStockNames = tickers;

		Object.keys(tickers).map((key) => {
			tickerNames.push(key);
			stockNames.push(tickers[key]);
			stockNamesToTickers[tickers[key]] = key;
		});
	});

	watchedTickers.subscribe((obj) => {
		const keys = Object.keys(obj);
		searchResults = [...searchResults.filter((item) => !keys.includes(item['symbol']))];
	});

	const getUniqueTickers = (first, second, uniqueProp) => {
		const result = [...first, ...second].reduce((obj, curr) => {
			obj[curr[uniqueProp]] = curr;
			return obj;
		}, {});
		return [...Object.keys(result).map((key) => result[key])];
	};

	const search = (term) => {
		searchResults = [];
		const regex = new RegExp(term.toUpperCase());
		const stockNameMatches = stockNames.filter((item) => regex.test(item.toUpperCase()));
		const tickerSymbolMatches = tickerNames.filter((item) => regex.test(item.toUpperCase()));

		const stockNameMatchArr = stockNameMatches.map((item) => {
			return { symbol: stockNamesToTickers[item], name: item };
		});

		const stockSymbolMatchArr = tickerSymbolMatches.map((item) => {
			return { symbol: item, name: tickersToStockNames[item] };
		});

		searchResults = [...getUniqueTickers(stockNameMatchArr, stockSymbolMatchArr, 'symbol')];
	};

	const handleSearch = async () => {
		if (searchTerm.length > 0) {
			errLabel.style.display = 'none';
			search(searchTerm);
			return;
		}
		errLabel.style.display = 'block';
	};
</script>

<div class="search-bar">
	<h2>Search Stocks</h2>
	<div class="inputs">
		<input type="text" id="search-bar" placeholder="i.e: APPL or Apple" bind:value={searchTerm} />
		<span class="errMsg" bind:this={errLabel}>Invalid Ticker</span>
		<div class="search-buttons">
			<button on:click={handleSearch}>Search</button>
			<button on:click={() => search('')}>Show All</button>
			<button on:click={() => (searchResults = [])}>Clear</button>
		</div>
	</div>
	<div>
		<h1 class="search-header">Search Results: {searchResults.length}</h1>
		<div class="search-results">
			{#each searchResults as ticker}
				<Ticker {ticker} />
			{/each}
		</div>
	</div>
</div>

<style>
	.search-buttons {
		display: flex;
		column-gap: 1em;
	}
	.search-results {
		overflow-y: scroll;
		max-height: 200px;
	}
	.errMsg {
		display: none;
		color: red;
	}
	.search-bar {
		width: 600px;
		margin: 40px 0;
		padding: 20px;
		background: #fff;
		border-radius: 6px;
		border: 1px solid #444;
	}

	.search-bar .inputs * {
		margin: 10px 0;
		width: 100%;
	}
	.search-bar input {
		padding: 8px;
		border-width: 1px;
		border-radius: 4px;
		transition-duration: 200ms;
	}
	.search-bar button {
		background: #0066ff;
		color: #fff;
		border: none;
		border-radius: 4px;
		padding: 8px 0;
		cursor: pointer;
		transition-duration: 200ms;
	}
	.search-bar button:hover {
		background: #0044cc;
	}
</style>
