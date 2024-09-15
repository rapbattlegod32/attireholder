const { SlashCommandBuilder } = require('discord.js');
const { getIdFromUsername } = require('../../functions/userFunctions.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('getid')
		.setDescription('Gets ID from a username')
		.addStringOption(option => 
			option.setName('username')
			.setDescription('username to get ID from')
			.setRequired(true)),
	async execute(interaction) {
		const input = interaction.options.getString("username");
		const result = await getIdFromUsername(input);
		if (result) {
			const { id, hasVerifiedBadge, displayName, name } = result;
			await interaction.reply(`User ID: **\`${id}\`**\nUsername: **\`${name}\`**\nDisplay Name: **\`${displayName}\`**\nVerified Badge: **\`${hasVerifiedBadge}\`**`);
		} else {
			await interaction.reply('Error: getIdFromUsername returned null. (user doesnt exist)');
		}
	},
};
