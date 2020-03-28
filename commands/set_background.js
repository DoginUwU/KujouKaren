const Discord = require('discord.js');
const Config = require('../config.json');
const DC = Config.DC;
let playerData = require('../storage/playerData.json');
var file = require('file-system');
var background = JSON.parse(file.readFileSync("./storage/background.json", "utf8"));
var backgrounds = JSON.parse(file.readFileSync("./storage/backgrounds.json", "utf8"));
const Canvas = require("canvas");
const snekfetch = require("node-superfetch");
const fs = require('fs');
const serverData = require('../storage/serverData.json');

const lg = require('../storage/language.json');

exports.run = (client, message, args, language) => {
  if(serverData[message.guild.id].eco == false){ return;}
  var idPlayer = message.author.id + message.guild.id;
  if(args != ""){
  try{
    if(playerData[idPlayer] && background[idPlayer]){
      var background_text = args.toString().replace(/,/g, " ");
      var keys = Object.keys(background[idPlayer]);
      for(var i = 0; i <= Object.keys(background[idPlayer]).length; i++){
         if(i == Object.keys(background[idPlayer]).length){
            const YDHP = new Discord.RichEmbed()
            .setColor('#ff0000')
            .setAuthor(client.user.username, client.user.displayAvatarURL)
            .setDescription(lg[language].background_dont_have)
            .setFooter(lg[language].deleted_soon)
          return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
          break;
        }
        
        if(keys[i] == args.toString().replace(/,/g, " ")){
           Set_Background(keys[i]);
            break;
        }
      }
     
    }else{
      const YDHP = new Discord.RichEmbed()
      .setColor('#ff0000')
      .setAuthor(client.user.username, client.user.displayAvatarURL)
      .setDescription(lg[language].background_dont_have)
      .setFooter(lg[language].deleted_soon)
    return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
    }
  }catch(err){
    console.log(err);
    const YDHP = new Discord.RichEmbed()
      .setColor('#ff0000')
      .setAuthor(client.user.username, client.user.displayAvatarURL)
      .setDescription(lg[language].error)
      .setFooter(lg[language].deleted_soon)
    return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
  }
  
  
  async function Set_Background(text){
         playerData[idPlayer].background = text;
         fs.writeFile('./storage/playerData.json', JSON.stringify(playerData, null, 2), (err) => {
            if (err) console.log(err)
            else{
              const birthday = new Discord.RichEmbed()
                .setColor(DC)
                .setAuthor(client.user.username, client.user.displayAvatarURL)
                .setDescription(`${lg[language].background_successfully_changed} \`${playerData[idPlayer].background}\``)
                .setFooter(`${lg[language].resquest_command} + ${message.author.tag}`, `${message.author.avatarURL}`)
              return message.channel.send(birthday)
            }
        })
      }
  }else{
   console.log(idPlayer);
   var backgrounds_ = "";
    var keys = Object.keys(background[idPlayer]);
      for(var i = 0; i < Object.keys(background[idPlayer]).length; i++){
        var i2 = i + 1;
        backgrounds_ += " **"+keys[i]+"** \n";
      }

      const background_embed = new Discord.RichEmbed()
        .setColor(DC)
        .setAuthor(client.user.username, client.user.displayAvatarURL)
        .setDescription(`${backgrounds_}`)
        .setFooter(lg[language].background_your)
      return message.channel.send(background_embed)
  }
}