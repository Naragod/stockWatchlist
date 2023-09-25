import { writable } from 'svelte/store';

export const loggedInUser = writable({
	isLoggedIn: false,
	first_name: '',
	last_name: '',
	email: 'unknown',
	id: 1,
	username: ''
});
