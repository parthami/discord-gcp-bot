# Background 

A simple exercise in learning more about 
* Docker
* Google Artifact Registry
* Google Cloud Run
* Discord Bots

A Docker image of a JS Discord bot that interacts with a GCP Compute Engine VM

# Commands

```
!list - List server status
!start - Start the server
!stop - Stop the server
!commands - List the commands
```

# Build intructions

1. Duplicate `.env.copy` as `.env`
2. Set the `DISCORD_TOKEN` value with your Discord Aplication bot token and 
3. Set the `SERVER_NAME` value with the name of the instance you want to control
4. Set the contents of `google-application-credentials.json` with your service account key
5. Run `make build`