const noblox = require('noblox.js');
const { discordaccount: { token, prefix }, robloxaccount: { robloseccookie, groupid } } = require('../settings/secrets.json');

//checks amount of funds in the group
async function checkFunds(timeframe) {
    const currentUser = await noblox.setCookie(robloseccookie) 
    let avaiblefunds = await noblox.getGroupFunds(groupid)
    let grouprevenuesummary = await noblox.getGroupRevenueSummary(groupid, timeframe)
    return {
        avaiblefunds: avaiblefunds,
        pendingfunds: grouprevenuesummary.pendingRobux,
        premiumpayout: grouprevenuesummary.groupPremiumPayouts,
        grouppayout: grouprevenuesummary.groupPayoutRobux

    };
}

//shows group information
async function groupStats() {
    const currentUser = await noblox.setCookie(robloseccookie)
    let groupInfo = await noblox.getGroup(groupid)
    return {
        groupname: groupInfo.name,
        groupmembers: groupInfo.memberCount,
        groupshout: groupInfo.shout.body,
        groupowner: groupInfo.owner.username,
        groupid: groupInfo.id,
        groupdescription: groupInfo.description
    }
}

async function getMemberList() {
    const currentUser = await noblox.setCookie(robloseccookie)
    //get all roles in the group
    const roles = await noblox.getRoles(groupid)
    //gets id from each role
    const roleIDs = roles.map(role => role.ID);
    //list of every single member
    const playerlist = await noblox.getPlayers(groupid, roleIDs)
    //get player names
    const membernames = playerlist.map(user => user.username.toLowerCase())
    return { memberNames: membernames };
}

async function convertUserToId(user) {
    try {
        const currentUser = await noblox.setCookie(robloseccookie)
        const id = await noblox.getIdFromUsername(user)
        return { ID: id }
    } catch (error) {
        console.log(error);
    }
}

async function exileUser(id) {
    try {
        noblox.exile(groupid, id)
    } catch (error) {
        console.log(error);
    }
}

//gets the current group shout
async function readShout() {
    let groupshout = await noblox.getShout(groupid)
    return {
        currentshout: groupshout.body,
        createdby: groupshout.created,
        made: groupshout.updated,
        posterdisplayname: groupshout.poster.displayName,
        posteruser: groupshout.poster.username,
        posterid: groupshout.poster.userId
    }
}

async function logoGroup(){
    const logo = await noblox.getLogo(groupid)
    return {
        grouplogo: logo
        
    }
}

module.exports = {
    checkFunds,
    groupStats,
    readShout,
    logoGroup,
    getMemberList,
    convertUserToId,
    exileUser
};
