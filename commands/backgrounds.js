const Discord = require('discord.js');
const Config = require('../config.json');
const DC = Config.DC;
let playerData = require('../storage/playerData.json');
let serverData = require('../storage/serverData.json');
var file = require('file-system');
var background = JSON.parse(file.readFileSync("./storage/background.json", "utf8"));
var backgrounds = JSON.parse(file.readFileSync("./storage/backgrounds.json", "utf8"));
const Canvas = require("canvas");
const snekfetch = require("node-superfetch");
const fs = require('fs');
const lg = require('../storage/language.json');
console.log("aqui");

exports.run = (client, message, args, language) => {
  if(serverData[message.guild.id].eco == false){ return;}
  var idPlayer = message.author.id + message.guild.id;
   var backgrounds_ = "";
    var keys = Object.keys(backgrounds);
      for(var i = 0; i < Object.keys(backgrounds).length; i++){
        var i2 = i + 1;
        var keys2 = Object.keys(background[idPlayer]);
        for(var v = 0; v <= Object.keys(background[idPlayer]).length; v++){
          if(keys2[v] == keys[i]){
            backgrounds_ += " "+i2+" : " + keys[i] + " - $" + backgrounds[keys[i]].price + " **" + `${lg[language].purchased}` +"** \n";
            break;
          }else if(v == Object.keys(background[idPlayer]).length){
          backgrounds_ += " "+i2+" : " + keys[i] + " - $" + backgrounds[keys[i]].price + " \n";
          }
        }
      }
      buyBackground();

      const background_embed = new Discord.RichEmbed()
        .setColor(DC)
        .setAuthor(client.user.username, client.user.displayAvatarURL)
        .setDescription(`${backgrounds_}`)
        .setFooter(lg[language].background_enter_id)
      return message.channel.send(background_embed)
  
    async function buyBackground(){
      try {
         var response = await message.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
          maxMatches: 1,
          time: 10000,
          errors: ['time']
        });
      }catch(err){
        const YDHP = new Discord.RichEmbed()
            .setColor('#ff0000')
            .setAuthor(client.user.username, client.user.displayAvatarURL)
            .setDescription(lg[language].not_answered)
            .setFooter(lg[language].deleted_soon)
          return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
      }
      
      const backgroundIndex_tm = parseInt(response.first().content);
      const backgroundIndex = backgroundIndex_tm - 1;
      
      if(backgrounds[keys[backgroundIndex]].nsfw && !serverData[message.guild.id].nsfw){
        const YDHP = new Discord.RichEmbed()
          .setColor('#ff0000')
          .setAuthor(client.user.username, client.user.displayAvatarURL)
          .setDescription(lg[language].background_nsfw)
          .setFooter(lg[language].deleted_soon)
          return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
      }else{
      try{
        
      const background_embed = new Discord.RichEmbed()
        .setColor(DC)
        .setAuthor(keys[backgroundIndex], client.user.displayAvatarURL)
        .setDescription(lg[language].background_buy_)
        .setImage(`${backgrounds[keys[backgroundIndex]].url}`)
        .setFooter(`${lg[language].resquest_command} ${message.author.tag}`, `${message.author.avatarURL}`)
      message.channel.send(background_embed);
        
        try {
          message.channel.awaitMessages(response => response.content != '', {
            max: 1,
            time: 30000,
            errors: ['time'],
          }).then((collected) => {
         if(collected.first().content == `${lg[language].yes}`){ 
          if(playerData[idPlayer].coins >= backgrounds[keys[backgroundIndex]].price){
            var name_bg = keys[backgroundIndex];
            background[idPlayer][name_bg] = true  ;
            playerData[idPlayer].coins -= backgrounds[keys[backgroundIndex]].price;
            fs.writeFile('./storage/playerData.json', JSON.stringify(playerData, null, 2), (err) => {
              if (err) console.log(err)
              else{}
            })
            
            fs.writeFile('./storage/background.json', JSON.stringify(background, null, 2), (err) => {
              if (err) console.log(err)
              else{
                const description = new Discord.RichEmbed()
                  .setColor(DC)
                  .setAuthor(client.user.username, client.user.displayAvatarURL)
                  .setDescription(lg[language].background_successfully)
                  .setFooter(`${lg[language].resquest_command} ${message.author.tag}`, `${message.author.avatarURL}`)
                return message.channel.send(description)
              }
            })
          }else{  
            const YDHP = new Discord.RichEmbed()
                .setColor('#ff0000')
                .setAuthor(client.user.username, client.user.displayAvatarURL)
                .setDescription(lg[language].no_money)
                .setFooter(lg[language].deleted_soon)
              return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
          }
          }else {
            const YDHP = new Discord.RichEmbed()
                .setColor('#ff0000')
                .setAuthor(client.user.username, client.user.displayAvatarURL)
                .setDescription(lg[language].background_canceled)
                .setFooter(lg[language].deleted_soon)
              return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
          }  
         }).catch(() => {
        const YDHP = new Discord.RichEmbed()
            .setColor('#ff0000')
            .setAuthor(client.user.username, client.user.displayAvatarURL)
            .setDescription(lg[language].not_answered)
            .setFooter(lg[language].deleted_soon)
          return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
        });
      
      }catch(err){
         const YDHP = new Discord.RichEmbed()
          .setColor('#ff0000')
          .setAuthor(client.user.username, client.user.displayAvatarURL)
          .setDescription(lg[language].error)
          .setFooter(lg[language].deleted_soon)
        return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
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
  }
}