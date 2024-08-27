const Discord = require('discord.js');
const { checkIfPlayerExists } = require('../../functions/functions.js');

module.exports = {
    name: "exists",
    async execute(message, args) {
        if (!args[0]) {
            message.channel.send('Please give a username');
            return;
        }
        const { userId } = await checkIfPlayerExists(args[0])

        if (userId === null){
            message.channel.send('Player does not exist');
            return;
        }
        
        message.channel.send('Player exists with ID: ' + userId);
    }
}