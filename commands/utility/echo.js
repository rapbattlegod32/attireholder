const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('echo')
    .setDescription('Repeats what you say')
    .addStringOption(option =>
		option.setName('input')
			.setDescription('The input to echo back')
            .setRequired(true)),
    async execute(interaction){
        const input = interaction.options.getString("input")
        await interaction.reply(input)
    }
}