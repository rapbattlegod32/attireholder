const Discord = require('discord.js');
const { discordaccount: { token, prefix }, robloxaccount: { robloseccookie, groupid } } = require('../../settings/secrets.json');
const { readShout, groupname } = require('../../functions/functions.js');

module.exports = {
    name: "getshout",
    async execute(message){
        try {
            const { currentshout, createdby, made, posterdisplayname, posterid, posteruser } = await readShout()
            const newembed = new Discord.MessageEmbed()
            .setTitle('Group Shout:')
            .setDescription(`**Shout Information:**\nCurrent Shout: \`${currentshout}\`\nDate: \`${made}\`\n**Poster Information:**\nDislay Name: \`${posterdisplayname}\`\nUsername: \`${posteruser}\`\nID: \`${posterid}\`\n**Other Information:**\nFirst shout date: \`${createdby}\``)
            .setColor('BLUE')
            .setFooter(groupname)
            .setTimestamp()
            message.channel.send(newembed)
        } catch(error) {
            console.log(error);
        }
    }
}