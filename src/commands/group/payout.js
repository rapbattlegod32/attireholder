const Discord = require('discord.js');
const { discordaccount: { token, prefix }, robloxaccount: { robloseccookie, groupid } } = require('../../../config/config.json');

// not using noblox gonna have to do this one by myself

module.exports = {
    name: "payout",
    async execute(message, args){
        try {
            let username = args[0];
            let amount = args[1];
            await groupPayout(username, amount)
            message.channel.send(`Sent ${amount} to ${username}`)
        } catch(error){
            console.log(error);
        }
    }
}