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
	},
};