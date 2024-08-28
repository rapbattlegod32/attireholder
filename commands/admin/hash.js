const Discord = require('discord.js');
const { getHash } = require('../../functions/functions.js');

module.exports = {
    name: "hash",
    async execute(message){
        let { hash } = await getHash()
        const embed = new Discord.MessageEmbed()
        .setTitle('HASH')
        .setColor('RED')
        .setTimestamp()
        .setFooter('HASH')
        .setDescription(`\`${hash}\``)
        message.channel.send(embed)
    }
}