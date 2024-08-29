const Discord = require('discord.js');
const { robloseccookie, administrators }= require('../../settings/secrets.json');
const { genXCSRF } = require('../../functions/functions.js');

module.exports = {
    name: "xcsrf",
    async execute(message){
        let { XCSRF } = await genXCSRF()
        const embed = new Discord.MessageEmbed()
        .setTitle('GENERATED XCSRF TOKEN:')
        .setColor('RED')
        .setTimestamp()
        .addFields(
            { name: `XCSRF TOKEN:`, value: `\`${XCSRF}\``, inline: true},
        )
        message.channel.send(embed);
    }
}