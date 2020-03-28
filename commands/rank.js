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
var a = 0;
exports.run = (client, message, args, language) => {
  if(serverData[message.guild.id].eco == false){ return;}
  try{
   if(serverData[message.guild.id]){
      const id = [];
      var rank = [];
      var keys = Object.keys(playerData);
      for(var i = 0; i <= keys.length; i++){
        if(i < keys.length){
          if(playerData[keys[i]].server == message.guild.id){
            var level = playerData[keys[i]].level;
            rank.push(level + " / " + keys[i] + " / " + playerData[keys[i]].id + " / " + playerData[keys[i]].coins + " / " + playerData[keys[i]].xp);
            }
        }else{
          var array = rank.toString().split(",");
            //console.log(rank + "    ");
            var ranks_ = array.sort(function(a, b){return b-a});
            var text = "ERROR";
             var array = [];
             for(var x = 0; x < ranks_.length; x++){
               if(x < 10){
                 var test = ranks_[x].toString().split("/");
                 array.push({level: test[0], id_: test[1], id: test[2].toString().replace(" ", ""), coins: test[3], xp: test[4]});
               }
             }
             let index = 0;
           const Ping = new Discord.RichEmbed()
            .setColor(DC)
            .setAuthor(client.user.username + " - " + "Top 10", client.user.displayAvatarURL)
            .setThumbnail(client.user.displayAvatarURL)
            .addField("Rank: ", `${array.map(video2 => `**${++index} -** <@${video2.id.toString().replace(" ", "")}> Level: ${video2.level} Money: ${video2.coins} Xp: ${video2.xp}`).join('\n')}`, true)
            .setFooter(`${lg[language].resquest_command} ${message.author.tag}`, `${message.author.avatarURL}`)

            return message.channel.send(Ping);
        }
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