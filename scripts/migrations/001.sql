CREATE TABLE IF NOT EXISTS casestudy_users(
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL DEFAULT '',
    last_name TEXT NOT NULL DEFAULT '',
    email TEXT NOT NULL,
    username TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS casestudy_stocks(
    symbol text PRIMARY KEY,
    "name" TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS casestudy_ticker_subscriptions(
    id SERIAL PRIMARY KEY,
    -- big int is used here because, given that this is a linking table, there can be millions of users each with thousands of ticker subscriptions
    user_id INT NOT NULL,
    stock_id TEXT NOT NULL REFERENCES casestudy_stocks(symbol),
    UNIQUE (user_id, stock_id)
);

CREATE TABLE IF NOT EXISTS casestudy_migrations(
    id SERIAL,
    file_name TEXT NOT NULL UNIQUE,
    inserted_date DATE NOT NULL DEFAULT CURRENT_DATE
);

-- INSERT USERS
INSERT INTO casestudy_users(first_name, last_name, email, username) VALUES ('', '', 'root@casestudy.com', 'root');
INSERT INTO casestudy_users(first_name, last_name, email, username) VALUES ('Mateo', 'Nar', 'mateo@casestudy.com', 'mateo');

-- INSERT STOCKS
INSERT INTO casestudy_stocks VALUES('AAPL', 'Apple'), ('GOOG', 'Alphabet');