require('dotenv').config()
const Compute = require('@google-cloud/compute');
const Discord = require('discord.js');

const compute = new Compute();
const client = new Discord.Client();
const zone = compute.zone(process.env.ZONE);
const vm = zone.vm(process.env.SERVER);

vm.get().then(function (data) {
    vm = data[0];
}).catch((error) => {
    console.log(error);
});

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    if (message.content === '!list') {
        message.channel.send('Here is a list of servers:')
        message.channel.send(`${vm[0].name}: ${vm[0].metadata.status}`)
    }

    if (message.content === '!start') {
        message.channel.send('Trying to start the server...')

        vm.start().then((data) => {
            message.channel.send(`Server responsed with :${data[1].status}`);
        });
    }
    if (message.content === '!stop') {
        message.channel.send('Trying to stop the server...')

        vm.stop().then((data) => {
            message.channel.send(`Server responsed with :${data[1].status}`);
        });

    }
});

client.login(process.env.DISCORD_TOKEN);
