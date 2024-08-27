const Discord = require('discord.js');

module.exports = {
    name: "help",
    aliases: "cmd",
    async execute(message, args){
        const embed = new Discord.MessageEmbed()
        .setTitle('Commands:')
        .setDescription(`
            **\([example] mandatory params)\**\n
            **\({example} optional params)\**\n
            **\`;cmd:\`** \`this command.\`\n
            **\`;exile [username]:\`** \`Exile a member.\`\n
            **\`;funds:\`** \`See financial data of the group.\`\n
            **\`;getshout:\`** \`Get current shout of group.\`\n
            **\`;groupstats:\`** \`Group info.\`\n
            **\`;exists: [username]\`** \`Check if player exists.\`\n
            **\`;profile [username] {advanced}:\`** \`Gets a users profile.\`\n
            **\`;ping:\`** \`Pong.\`\n
        `)
        .setTimestamp()
        .setColor('BLUE')
        message.channel.send(embed);
    }
}