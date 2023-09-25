.DEFAULT_GOAL := help
.PHONY: help dev


up: ## Run all the services, Svelte, Postgres. Running on linux, requires sudo command
	npm i
	docker compose up

clean: ## Remove all docker containers, volumes, images, etc. Running on linux, requires sudo command
	docker system prune -a --volumes;
	npm run remove-volumes

migrate: ## Run all migration scripts
	npm run migrate

make open-app:
	open http://localhost:5173

sh: ## Open a shell with all dependencies
	docker compose run web sh

sh-app: ## Open a shell with all dependencies
	docker compose run app sh

psql: ## Open a Postgres shell
	psql postgresql://postgres:postgres@localhost/postgres

build: ## Build the docker image used by the 'web' and 'celery' services in the docker-compose.yml
	docker compose build

build-no-cache: ## Build the docker image, without the the docker build cache, used by the 'web' and 'celery' services in the docker-compose.yml
	docker compose build web --no-cache

submit: ## Dump the Postgres database and package your project into a solution.zip file you can submit
	zip -r solution.zip .

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
