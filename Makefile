.PHONY=build,dev
build:
	docker build --tag=discord-gcp-bot .  
dev:
	docker run -v `pwd`:/app -it discord-gcp-bot bash