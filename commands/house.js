const metarParser = require('aewx-metar-parser');
const Discord = require('discord.js')
const Config = require('../config.json')
const DC = Config.DC;
const Canvas = require("canvas");
const snekfetch = require("node-superfetch");
const fs = require('fs');
const serverData = require('../storage/serverData.json');
var playerData = require('../storage/playerData.json');
const lg = require('../storage/language.json');


exports.run = (client, message, args, language) => {
  if(serverData[message.guild.id].eco == false){ message.channel.stopTyping(); return;}
  let member = message.mentions.users.first() || message.author;
  var idPlayer2 = member.id + message.guild.id;
  let Prefix = serverData[message.guild.id].prefix;
  
  const prc = {
            "1": "9000",
            "2": "15000",
            "3": lg[language].max,
           }
  
  if(args == "upgrade"){
       BuyHouse(prc[playerData[message.author.id + message.guild.id].house_level]);
    }else{
  if(playerData[idPlayer2]){
    var house_img = "";
    var desc_house = "";
    if(playerData[idPlayer2].house_level == 1){
       house_img = "https://www.mediafire.com/convkey/d96c/yn9azd0u4wpmklbzg.jpg";
       desc_house = lg[language].desc_house_1;
    }
    if(playerData[idPlayer2].house_level == 2){
       house_img = "https://www.mediafire.com/convkey/8501/y542bvc6z3a4cnfzg.jpg";
       desc_house = lg[language].desc_house_2;
    }
    
    
    const price = prc[playerData[idPlayer2].house_level]
    
      let House_ = new Discord.RichEmbed()
        .setColor(DC)
        .setAuthor(member.username + " - " + lg[language].house, member.avatarURL)
        .addField(lg[language].description + ": 📜", `${desc_house} use \`${Prefix}house upgrade\` ${lg[language].to_improve}`)
        .addField(lg[language].nxt_house, `$${price}`)
        .setImage(house_img)
        .setFooter(`${lg[language].house} - Level: ${playerData[idPlayer2].house_level}`, `${house_img}`)
      
        return message.channel.send(House_);
      }
    }
  
  async function BuyHouse(coin){
     if(playerData[message.author.id + message.guild.id].coins >= coin){
    playerData[message.author.id + message.guild.id].house_level++;
          playerData[message.author.id + message.guild.id].coins = playerData[message.author.id + message.guild.id].coins - coin;
          fs.writeFile('./storage/playerData.json', JSON.stringify(playerData, null, 2), (err) => {
              if (err) console.log(err)
              else{}
            })
          fs.writeFile('./storage/house.json', JSON.stringify(house, null, 2), (err) => {
            if (err) console.log(err)
            else{
               const upgraded = new Discord.RichEmbed()
                .setColor(DC)
                .setAuthor(client.user.username, client.user.displayAvatarURL)
                .setDescription(`Congratulations, you moved to a better house :D be happy in your house \`Level: ${playerData[message.author.id + message.guild.id].house_level}\``)
                .setFooter(`${lg[language].resquest_command} ${message.author.tag}`, `${message.author.avatarURL}`)
              return message.channel.send(upgraded)
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
  }
}