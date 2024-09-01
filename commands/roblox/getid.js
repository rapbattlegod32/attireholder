const { SlashCommandBuilder } = require('discord.js');
const { getIdFromUsername } = require('../../functions.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('getid')
		.setDescription('Gets ID from a username')
		.addStringOption(option => 
			option.setName('username')
			.setDescription('username to get ID from')
			.setRequired(true)),
	async execute(interaction) {
        const username = interaction.option.getString("username");
		const { userId } = await getIdFromUsername(username);

		await interaction.reply(`USERNAME: \`${username}\`\nID: \`${userId}\``)
	},
};