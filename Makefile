docker-ui:
	cd src/agentcraft-all/agentcraft-fe ; \
	npm run build ; \
	docker buildx build -t agentcraft-ui:v0.0.1 .

docker-api:
	cd src/agentcraft-all/agentcraft-be ; \
	docker buildx build -t agentcraft-api:v0.0.1 .



docker: docker-ui docker-api

run-docker:
	docker-compose up -d
	
stop-docker:
	docker-compose down

run-api:
	source ./venv/bin/activate
	cd aiwuxian-all/aiwuxian-api ; \
	export PYTHONPATH="${PYTHONPATH}:$(pwd)" ; \
	python app/main.py

run-ui:
	cd aiwuxian-all/aiwuxian-manager ; \
	npm run dev