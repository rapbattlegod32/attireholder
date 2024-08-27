const { inventoryCheck } = require('../../functions/functions.js');

module.exports = {
    name: "testcmd",
    async execute(message, args){
        if (!args[0]){
            message.channel.send('Please give args');
            return;
        }
        inventoryCheck(args[0])
    }
}