<script>
	import Dashboard from '$lib/home/dashboard/Dashboard.svelte';
	import Login from '$lib/home/Login.svelte';
	import User from '$lib/home/User.svelte';
	import { loggedInUser } from '$lib/stores/user';

	let isLoggedIn = false;

	loggedInUser.subscribe((value) => {
		isLoggedIn = value.isLoggedIn;
	});
</script>

<div class="app">
	<header>
		<h1>Albert stock watch</h1>
		{#if isLoggedIn}
			<User />
		{/if}
	</header>
	{#if isLoggedIn == false}
		<Login />
	{:else}
		<section>
			<Dashboard />
		</section>
	{/if}
</div>

<style>
	.app {
		position: absolute;
		top: 0;
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.app section {
		height: 100%;
		margin: 60px;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 4px dashed #444;
		border-radius: 8px;
	}

	header {
		width: 100%;
		height: 80px;
		background: #0066ff;
		color: #fff;
		top: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 30px;
	}
</style>
