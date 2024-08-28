const Discord = require("discord.js");
const Canvas = require("canvas");

module.exports = {
  name: "canvas",
  async execute(message, args) {
    const canvas = Canvas.createCanvas(6480, 720);
    const context = canvas.getContext("2d");

    const avatar = await Canvas.loadImage("C:\\Users\\Alexu\\Desktop\\attireholder\\media\\noFilter.png");

    context.drawImage(avatar, 25, 25 , 720, 720);

	context.beginPath();
	context.arc(125, 125, 100, 0, Math.PI * 2, true);
	context.closePath();
	context.clip();
    context.strokeStyle = "#74037b";
    context.strokeRect(0, 0, canvas.width, canvas.height);

    const attatchment = new Discord.MessageAttachment(canvas.toBuffer(),"friendimagelist.png");

    message.channel.send(attatchment);
  },
};
