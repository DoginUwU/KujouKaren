const Discord = require('discord.js');
const Config = require('../config.json')
const DC = Config.DC;
const fs = require('fs');
let playerData = require('../storage/playerData.json');
let serverData = require('../storage/serverData.json');
let marry = require('../storage/marry.json');

const lg = require('../storage/language.json');

exports.run = (client, message, args, language) => {
 if(serverData[message.guild.id].eco == false){ return;}
 var idPlayer = message.author.id + message.guild.id;
 let Prefix = serverData[message.guild.id].prefix;
 var id_ = message.author.id ;
  
  if(args == ""){
     playerData[idPlayer].married = "none";
        fs.writeFile('./storage/playerData.json', JSON.stringify(playerData, null, 2), (err) => {
            if (err) console.log(err)
            else{
              const married = new Discord.RichEmbed()
                .setColor(DC)
                .setAuthor(client.user.username, client.user.displayAvatarURL)
                .setDescription(lg[language].married_divorce)
                .setFooter(`${lg[language].resquest_command} + ${message.author.tag}`, `${message.author.avatarURL}`)
              return message.channel.send(married)
            }
        })
  }else{
  
  try{
    if(playerData[idPlayer] && playerData[idPlayer].married == "none" && !marry[idPlayer]){
      let dUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
      let user = client.users.find(user => user.id == dUser.id);
      var idMarried = user.id + message.guild.id;
      
      if(user.id == null){
         const YDHP = new Discord.RichEmbed()
          .setColor('#ff0000')
          .setAuthor(client.user.username, client.user.displayAvatarURL)
          .setDescription(lg[language].error)
          .setFooter(lg[language].deleted_soon)
        return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
      }
      
      if(message.author.id == dUser.id){
        const YDHP = new Discord.RichEmbed()
          .setColor('#ff0000')
          .setAuthor(client.user.username, client.user.displayAvatarURL)
          .setDescription(lg[language].married_marry_yourself)
          .setFooter(lg[language].deleted_soon)
        return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
      }
      
      if(marry[idMarried]){
        const YDHP = new Discord.RichEmbed()
          .setColor('#ff0000')
          .setAuthor(client.user.username, client.user.displayAvatarURL)
          .setDescription(lg[language].married_not_marry_person)
          .setFooter(lg[language].deleted_soon)
        return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
      }
      
      if(user.id != null){
        //playerData[idPlayer].married = user.id;
        
        marry[idPlayer] = {
          "id_marry": idMarried,
          "accepted": true,
          "id_default": user.id
        }
        
        marry[idMarried] = {
          "id_marry": idPlayer,
          "accepted": false,
          "id_default": message.author.id
        }
        //.setDescription(`Married has been successfully changed to: \`${user.username}\``)
        fs.writeFile('./storage/marry.json', JSON.stringify(marry, null, 2), (err) => {
            if (err) console.log(err)
            else{
              const married = new Discord.RichEmbed()
                .setColor(DC)
                .setAuthor(client.user.username, client.user.displayAvatarURL)
                .setDescription(`${lg[language].married_send_evitation} \`${user.username}\`, ${lg[language].married_send_evitation2} \`${Prefix}marry\``)
                .setFooter(`${lg[language].resquest_command} + ${message.author.tag}`, `${message.author.avatarURL}`)
              return message.channel.send(married)
            }
        })
      }      
    }else if(playerData[idPlayer].married != "none"){
       const YDHP = new Discord.RichEmbed()
        .setColor('#ff0000')
        .setAuthor(client.user.username, client.user.displayAvatarURL)
        .setDescription(`${lg[language].married_already} \`${playerData[idPlayer].married}\``)
        .setFooter(lg[language].deleted_soon)
      return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
    }else{
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
    console.log(err);
    }
  }
}