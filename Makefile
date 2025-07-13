help:
	@echo "Usage: make <target>"
	@echo "Targets:"
	@echo "  build: Build the Docker images"
	@echo "  up: Start the Docker containers"
	@echo "  run-frontend: Run the frontend container"
	@echo "  run-backend: Run the backend container"
	@echo "  down: Stop and remove the Docker containers"
	@echo "  restart: Restart the Docker containers"

build:
	docker compose build

npm-install:
	cd frontend && npm install
	cd backend && npm install

up:
	docker compose up

run-frontend:
	docker compose up frontend && docker compose down frontend

run-backend:
	docker compose up backend && docker compose down backend

down:
	docker compose down

restart:
	make down && make up
