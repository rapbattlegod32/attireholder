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

async function getProfile(username) {
  try {
    const ID = await noblox.getIdFromUsername(username);
    let playerinfo = await noblox.getPlayerInfo(ID);

    return {
      playerinfoage: playerinfo.age,
      playerinfodisplayname: playerinfo.displayName,
      playerinfoblurb: playerinfo.blurb,
      playerinfofollowercount: playerinfo.followerCount,
      playerinfofollowingcount: playerinfo.followingCount,
      playerinfofriendcount: playerinfo.friendCount,
      playerinfoisbanned: playerinfo.isBanned,
      playerinfojoindate: playerinfo.joinDate,
      playerinfooldnames: playerinfo.oldNames,
      ID: ID
    };
  } catch (error) {
    console.log(error);
  }
}

async function checkIfPlayerExists(username){
    try {
        const userId = await noblox.getIdFromUsername(username);
        if (userId === null){
            console.log('Player does not exist');
            return;
        }
        return { userId }
    } catch (error) {
        console.log(error);
    }
}

async function getGroups(username){
    try {
        const userId = await noblox.getIdFromUsername(username)
        let groups = await noblox.getGroups(userId)
        return { groupslength: groups.length }
    } catch (error) { 
        console.log(error);
    }
}

async function getBadges(username){
    try { 
        const userId = await noblox.getIdFromUsername(username)
        let badges = await noblox.getPlayerBadges(userId)
        return {
            numberofbadges: badges.length
        }
    } catch (error) {
        console.log(error);
    }
}

async function playerPicture(username){
    try {
        let userId = await noblox.getIdFromUsername(username)
        let picture = await noblox.getPlayerThumbnail(userId)
        let imageurl = picture[0].imageUrl;
        return { imageurl }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    checkFunds,
    groupStats,
    readShout,
    logoGroup,
    getMemberList,
    convertUserToId,
    exileUser,
    getProfile,
    checkIfPlayerExists,
    getGroups,
    getBadges,
    playerPicture
};
