const Discord = require('discord.js');
const Config = require('../config.json');
const DC = Config.DC;
var file = require('file-system');
var backgrounds = require('../storage/backgrounds.json');
const Canvas = require("canvas");
const snekfetch = require("node-superfetch");
const serverData = require('../storage/serverData.json');
var playerData = require('../storage/playerData.json');

const lg = require('../storage/language.json');

exports.run = (client, message, args, language) => {
  if(serverData[message.guild.id].eco == false){return;}
  try{
    console.log("sla");
    let member = message.mentions.users.first() || message.author;
    var idPlayer2 = member.id + message.guild.id;

    if(playerData[idPlayer2]){
      console.log("aqui");
      DrawProfile(); 
    }else{
      const YDHP = new Discord.RichEmbed()
        .setColor('#ff0000')
        .setAuthor(client.user.username, client.user.displayAvatarURL)
        .setDescription(lg[language].error)
        .setFooter(lg[language].deleted_soon)
        return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
    }

    async function DrawProfile(){
          let member = message.mentions.users.first() || message.author;
          var idPlayer2 = member.id + message.guild.id;
          const canvas = Canvas.createCanvas(1000, 650);
          const ctx = canvas.getContext('2d');

          Canvas.registerFont("mosk.ttf", { family: "mosk" })
          Canvas.registerFont("seguiemj.ttf", { family: "segoeuiemoji" })
          Canvas.registerFont("komorebi-gothic.ttf", { family: "komorebi" })

          var panelIMG = "https://cdn.discordapp.com/attachments/540308761458245642/569293434960216067/Profile_1.png";
          var nsfw = false;

          if(playerData[idPlayer2].background){
            var backgroundIMG = backgrounds[playerData[idPlayer2].background].url;
            if(backgrounds[playerData[idPlayer2].background].nsfw == true){
               nsfw = true;    
            }
          }else{
            var backgroundIMG = backgrounds["Default"].url;
          }

          if(nsfw && serverData[message.guild.id].nsfw == false){
             const YDHP = new Discord.RichEmbed()
              .setColor('#ff0000')
              .setAuthor(client.user.username, client.user.displayAvatarURL)
              .setDescription(lg[language].hentai_active_nsfw)
              .setFooter(lg[language].deleted_soon)
            return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
          }else{

          var coins_count = playerData[idPlayer2].coins;

          //Images
          const { body: a } = await snekfetch.get(panelIMG);
          const panel = await Canvas.loadImage(a);

          const { body: c } = await snekfetch.get(backgroundIMG);
          const background = await Canvas.loadImage(c);

          const { body: d } = await snekfetch.get(member.avatarURL);
          const avatar = await Canvas.loadImage(d);
          //Images

          ctx.drawImage(background, 0, 0, 1000, 650);
          ctx.drawImage(panel, 0, 0, 1000, 650);
          ctx.drawImage(avatar, 22, 22, 125, 120);



          ctx.font = "25px Consolas, segoeuiemoji, komorebi";
          ctx.fillStyle = "#8c8c8c";
          ctx.fillText(`${member.username}`, 265, 60);
          ctx.font = "30px Consolas";
          ctx.fillText(`${playerData[idPlayer2].coins}`, 125, 210);
          ctx.fillText(`${playerData[idPlayer2].level}`, 105, 253);
          ctx.fillText(`${playerData[idPlayer2].gender}`, 135, 295);
          ctx.font = "19px Consolas";
          ctx.fillText(`${playerData[idPlayer2].birthday}`, 144, 335);
          ctx.fillStyle = "#000";

          //Description
          var numPerLine = 36;
          var descriptTxT = playerData[idPlayer2].description.toString();
          var textLenght = descriptTxT.length;
          var newText = "";
          for (var i = 1; i <= textLenght; i++){
            newText = newText + descriptTxT.charAt(i - 1); 
              if (i % numPerLine == 0 && i < textLenght){
                    newText = newText + "\n";
              }
          }
          ctx.fillStyle = "#8c8c8c";
          ctx.fillText(`${newText}`, 25, 462);

          //XP cheia = 165
          let curxp = playerData[idPlayer2].xp;
          let nxtlvl = playerData[idPlayer2].level * 300;
          var width = 165 / nxtlvl * curxp;
          ctx.fillStyle = "#cccccc";
          ctx.fillRect(371.5, 193.5, width, 19);

          if(playerData[idPlayer2].married != "none"){
             let user = client.users.find(user => user.id == playerData[idPlayer2].married);
             const { body: b } = await snekfetch.get(user.avatarURL);
             const avatar_married = await Canvas.loadImage(b);
             ctx.drawImage(avatar_married, 665, 233, 145, 140);
             ctx.fillStyle = "#8c8c8c";
             ctx.fillText(`${user.username}`, 640, 407);
          }

          const attach = new Discord.Attachment(canvas.toBuffer(), 'perfil.png');
          message.channel.send(attach);
        }
    }
  }catch(err){
    const YDHP = new Discord.RichEmbed()
            .setColor('#ff0000')
            .setAuthor(client.user.username, client.user.displayAvatarURL)
            .setDescription(lg[language].error)
            .setFooter(lg[language].deleted_soon)
          return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
  }
}