const { SlashCommandBuilder } = require('discord.js');
const { getUserFromId } = require('../../functions/userFunctions.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('getuser')
        .setDescription('Gets a username from an ID')
        .addIntegerOption(option =>
            option.setName('id')
                .setDescription('ID to get username from')
                .setRequired(true)),
    async execute(interaction) {
        const input = interaction.options.getInteger("id");
        const result = await getUserFromId(input);

        if(result) {
            const { name, displayName, hasVerifiedBadge } = result;
            await interaction.reply(`Username: **\`${name}\`**\nDisplay Name: **\`${displayName}\`**\nUser ID: **\`${input}\`**\nVerified Badge: **\`${hasVerifiedBadge}\`**`);
        } else {
            await interaction.reply('Error: getIdFromUsername returned null. (user doesnt exist)');
        }
    },
};
