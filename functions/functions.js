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

//post a group shout
async function postShout(shoutbody) {

}


module.exports = {
    checkFunds,
    groupStats,
    readShout,
    postShout,
    logoGroup
};
