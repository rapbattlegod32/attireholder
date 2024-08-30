const Discord = require('discord.js');
const { getProfile, getGroups, getBadges, playerPicture, seePremium, fetchCollectibles, checkIfPlayerExists, isThereAPrimaryGroup } = require('../../functions/functions.js');

module.exports = { 
    name: "profile",
    async execute(message, args){
        if (!args[0]){
            message.channel.send('Please send args.');
            return;
        }

        const result = await checkIfPlayerExists(args[0]);
        
        if (!result.exists) {
            message.channel.send('Player does not exist.');
            return;
        } 

        let { premium } = await seePremium(args[0]);
        let { ID, playerinfoage, playerinfodisplayname, playerinfoblurb, playerinfofollowercount, playerinfofollowingcount, playerinfofriendcount, playerinfoisbanned, playerinfojoindate, playerinfooldnames } = await getProfile(args[0]);
        let { imageurl } = await playerPicture(args[0]);
        let { numberofbadges } = await getBadges(args[0]);
        let { groupslength } = await getGroups(args[0]);
        let { sum, amountofcollectibles } = await fetchCollectibles(args[0]);
        let { primaryboolean, role } = await isThereAPrimaryGroup(args[0]);

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
            { name: `Badge Count`, value: `\`${numberofbadges}\``, inline: true },
            { name: `isBanned?`, value: `\`${playerinfoisbanned}\``, inline: true },
            { name: `Groups In`, value: `\`${groupslength}\``, inline: true },
            { name: `Premium?`, value: `\`${premium}\``, inline: true },
            { name: `Limited Count`, value: `\`${amountofcollectibles}\``, inline: true},
            { name: `Total RAP`, value: `\`${sum}\``, inline: true },
            { name: `Primary Group`, value: `\`${primaryboolean}\``, inline: true },
            { name: `Role`, value: `\`${role}\``, inline: true },
            { name: `Date Joined`, value: `\`${playerinfojoindate}\``, inline: false },
            { name: `Blurb`, value: `\`"${playerinfoblurb}"\``, inline: false },
            { name: `Old Names`, value: `\`${playerinfooldnames}\``, inline: false },
            

        )
        .setColor('RED')
        .setFooter(args[0])
        .setThumbnail(imageurl)
        .setImage()
        .setURL(`https://www.roblox.com/users/${ID}/profile`)
        .setTimestamp()
        message.channel.send(embed)
    }
}