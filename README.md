# Instructions

I have developed this application in a linux environment, the `sudo` command may be unneccesary outside of this context.

To run, execute the following commands:

 - `make up`
 - `make migrate`
 - `make open-app`

To add new users to the database, create a new migration file with the user values and execute `make migrate`.

 # Context

 I have taken on this challenge with Svelte and SvelteKit, rather than React and Django.
 [Svelte](https://svelte.dev/) is a web framework that precompiles front end code and [SvelteKit](https://kit.svelte.dev/)
 is meta framework, that fascilitates front and back end development.

 Based on exisitng case study implementation, authentication happens as a quick comparison againt a user's username.

# Service Files

[SvelteKit](https://kit.svelte.dev/) is a powerful framework, that routes based on file path locations. A file begining with `+page` inside the following folder structure: `~/src/routes/login` will route on the client to `http/s://host:port/login`. Similarly, a file with extension `+server.js` will expose a similar route endpoint on the server. 

Inside `+server.js` files, one can define `POST`, `GET`, `PATCH`, etc methods. To expose a query path named `id`, we create a folder with following notation: `[id]`. 

There are 5 endpoints:

- `/api/login` - Accepts a `POST` request. Used by the `Login.svelte` component to authenticate a user based on their username.
- `/api/subscriptions/[userId]` -  Accepts a `GET` request and path param `userId`. Used to get a user's watchlist subscriptions.
- `/api/subscriptions` - Accepts a `POST` request. Used by the `Ticker.svelte` component to watch/unwatch a specific stock from a user's account.
- `/api/tickers/[tickers]` - Accepts a `GET` request. Used by the `Ticker.svelte` component to obtain a stock's price.
- `/api/tickers/` - Accepts a `GET` request. Used by the `Search.svelte` component to get all available stock tickers in the case study.

There are 8 client side files:

- `+page.svelte` - Entry point of the application.
- `+layout.svelte` - Styling file. Applied to all files in its scope.
- `User.svelte` - Imported component used by `+page.svelte` to display the currently logged in user.
- `Login.svelte` - Imported by `+page.svelte` to handle authentication.
- `Dashboard.svelte` - Imported by `+page.svelte`. Displayed to authenticated users.
- `Search.svelte` - Imported by `Dashboard.svelte`. Used to search for stocks to add to the watchlist.
- `WatchList.svelte` - Imported by `Dashboard.svelte`. Used to list all subscribed to stocks.
- `Ticker.svelte` - Crucial component. Imported by `Dashboard.svete` and `WatchList.svelte`. Used to display individual stocks, their names, and prices.


# Design Considerations

- This was a complex end to end, client, server project. I decided to work with the technologies I am familiar in order to deliver a timely solution.

- I considered using redis to cache stock prices and save api calls. I decided against it, as if the purpose of this application is to view realtime (5 second) price data. Caching would defeat the purpose.

- I created the `casestudy_ticker_subscriptions` to store user, stock subscriptions. This one table is capable of supporting millions of users, each one with a few hundred stock subscriptions.


# Creator
Developed by Mateo Naranjo. Backend focused engineer with over 7 years of professionaly building cool things.

Check out more of my work on my [github.](https://github.com/Naragod)