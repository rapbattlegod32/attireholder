const fs = require('fs');
const Discord = require('discord.js');
const noblox = require('noblox.js');
const { discordaccount: { token, prefix }, robloxaccount: { robloseccookie, groupid } } = require('./config.json');
const { groupStats, yearSales } = require('./functions/functions.js');


const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}
client.once('ready', async () => {
	console.log(`[discord] Successfully logged into [${client.user.tag}] | [${client.user.id}]`);

	async function randomstatus(){
		let { groupmembers, groupname } = await groupStats();
		let { revenueSum } = await yearSales();
		let arr = [
			{ name: `${groupmembers} members`, type: 'WATCHING' },
			{ name: `with ${revenueSum} robux`, type: 'PLAYING' },
			{ name: `over ${groupname}`, type: 'WATCHING'}
		];
		let pickedstatus = arr[Math.floor(arr.length * Math.random())];
		client.user.setActivity(pickedstatus);  // Set activity here
	}

	var intervalID = globalThis.setInterval(randomstatus, 15000);  // Call randomstatus every 15 seconds
});



client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			return message.reply('You can not do this!');
		}
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

async function startApp () {
    const currentUser = await noblox.setCookie(robloseccookie) 
    console.log(`[roblox] Successfully logged into [${currentUser.name}] | [${currentUser.id}]`)
}
startApp()


client.login(token);