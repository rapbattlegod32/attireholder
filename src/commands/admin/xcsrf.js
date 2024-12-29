const Discord = require('discord.js');
const { robloseccookie, administrators } = require('../../../config/config.json');
const { genXCSRF } = require('../../utils/functions.js');

module.exports = {
    name: "xcsrf",
    async execute(message) {
        let { XCSRF } = await genXCSRF();
        const embed = new Discord.MessageEmbed()
            .setTitle('🔒 Generated XCSRF Token')
            .setColor('#FF0000')
            .setThumbnail('https://example.com/thumbnail.png') // Add a relevant thumbnail URL
            .setDescription('Here is your newly generated XCSRF token.')
            .addFields(
                { name: 'XCSRF Token:', value: `\`${XCSRF}\``, inline: true },
                { name: 'Requested by:', value: message.author.tag, inline: true },
                { name: 'Timestamp:', value: new Date().toLocaleString(), inline: true }
            )
            .setFooter('XCSRF Token Generator', 'https://static-00.iconduck.com/assets.00/lock-key-icon-487x512-60e2skh3.png') // Add a relevant footer icon URL
            .setTimestamp();

        message.channel.send(embed);
    }
}