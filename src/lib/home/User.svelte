<script>
	import { loggedInUser } from '../stores/user';
	let user;

	const logout = () => {
		loggedInUser.set({ ...user, isLoggedIn: false });
	};

	loggedInUser.subscribe((value) => {
		const { first_name, last_name, username, email, isLoggedIn, id } = value;
		user = { first_name, last_name, username, email, isLoggedIn, id };
	});
</script>

<div class="user">
	<h3>
		Welcome, {user.first_name && user.last_name && user.first_name != '' && user.last_name != ''
			? `${user.first_name} ${user.last_name}`
			: user.email}!
	</h3>
	<button on:click={logout}>Logout</button>
</div>

<style>
	.user {
		display: flex;
		gap: 20px;
		align-items: center;
	}
	.user button {
		background: #fff;
		border: none;
		border-radius: 4px;
		padding: 8px 6px;
		cursor: pointer;
		margin-right: 100px;
		transition-duration: 200ms;
	}
</style>
