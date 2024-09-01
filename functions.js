const { discordaccount: { token, prefix }, robloxaccount: { robloseccookie, groupid } } = require('./config.json');
const fetch = require('node-fetch');
const fs = require('node:fs');

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
        
        if (response.ok) {
            const data = await response.json();
            
            if (data && data.data && data.data.length > 0) {
                const userid = data.data[0].id;
                console.log(userid);
                return {
                    userId: userid 
                }
            } else {
                let userId = `ID of ${username} was not found due to user probably not existing`;
                return {
                    userId
                }
            }
        } else {
            console.log("Error: " + response.status);
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getIdFromUsername,
}