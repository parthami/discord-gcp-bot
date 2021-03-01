require('dotenv').config()
const Compute = require('@google-cloud/compute');
const Discord = require('discord.js');

const compute = new Compute();
const client = new Discord.Client();
const zone = compute.zone(process.env.ZONE);
let vm = zone.vm(process.env.SERVER);

const commands = {
    list: '!list',
    start: '!start',
    stop: '!stop',
    commands: '!commands'
};

vm.get().then((data) => {
    vm = data[0];
}).catch((error) => {
    console.log(error);
});

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    switch (message.content) {
        case commands.list:
            message.channel.send('Here is a list of servers:')
            message.channel.send(`${vm.name}: ${vm.metadata.status}`)
            break;
        case commands.start:
            message.channel.send('Trying to start the server...')
            vm.start().then((data) => {
                message.channel.send(`Server responsed with :${data[1].status}`);
            });
            break;
        case commands.stop:
            message.channel.send('Trying to start the server...')
            vm.stop().then((data) => {
                message.channel.send(`Server responsed with :${data[1].status}`);
            });
            break;
        case commands.commands:
            message.channel.send('Commands are: ' + Object.values(commands).join(', '))
            break;

        default:
            break;
    }
});

client.login(process.env.DISCORD_TOKEN);
