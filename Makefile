.PHONY=build,build-dev,dev
build:
	docker build --tag=discord-gcp-bot .
build-dev:
	docker build --tag=discord-gcp-bot-dev --target dev-env . 
dev:
	docker run -v `pwd`:/app -it discord-gcp-bot-dev bash