const { discordaccount: { token, prefix }, robloxaccount: { robloseccookie, groupid } } = require('../config.json');
const axios = require('axios');

async function getIdFromUsername(username) {
    try {
        const response = await axios.post('https://users.roblox.com/v1/usernames/users', {
            usernames: [
                username
            ],
            excludeBannedUsers: false
        });

        if (response.data && response.data.data && response.data.data[0]) {
            var id = response.data.data[0].id; var hasVerifiedBadge = response.data.data[0].hasVerifiedBadge; var displayName = response.data.data[0].displayName; var name = response.data.data[0].name;
            return {
                id,
                hasVerifiedBadge,
                displayName,
                name
            };
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error during API request:", error);
        return null;
    }
}



module.exports = {
    getIdFromUsername
}