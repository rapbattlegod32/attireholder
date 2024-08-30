// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { robloxaccount: { robloseccookie }, discordaccount: { prefix, token }  } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
	console.log(`[discord] Successfully logged into [${readyClient.user.tag}] | [${readyClient.user.id}]`);

	async function randomstatus(){
		// let { groupmembers, groupname } = await groupStats();
		// let { revenueSum } = await yearSales();
		let arr = [
			// { name: `${groupmembers} members`, type: 'WATCHING' },
			// { name: `with ${revenueSum} robux`, type: 'PLAYING' },
			// { name: `over ${groupname}`, type: 'WATCHING'}
			{ name: `999 members`, type: 'WATCHING' },
			{ name: `with 999 robux`, type: 'PLAYING' },
			{ name: `over Androgenic Attire`, type: 'WATCHING'}
		];
		let pickedstatus = arr[Math.floor(arr.length * Math.random())];
		client.user.setActivity(pickedstatus);  // Set activity here
	}

	var intervalID = globalThis.setInterval(randomstatus, 15000);  // Call randomstatus every 15 seconds
});

// Log in to Discord with your client's token
client.login(token);
