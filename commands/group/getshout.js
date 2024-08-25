const Discord = require('discord.js');
const { discordaccount: { token, prefix }, robloxaccount: { robloseccookie, groupid } } = require('../../settings/secrets.json');
const { readShout, groupStats } = require('../../functions/functions.js');

module.exports = {
    name: "getshout",
    async execute(message){
        try {
            const { groupname } = await groupStats();
            const { currentshout, createdby, made, posterdisplayname, posterid, posteruser } = await readShout()
            const newembed = new Discord.MessageEmbed()
            .setTitle('Group Shout:')
            .setDescription(`**Shout Information:**\n───────────────────\nCurrent Shout: \**\`${currentshout}\`\**\nDate: \**\`${made}\`\**\n───────────────────\n**Poster Information:**\n───────────────────\nDislay Name: \**\`${posterdisplayname}\`\**\nUsername: \**\`${posteruser}\`\**\nID: \**\`${posterid}\`\**\n───────────────────\n**Other Information:**\n───────────────────\nFirst shout date: \**\`${createdby}\`\**`)
            .setColor('BLUE')
            .setFooter(groupname)
            .setTimestamp()
            message.channel.send(newembed)
        } catch(error) {
            console.log(error);
        }
    }
}