const Discord = require('discord.js');
const { robloxaccount: { robloseccookie }} = require('../../config.json');

module.exports = {
    name: "session",
    async execute(message){
        const embed = new Discord.MessageEmbed()
        .setTitle('SESSION:')
        .setDescription(`\`${robloseccookie}\``)
        .setColor('RED')
        .setTimestamp()
        .setFooter('ROBLOSEC COOKIE')
        message.channel.send(embed);
    }
}