const noblox = require('noblox.js');
const fetch = require('node-fetch');
const fs = require('node:fs');
const axios = require('axios');

const { discordaccount: { prefix }, robloxaccount: { groupid } } = require('../../config/config.json');
require('dotenv').config({ path: '../../config/.env' }); // Adjust path based on location
const roblosecurity = process.env.ROBLOSECURITY_COOKIE;

//checks amount of funds in the group
async function checkFunds(timeframe) {
    const currentUser = await noblox.setCookie(roblosecurity) 
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
    const currentUser = await noblox.setCookie(roblosecurity)
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
    const currentUser = await noblox.setCookie(roblosecurity)
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
        const currentUser = await noblox.setCookie(roblosecurity)
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
    console.log(`Fetching profile for username: ${username}`);
    const id = await noblox.getIdFromUsername(username);
    if (!id) {
      throw new Error(`User with username "${username}" does not exist.`);
    }
    let playerinfo = await noblox.getPlayerInfo(id);

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
      id: id
    };
  } catch (error) {
    console.log(`Error fetching profile for username "${username}":`, error.message);
    throw error; // Re-throw the error to handle it in the calling function if needed
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

async function isThereAPrimaryGroup(username){
    try {
        const userId = await noblox.getIdFromUsername(username)
        const response = await fetch(`https://groups.roblox.com/v1/users/${userId}/groups/primary/role`);
        const data = await response.json();
        if (data === null){
            let primaryboolean = false;
            console.log('No primary group');
            return { 
                role: false,
                primaryboolean
             };
        }

        let primaryboolean = data.group.name;
        return {
            role: data.role.name,
            primaryboolean
        }
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
        const currentUser = await noblox.setCookie(roblosecurity)
        const XCSRF = await noblox.getGeneralToken(roblosecurity)
        return { XCSRF }
    } catch (error) {
        console.log(error);
    }
}

async function currentUser(){
    try {
        const user = await noblox.getAuthenticatedUser()
        return {
            displayname: user.displayName,
            username: user.name,
            id: user.id
        }
    } catch (error) {
        console.log(error);
    }
}

async function session(){
    try {
        const currentUser = await noblox.setCookie(roblosecurity);
        const currentsession = await noblox.getSession(roblosecurity);

        return {
            currentsession: currentsession.toString()
        }
    } catch (error) {
        console.log(error);
    }
}

async function getHash(){
    try {
        const currentUser = await noblox.setCookie(roblosecurity);
        const hash = await noblox.getHash(roblosecurity);
        return {
            hash
        }
    } catch (error) {
        console.log(error);
    }
}

async function yearSales(){
    try {
        const currentUser = await noblox.setCookie(roblosecurity)
        let revenueSum = await noblox.getGroupRevenueSummary(groupid, "Year")
        return { revenueSum: revenueSum.itemSaleRobux }
    } catch (error) {
        console.log(error);
    }
}

async function groupLink(){
    try {
        const currentUser = await noblox.setCookie(roblosecurity)
        const { groupname, groupid } = await groupStats()
        let newgroupname = groupname.replaceAll(' ', '-');
        let grouplink = `https://www.roblox.com/communities/${groupid}/${newgroupname}#!/about`;
        return {
            grouplink
        }
    } catch (error) {
        console.log(error);
    }
}

async function groupPayout(username, amount) {
    try {
        const currentUser = await noblox.setCookie(roblosecurity);
        await noblox.groupPayout({ group: groupid, member: username, amount: amount });
        axios.post(`https://twostepverification.roblox.com/v1/users/7235402110/challenges/authenticator/verify`, {
            "challengeId": "string",
            "actionType": 0,
            "code": "string"
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        console.log(`Successfully paid ${amount} to ${username} in group ${groupid}`);
    } catch (error) {
        console.log(`Error during group payout for ${username}:`, error.message);
    }
}

module.exports = {
    groupPayout,
    groupLink,
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
    fetchCollectibles,
    currentUser,
    getHash,
    session,
    isThereAPrimaryGroup,
    yearSales,
    getIdFromUsername
};
