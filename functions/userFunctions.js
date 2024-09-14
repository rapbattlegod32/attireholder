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
        
        if (response.ok) {
            const data = await response.json();
            
            if (data && data.data && data.data.length > 0) {
                const userid = data.data[0].id;
                const hasverifiedbadge = data.data[0].hasVerifiedBadge;
                const displayName = data.data[0].displayName; 
                console.log(userid);
                return {
                    userId: userid,
                    hasverifiedbadge,
                    displayName
                }
            } else {
                let userId = null; let hasverifiedbadge = null; let displayName = null;
                return {
                    userId,
                    hasverifiedbadge,
                    displayName
                }
            }
        } else {
            console.log("Error: " + response.status);
        }
    } catch (error) {
        console.log(error);
    }
}

async function getUsernameFromID(ID){
    try {
        const body = {
            userIds: [
                ID
            ],
            excludeBannedUsers: false
        }

        const response = await fetch('https://users.roblox.com/v1/users', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {'Content-Type': 'application/json'}
        });

        if (response.ok) {
            const data = await response.json();
            
            if (data && data.data && data.data.length > 0) {
                const username = data.data[0].name;
                const hasverifiedbadge = data.data[0].hasVerifiedBadge;
                const displayName = data.data[0].displayName; 
                return {
                    username,
                    hasverifiedbadge,
                    displayName
                }
            } else {
                let username = null; let hasVerifiedBadge = null; let displayName = null;
                return {
                    username,
                    hasVerifiedBadge,
                    displayName
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
    getUsernameFromID
}