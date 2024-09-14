const { SlashCommandBuilder } = require('discord.js');
const { getUsernameFromID } = require('../../functions/userFunctions.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('getuser')
        .setDescription('Gets a username from an ID')
        .addIntegerOption(option =>
            option.setName('id')  // Changed 'ID' to 'id'
                .setDescription('ID to get username from')
                .setRequired(true)),
    async execute(interaction) {
        const ID = interaction.options.getInteger("id");  // Use 'id' here as well
        const { hasverifiedbadge, username, displayName } = await getUsernameFromID(ID);

        await interaction.reply(`\`USERNAME:\` \`${username}\`\n\`DISPLAY NAME:\` ${displayName}\n\`ID:\` \`${ID}\`\n\`VERIFIED BADGE:\` \`${hasverifiedbadge}\``)
    },
}
