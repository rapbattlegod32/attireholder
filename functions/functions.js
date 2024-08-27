const noblox = require('noblox.js');
const { discordaccount: { token, prefix }, robloxaccount: { robloseccookie, groupid } } = require('../settings/secrets.json');
const fetch = require('node-fetch');

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
            console.log('[roblox] Player does not exist');
            return { exists: false, userId: null };
        }
        return { exists: true, userId };
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

async function seePremium(username){
    try {
        let userId = await noblox.getIdFromUsername(username)
        let premium = await noblox.getPremium(userId)
        return { premium }
    } catch (error) {
        console.log(error);
    }
}

async function fetchCollectibles(username){
    try {
        let userId = await noblox.getIdFromUsername(username)
        
        //check if inventory is viewable
        
        const response = await fetch(`https://inventory.roblox.com/v1/users/${userId}/can-view-inventory`);
        const data = await response.json();
        console.log(data.canView);

        if (data.canView === false){
            let amountofcollectibles = 'inv access denied';
            let sum = 'inv access denied';
            return { amountofcollectibles, sum };
        }

        let collectibles = await noblox.getCollectibles({userId: userId})
        let amountofcollectibles = collectibles.length;
        let arrprice = collectibles.map(obj => obj.recentAveragePrice)
        let sum = 0;
        arrprice.forEach((el) => sum += el);

        return {
            amountofcollectibles,
            sum
        }
    } catch (error) {
        console.log(error);
    }
}

async function genXCSRF(){
    try {
        const currentUser = await noblox.setCookie(robloseccookie)
        const XCSRF = await noblox.getGeneralToken(robloseccookie)
        return { XCSRF }
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
    playerPicture,
    genXCSRF,
    seePremium,
    fetchCollectibles
};
