const osu = require('node-osu');
const Discord = require('discord.js');
const Config = require('../config.json')
const DC = Config.DC;
const Canvas = require("canvas");
const snekfetch = require("node-superfetch");

 var osuApi = new osu.Api('2732b8f7a0e840cb3b80538cec7f662ada6c62eb', {
    notFoundAsError: true, 
    completeScores: false 
})

const lg = require('../storage/language.json');

exports.run = (client, message, args, language) => {
  try{
      if(args != null){
        DrawOsu();
      }else{
        const YDHP = new Discord.RichEmbed()
            .setColor('#ff0000')
            .setAuthor(client.user.username, client.user.displayAvatarURL)
            .setDescription(lg[language].osu_user_not_found)
            .setFooter(lg[language].deleted_soon)

            message.channel.send(YDHP).then(msg => {msg.delete(35000)});
      }
  }catch(err){
    const YDHP = new Discord.RichEmbed()
      .setColor('#ff0000')
      .setAuthor(client.user.username, client.user.displayAvatarURL)
      .setDescription(lg[language].error)
      .setFooter(lg[language].deleted_soon)
  
      message.channel.send(YDHP).then(msg => {msg.delete(35000)});
  }
  
  async function DrawOsu(){
        osuApi.getUser({u: args.toString().replace(/,/g, " ")}).then(async function( user) {
        name = user.name;
        let imageBot = "https://www.mediafire.com/convkey/3c1e/ql7sgmj3ud2tdjmzg.jpg";
        let member = message.mentions.users.first() || message.author;
        const canvas = Canvas.createCanvas(1045, 587);
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = "#FFF";
        ctx.fillRect(0, 0, 1045, 587);
        
        const { body: a } = await snekfetch.get(imageBot);
        const background = await Canvas.loadImage(a);
        
        ctx.drawImage(background, 0, 0, 1045, 587);
        
        ctx.font = "30px Arial";
        ctx.fillText(user.name, 30, 130);
        ctx.font = "40px Arial";
        ctx.fillText(Math.floor(user.level), 195, 245);
        ctx.fillText(user.pp.rank, 760, 135);
        ctx.fillText(user.accuracyFormatted, 300, 330);
        ctx.font = "40px Arial";
        ctx.fillText(user.counts.A, 930, 500);
        ctx.fillText(user.counts.S, 720, 500);
        ctx.fillText(user.counts.SH, 505, 500);
        ctx.fillText(user.counts.SS, 285, 500);
        ctx.fillText(user.counts.SSH, 60, 500);
        ctx.font = "40px Arial";
        ctx.fillText('Played: ' + user.counts.plays + ' times', 40, 560);

        const attach = new Discord.Attachment(canvas.toBuffer(), 'osu.png');
         
        message.channel.send(attach);
      }).catch(err =>{ 
          const YDHP = new Discord.RichEmbed()
            .setColor('#ff0000')
            .setAuthor(client.user.username, client.user.displayAvatarURL)
            .setDescription(lg[language].osu_user_not_found)
            .setFooter(lg[language].deleted_soon)

            message.channel.send(YDHP).then(msg => {msg.delete(35000)});
        });
  }
}