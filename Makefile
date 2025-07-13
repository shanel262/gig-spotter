build:
	docker compose build

up:
	docker compose up -d

run-frontend:
	docker compose up frontend && docker compose down frontend

run-backend:
	docker compose up backend && docker compose down backend

down:
	docker compose down

restart:
	make down && make up
