const Discord = require('discord.js');
const Config = require('../config.json')
const DC = Config.DC;
const fs = require('fs');
var file = require('file-system');
const serverData = JSON.parse(file.readFileSync("./storage/serverData.json", "utf8"));
const lg = require('../storage/language.json');
const Canvas = require("canvas");
const snekfetch = require("node-superfetch");

exports.run = (client, message, args, language, permission, dt) => {
        license(message);
}

async function license(message){
        let imageBot = "https://cdn.discordapp.com/attachments/540308761458245642/556499999681150993/licenca.png";
        let member = message.mentions.users.first() || message.author;
        const canvas = Canvas.createCanvas(500, 350);
        const ctx = canvas.getContext('2d');
        
       
        
        const { body: a } = await snekfetch.get(imageBot);
        const background = await Canvas.loadImage(a);
        
        ctx.drawImage(background, 0, 0, 500, 350);
    
        const { body: b } = await snekfetch.get(member.avatarURL);
        const avatar = await Canvas.loadImage(b);
        
        ctx.drawImage(avatar, 340, 55, 130, 200);
        
        ctx.fillStyle = "#000";
        ctx.font = "30px Arial";
        ctx.fillText(member.username, 30, 105);

        const attach = new Discord.Attachment(canvas.toBuffer(), 'perfil.png');
         
        message.channel.send(attach);
}