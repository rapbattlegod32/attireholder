const { getIdFromUsername } = require('../../utils/functions.js');

module.exports = {
    name: "getid",
    async execute(message, args){
        const { userId } = await getIdFromUsername(args[0]);
        message.channel.send(userId);
    }
}