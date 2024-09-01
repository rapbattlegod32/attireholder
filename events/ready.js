const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`[discord] Logged in as {${client.user.username} | ${client.user.id}}`);
    }
}