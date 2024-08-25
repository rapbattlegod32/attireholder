const Discord = require('discord.js');
const { discordaccount: { token, prefix }, robloxaccount: { robloseccookie, groupid } } = require('../../settings/secrets.json');
const { postShout } = require('../../functions/functions.js');

module.exports = {
    name: "postshout",
    async execute(message){
        try {
            const args = message.content.slice(prefix.length).trim().split(' ');
            const { postshoutbody, postshoutdate, shoutposteruser } = await postShout(args)
            const shoutembed = new Discord.MessageEmbed()
            .setTitle('Posted Shout:')
            .setDescription(`**Shout Information**\nShout was posted at: \`${postshoutdate}\` by \`${shoutposteruser}\`\n**Shout Body:**\n\`${postshoutbody}\``)
            .setColor('GREEN')
            .setTimestamp()
            message.channel.send(shoutembed)
        } catch(error) {
            console.log(error);
        }
    }
}