const Discord = require('discord.js');
const { discordaccount: { token, prefix }, robloxaccount: { robloseccookie, groupid } } = require('../../settings/secrets.json');
const { checkFunds, groupname } = require('../../functions/functions.js');

module.exports = {
  name: "funds",
  async execute(message, args) {
    try {
      //checks if user has sent additional args e.g 'year', 'month' etc
      //if user hasnt sent args, it will send default 'past 7 days'
      if (args[0] == null) {
        const {
          avaiblefunds,
          pendingfunds,
          premiumpayout,
          grouppayout
        } = await checkFunds();
        let totalfunds = avaiblefunds + pendingfunds;
        const embedrich = new Discord.MessageEmbed()
          .setTitle('Group Funds:')
          .setDescription(`**Overview:**\n───────────────────\n\`✅\` - Available group funds: **\`${avaiblefunds}\`**\n───────────────────\n\`🕒\` - Pending group funds: **\`${pendingfunds}\`**\n───────────────────\n\`💰\` - Total group funds: **\`${totalfunds}\`**\n───────────────────\n**Recent Transactions:**\n\*\`past week\`\*\n───────────────────\n\`💸\` - Group Revenue Payouts: **\`${grouppayout}\`**\n───────────────────\n\`🌟\` - Group Premium Payouts: **\`${premiumpayout}\`**`)
          .setTimestamp()
          .setURL(`https://www.roblox.com/groups/configure?id=${groupid}#!/revenue`)
          .setColor('GREEN')
          .setFooter(groupname)
        message.channel.send(embedrich)

        console.log(`[command] Succesfully executed 'funds'`);
        return;
      }

      //capitalize the first letter of the arguements user has sent
      //important to make the api requests work
      function capitalizeFirstarg(string) {
        let newarg = string.charAt(0).toUpperCase() + string.slice(1);
         return {
          capitalizedarguement: newarg
         }
      }

      let result = capitalizeFirstarg(args[0]);
  
      //different timeframes
      let options = ['Day', 'Week', 'Month', 'Year'];

      //executes the fund command with the specified timeframe from the user
      if (options.includes(result.capitalizedarguement)){
        const {
          avaiblefunds,
          pendingfunds,
          premiumpayout,
          grouppayout
        } = await checkFunds(result.capitalizedarguement);
        let totalfunds = avaiblefunds + pendingfunds;
        const embedrich = new Discord.MessageEmbed()
          .setTitle('Group Funds:')
          .setDescription(`**Overview:**\n───────────────────\n\`✅\` - Available group funds: **\`${avaiblefunds}\`**\n───────────────────\n\`🕒\` - Pending group funds: **\`${pendingfunds}\`**\n───────────────────\n\`💰\` - Total group funds: **\`${totalfunds}\`**\n───────────────────\n**Recent Transactions:**\n\*\`past ${result.capitalizedarguement}\`\*\n───────────────────\n\`💸\` - Group Revenue Payouts: **\`${grouppayout}\`**\n───────────────────\n\`🌟\` - Group Premium Payouts: **\`${premiumpayout}\`**`)
          .setTimestamp()
          .setURL(`https://www.roblox.com/groups/configure?id=${groupid}#!/revenue`)
          .setColor('GREEN')
          .setFooter(groupname)
        message.channel.send(embedrich)

        console.log(`[command] Succesfully executed 'funds'`);
        return;
      }
      //if user has passed args but is not a timeframe bot will not send any api requests 
      message.channel.send('You have not picked a right timeFrame\n{ \'Day\', \'Week\', \'Month\', \'Year\' }');

    } catch (error) {
      
      console.log(error);

    }
  }
}