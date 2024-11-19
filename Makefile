all: build install up

build:
	docker compose build

up:
	docker compose up

down:
	docker compose down

exec:
	docker compose run app bash

install:
	docker compose run app npm install
