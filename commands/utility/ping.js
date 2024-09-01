const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;
		await interaction.reply({ content: 'Pong!' });
		await wait(2_000);
		await interaction.editReply({ content: 'Ping!'});
	},
};