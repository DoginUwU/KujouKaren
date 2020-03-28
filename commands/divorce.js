const Discord = require('discord.js');
const Config = require('../config.json')
const DC = Config.DC;
const fs = require('fs');
let playerData = require('../storage/playerData.json');
let marry = require('../storage/marry.json');
const serverData = require('../storage/serverData.json');

const lg = require('../storage/language.json');

exports.run = (client, message, args, language) => {
 if(serverData[message.guild.id].eco == false){ message.channel.stopTyping(); return;}
  try{
 var idPlayer = message.author.id + message.guild.id; 
 var id_married = marry[idPlayer].id_marry;

  playerData[idPlayer].married = "none";
  playerData[id_married].married = "none";
  delete marry[idPlayer];
  delete marry[id_married];
        fs.writeFile('./storage/playerData.json', JSON.stringify(playerData, null, 2), (err) => {
            if (err) console.log(err)
            else{
              fs.writeFile('./storage/marry.json', JSON.stringify(marry, null, 2), (err) => {
                  if (err) console.log(err)
                  else{
                  }
              })
              const married = new Discord.RichEmbed()
                .setColor(DC)
                .setAuthor(client.user.username, client.user.displayAvatarURL)
                .setDescription(lg[language].divorce)
                .setFooter(`${lg[language].resquest_command} + ${message.author.tag}`, `${message.author.avatarURL}`)
              return message.channel.send(married)
            }
        })
    
  }catch(err){
     const SEO = new Discord.RichEmbed()
      .setColor('#ff0000')
      .setAuthor(client.user.username, client.user.displayAvatarURL)
      .setDescription(lg[language].error)
      .setFooter(lg[language].deleted_soon)
  
      message.channel.send(SEO).then(msg => {msg.delete(35000)});
  }
  
}