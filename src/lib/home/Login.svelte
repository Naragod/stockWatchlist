<script>
	import { loggedInUser } from '../stores/user';

	let username = '';

	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			const response = await fetch('http://localhost:5173/api/login/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username })
			});
			const jsonResponse = await response.json();

			if (response.status != 200) throw jsonResponse;
			loggedInUser.set({ ...jsonResponse, isLoggedIn: true });
			console.info('Logged in successfully');
		} catch (err) {
			console.error('Unable to login', err);
		}
	};
</script>

<div class="login-form">
	<form on:submit={handleLogin}>
		<h2>Log in</h2>
		<div class="inputs">
			<input type="text" id="username" placeholder="Enter your username" bind:value={username} />
			<button type="submit">Login</button>
		</div>
	</form>
</div>

<style>
	.login-form {
		position: fixed;
		top: 30vh;
		left: 50vw;
		transform: translateX(-50%);
		background: #fff;
		border: 1px solid #444;
		border-radius: 6px;
		padding: 20px;
		width: 300px;
	}

	.login-form .inputs * {
		display: block;
		margin: 10px 0;
		width: 100%;
	}
	.login-form input {
		padding: 8px;
		border-width: 1px;
		border-radius: 4px;
		transition-duration: 200ms;
	}
	.login-form button {
		background: #0066ff;
		color: #fff;
		border: none;
		border-radius: 4px;
		padding: 8px 0;
		cursor: pointer;
		transition-duration: 200ms;
	}
	.login-form button:hover {
		background: #0044cc;
	}
</style>
