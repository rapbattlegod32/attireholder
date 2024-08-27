const Discord = require('discord.js');
const { getProfile } = require('../../functions/functions.js');

module.exports = { 
    name: "profile",
    async execute(message, args){
        if (!args[0]){
            message.channel.send('Please send args.');
            return;
        }

        let { ID, playerinfoage, playerinfodisplayname, playerinfoblurb, playerinfofollowercount, playerinfofollowingcount, playerinfofriendcount, playerinfoisbanned, playerinfojoindate, playerinfooldnames } = await getProfile(args[0]);

        const embed = new Discord.MessageEmbed()
        .setTitle(`Profile Info(${args[0]})`)
        .addFields(
            { name: `Username`, value: `\`${args[0]}\``, inline: true },
            { name: `Display Name`, value: `\`${playerinfodisplayname}\``, inline: true },
            { name: `ID`, value: `\`${ID}\``, inline: true },
            { name: `Followers`, value: `\`${playerinfofollowercount}\``, inline: true },
            { name: `Following`, value: `\`${playerinfofollowingcount}\``, inline: true },
            { name: `Friends`, value: `\`${playerinfofriendcount}\``, inline: true },
            { name: `Player Age`, value: `\`${playerinfoage}\``, inline: true },
            { name: `isBanned?`, value: `\`${playerinfoisbanned}\``, inline: true },
            { name: `Date Joined`, value: `\`${playerinfojoindate}\``, inline: false },
            { name: `Blurb`, value: `\`"${playerinfoblurb}"\``, inline: false },
            { name: `Old Names`, value: `\`${playerinfooldnames}\``, inline: false }
            

        )
        .setColor('RED')
        .setFooter(args[0])
        .setURL(`https://www.roblox.com/users/${ID}/profile`)
        .setTimestamp()
        message.channel.send(embed)

    }
}