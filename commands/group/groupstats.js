const Discord = require('discord.js');
const { discordaccount: { token, prefix }, robloxaccount: { robloseccookie, groupid } } = require('../../settings/secrets.json');
const { groupStats, logoGroup } = require('../../functions/functions.js');


module.exports = {
    name: "groupstats",
    async execute(message){
        try {
        const { grouplogo } = await logoGroup();
        const { groupname, groupmembers, groupshout, groupowner, groupid, groupdescription, groupislocked, grouppublicentry } = await groupStats();    
        const embed = new Discord.MessageEmbed()
        .setTitle('Group Information:')
        .setDescription(`Name: \**\`${groupname}\`\**\nID: \**\`${groupid}\`\**\nOwner: \**\`${groupowner}\`\**\nMembers: \**\`${groupmembers}\`\**\nShout: \**\`${groupshout}\`\**\nDescription: \**\`${groupdescription}\`\**`)
        .setTimestamp()
        .setColor('RED')
        .setFooter(groupname)
        .setImage(grouplogo)
        message.channel.send(embed)
        } catch(error){
            console.log(error);
        }
    }
}