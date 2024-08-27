const Discord = require('discord.js');
const { currentUser } = require('../../functions/functions.js'); 

module.exports = {
    name: "authenticateduser",
    async execute(message){
        const { displayname, username, id } = await currentUser();
        const embed = new Discord.MessageEmbed()
        .setTitle('Current Authenticated User:')
        .addFields(
            { name: `Username`, value: `\`${username}\``, inline: true },
            { name: `Display Name`, value: `\`${username}\``, inline: true },
            { name: `ID`, value: `\`${id}\``, inline: true }
        )
        .setTimestamp()
        message.channel.send(embed);
    }
}