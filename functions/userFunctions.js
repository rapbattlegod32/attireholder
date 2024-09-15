const { discordaccount: { token, prefix }, robloxaccount: { robloseccookie, groupid } } = require('../config.json');
const fetch = require('node-fetch');

async function getIdFromUsername(username){
    try {
        const body = {
            usernames: [
                username
            ],
            excludeBannedUsers: false
        };
        
        const response = await fetch(`https://users.roblox.com/v1/usernames/users`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {'Content-Type': 'application/json'}
        });
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getIdFromUsername,
    getUsernameFromID
}