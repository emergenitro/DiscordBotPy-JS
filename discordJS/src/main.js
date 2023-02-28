const { Client, GatewayIntentBits, Collection } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.commands = new Collection();

const fs = require('fs');

require('dotenv').config({path:__dirname+'/../.env'});

const functions = fs.readdirSync('./functions').filter(file => file.endsWith('.js'));
const commandFolders = fs.readdirSync('./commands');
const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

(async () => {
    for (file of functions){
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(events, "./src/events");
    client.handleCommands(commandFolders, "./commands");
    client.login(process.env.TOKEN);
})();