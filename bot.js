require('dotenv').config()
const Compute = require('@google-cloud/compute');
const Discord = require('discord.js');

const compute = new Compute();
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    // LIST
    if (message.content === '!list') {
        message.channel.send('Here is a list of servers:')
        compute.getVMs()
            .then((vms) => {
                vms.forEach(vm => {
                    message.channel.send(vm[0].name + ': ' + vm[0].metadata.status)
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    // START
    if (message.content === '!start') {
        message.channel.send('Trying to start the server...')

        compute.getVMs()
            .then((vms) => {
                const vm = vms.filter(vm => vm[0].name == process.env.SEVER_NAME)[0][0]
                vm.start().then((data) => {
                    const apiResponse = data[1];
                    message.channel.send(apiResponse.status);
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    // STOP
    if (message.content === '!stop') {
        message.channel.send('Trying to stop the server...')

        compute.getVMs()
            .then((vms) => {
                const vm = vms.filter(vm => vm[0].name == process.env.SEVER_NAME)[0][0]
                vm.stop().then((data) => {
                    const apiResponse = data[1];
                    message.channel.send(apiResponse.status);
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
});

client.login(process.env.DISCORD_TOKEN);
