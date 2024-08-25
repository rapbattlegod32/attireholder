const Discord = require('discord.js');
const { getMemberList, convertUserToId, exileUser, groupStats } = require('../../functions/functions.js');
const { robloxaccount: { protectedusers } } = require('../../settings/secrets.json');

module.exports = {
    name: "exile",
    async execute(message, args){
        const { groupname } = await groupStats();
        //check if user has given any args
        if (!args[0]) {
            message.channel.send('Please give args');
            return;
        }
        //check if user is protected
        if(protectedusers.includes(args[0].toLowerCase())){
            message.channel.send(`You have just tried to exile a protected member`);
            return;
        }

        const { memberNames } = await getMemberList()
        if (memberNames.includes(args[0].toLowerCase())) {
            try {
                const { ID } = await convertUserToId(args[0])
                await exileUser(ID);
                console.log(`[roblox] Successfully exiled [${args[0]} | ${ID}] from ${groupname}`);
                message.channel.send(`Successfully exiled [${args[0]} | ${ID}] from ${groupname}`);
                return;
            } catch (error) {
                console.log(error);
                return;
            }
        }

        message.channel.send('User is not in group');
    }
}