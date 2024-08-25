const Discord = require('discord.js');

module.exports = {
    name: "ping",
    execute(message){
        message.channel.send('pong')
    }
}