const Discord = require('discord.js');
const Config = require('../config.json')
const DC = Config.DC;
const fs = require('fs');
let playerData = require('../storage/playerData.json');
let serverData = require('../storage/serverData.json');
let marry = require('../storage/marry.json');

const lg = require('../storage/language.json');

exports.run = (client, message, args, language) => {
  if(serverData[message.guild.id].eco == false){ message.channel.stopTyping(); return;}
 var idPlayer = message.author.id + message.guild.id;
 let Prefix = serverData[message.guild.id].prefix;
 var id_ = message.author.id ;
 
  if(playerData[idPlayer] && playerData[idPlayer].married == "none" && marry[idPlayer]){
    if(marry[idPlayer].accepted == true){
       const YDHP = new Discord.RichEmbed()
        .setColor('#ff0000')
        .setAuthor(client.user.username, client.user.displayAvatarURL)
        .setDescription(lg[language].marry_wait_person)
        .setFooter(lg[language].deleted_soon)

      return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
    }
    var id_marry = marry[idPlayer].id_default;
    var id_marry_complete = marry[idPlayer].id_marry;
    
    let user = client.users.find(user => user.id == id_marry);
    const YDHP = new Discord.RichEmbed()
      .setColor('#ff0000')
      .setAuthor(client.user.username, client.user.displayAvatarURL)
      .setDescription(`${lg[language].marry_do_you_want} \`${user.username}\`?`)
      .setFooter(lg[language].marry_say)
  
      message.channel.send(YDHP);
    
      Marry(user, id_marry, idPlayer);
    
  }else if(!marry[idPlayer] && playerData[idPlayer].married == "none"){
    const YDHP = new Discord.RichEmbed()
      .setColor('#ff0000')
      .setAuthor(client.user.username, client.user.displayAvatarURL)
      .setDescription(lg[language].marry_nobody_wants)
      .setFooter(lg[language].deleted_soon)
  
      message.channel.send(YDHP).then(msg => {msg.delete(35000)});
  }else if(playerData[idPlayer].married != "none"){
    const YDHP = new Discord.RichEmbed()
      .setColor('#ff0000')
      .setAuthor(client.user.username, client.user.displayAvatarURL)
      .setDescription(lg[language].marry_already)
      .setFooter(lg[language].deleted_soon)
  
      message.channel.send(YDHP).then(msg => {msg.delete(35000)});
  }else{
    const YDHP = new Discord.RichEmbed()
      .setColor('#ff0000')
      .setAuthor(client.user.username, client.user.displayAvatarURL)
      .setDescription(lg[language].error)
      .setFooter(lg[language].deleted_soon)
  
      message.channel.send(YDHP).then(msg => {msg.delete(35000)});
  }
  
  async function Marry(user){
       try {
          message.channel.awaitMessages(response => response.content, {
            max: 1,
            time: 30000,
            errors: ['time'],
          }).then((collected) => {
            console.log(collected.first().content);
         if(collected.first().content == lg[language].accept && id_ == collected.first().author.id){ 
            marry[idPlayer].accepted = true;
            marry[id_marry_complete].accepted = true;
            playerData[idPlayer].married = id_marry;
            playerData[id_marry_complete].married = message.author.id;
           
            fs.writeFile('./storage/marry.json', JSON.stringify(marry, null, 2), (err) => {
                        if (err) console.log(err)
                        else{
                          fs.writeFile('./storage/playerData.json', JSON.stringify(playerData, null, 2), (err) => {
                              if (err) console.log(err)
                              else{
                              }
                          })
                          const accept = new Discord.RichEmbed()
                            .setColor(DC)
                            .setAuthor(client.user.username, client.user.displayAvatarURL)
                            .setDescription(`${lg[language].marry_congratulations} \`${user.username}\``)
                            .setFooter(`${lg[language].resquest_command} + ${message.author.tag}`, `${message.author.avatarURL}`)
                          return message.channel.send(accept)
                        }
                  })
         }else if(collected.first().content == lg[language].decline && id_ == collected.first().author.id){ 
            delete marry[idPlayer];
            delete marry[id_marry_complete];
            fs.writeFile('./storage/marry.json', JSON.stringify(marry, null, 2), (err) => {
                        if (err) console.log(err)
                        else{
                          const description = new Discord.RichEmbed()
                            .setColor(DC)
                            .setAuthor(client.user.username, client.user.displayAvatarURL)
                            .setDescription(`${lg[language].marry_declined} \`${user.username}\``)
                            .setFooter(`${lg[language].resquest_command} + ${message.author.tag}`, `${message.author.avatarURL}`)
                          return message.channel.send(description)
                        }
                  })
         }   
            
    }).catch((err) => {
             console.log(err);
           const YDHP = new Discord.RichEmbed()
            .setColor('#ff0000')
            .setAuthor(client.user.username, client.user.displayAvatarURL)
            .setDescription(lg[language].not_answered)
            .setFooter(lg[language].deleted_soon)
          return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
          })
    }catch(err){
      console.log(err);
       const YDHP = new Discord.RichEmbed()
            .setColor('#ff0000')
            .setAuthor(client.user.username, client.user.displayAvatarURL)
            .setDescription(lg[language].not_answered)
            .setFooter(lg[language].deleted_soon)
          return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
    }
  }
}