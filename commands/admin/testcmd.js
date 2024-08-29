const { isThereAPrimaryGroup } = require('../../functions/functions.js');

module.exports = {
    name: "testcmd",
    async execute(message, args){
        let x = "chadgod32";
        const { thumbheadid, thumbimageurl } = await arrayPlayerThumbnails(x);
        message.channel.send(thumbimageurl);
    }
}