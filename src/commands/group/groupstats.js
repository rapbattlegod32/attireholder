const Discord = require('discord.js');
const { discordaccount: { token, prefix }, robloxaccount: { robloseccookie, groupid } } = require('../../../config/config.json');
const { groupStats, groupLink, logoGroup, checkFunds } = require('../../utils/functions.js');


module.exports = {
    name: "groupstats",
    async execute(message){
        try {
        const { grouplogo } = await logoGroup();
        const { groupname, groupmembers, groupshout, groupowner, groupid, groupdescription, groupislocked, grouppublicentry } = await groupStats();    
        const { avaiblefunds } = await checkFunds()
        const { grouplink } = await groupLink();
        const embed = new Discord.MessageEmbed()
        .setURL(grouplink)
        .setTitle('Group Information:')
        .setDescription(`Name: \**\`${groupname}\`\**\nID: \**\`${groupid}\`\**\nOwner: \**\`${groupowner}\`\**\nMembers: \**\`${groupmembers}\`\**\nFunds: \**\`R$${avaiblefunds}\`\**\nShout: \**\`${groupshout}\`\**\nDescription: \**\`${groupdescription}\`\**`)
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