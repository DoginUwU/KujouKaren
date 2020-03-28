const Discord = require('discord.js');
const Config = require('../config.json')
const DC = Config.DC;
const fs = require('fs');
const lg = require('../storage/language.json');
let serverData = require('../storage/serverData.json');

exports.run = (client, message, args, language) => {
  let Mention = message.member;
  if(Mention.hasPermission('ADMINISTRATOR'))
    {
       const etep1 = new Discord.RichEmbed()
          .setColor(DC)
          .setImage('https://www.mediafire.com/convkey/7238/31j3f95fo60du19zg.jpg')
          .setDescription(lg[language].welcome_first_text)
  
      message.channel.send(etep1).then(msg => {
      etep1_(msg, etep1);
       async function etep1_(msg, etep1){
          message.channel.awaitMessages(response => message.content, {
                max: 1,
                time: 30000,
                errors: ['time'],
              })
              .then((collected) => {
                  const text = collected.first().content;
                   serverData[message.guild.id].welcome1 = text;
                   fs.writeFile('./storage/serverData.json', JSON.stringify(serverData, null, 2), (err) => {
                    if (err) 
                    {
                      const YDHP = new Discord.RichEmbed()
                        .setColor('#ff0000')
                        .setAuthor(client.user.username, client.user.displayAvatarURL)
                        .setDescription(lg[language].error)
                        .setFooter(lg[language].deleted_soon)
                      return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
                    }
                    else{
                      msg.edit(etep1 = new Discord.RichEmbed()
                        .setColor(DC)
                        .setImage('https://www.mediafire.com/convkey/8162/h5fs3inu6w6opmmzg.jpg')
                        .setDescription(lg[language].welcome_etep1_1 + `${serverData[message.guild.id].welcome1}` + lg[language].welcome_etep1_2)

                       ).then(msg => {
                          etep2(msg, etep1);
                       });
                    }
                  })
              })
                .catch(function(){
                   const YDHP = new Discord.RichEmbed()
                  .setColor('#ff0000')
                  .setAuthor(client.user.username, client.user.displayAvatarURL)
                  .setDescription(lg[language].not_answered)
                  .setFooter(lg[language].deleted_soon)

                return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
            });
       }
        
        async function etep2(msg, etep1){
          message.channel.awaitMessages(response => message.content, {
                max: 1,
                time: 30000,
                errors: ['time'],
              })
              .then((collected) => {
                  const text = collected.first().content;
                   serverData[message.guild.id].welcome2 = text;
                   fs.writeFile('./storage/serverData.json', JSON.stringify(serverData, null, 2), (err) => {
                    if (err) 
                    {
                      const YDHP = new Discord.RichEmbed()
                        .setColor('#ff0000')
                        .setAuthor(client.user.username, client.user.displayAvatarURL)
                        .setDescription(lg[language].error)
                        .setFooter(lg[language].deleted_soon)
                      return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
                    }
                    else{
                       msg.edit(msg = new Discord.RichEmbed()
                        .setColor(DC)
                        .setImage('https://www.mediafire.com/convkey/8162/h5fs3inu6w6opmmzg.jpg')
                        .setDescription(lg[language].welcome_etep1_1 + `${serverData[message.guild.id].welcome2}` + lg[language].welcome_etep2_2)

                       ).then(msg => {
                          etep3(msg, etep1);
                       });
                    }
                  })
              })
                .catch(function(){
                   const YDHP = new Discord.RichEmbed()
                  .setColor('#ff0000')
                  .setAuthor(client.user.username, client.user.displayAvatarURL)
                  .setDescription(lg[language].not_answered)
                  .setFooter(lg[language].deleted_soon)

                return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
            });
        }
        
        async function etep3(msg, etep1){
          message.channel.awaitMessages(response => message.content, {
                max: 1,
                time: 30000,
                errors: ['time'],
              })
              .then((collected) => {
                  const text = collected.first().content;
                  const joinChannel = message.guild.channels.find(x => x.name === text);
                  if(joinChannel == null || !joinChannel){
                    const YDHP = new Discord.RichEmbed()
                        .setColor('#ff0000')
                        .setAuthor(client.user.username, client.user.displayAvatarURL)
                        .setDescription(lg[language].error)
                        .setFooter(lg[language].deleted_soon)
                      return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
                  }
                   serverData[message.guild.id].welcome = text;
                   fs.writeFile('./storage/serverData.json', JSON.stringify(serverData, null, 2), (err) => {
                    if (err) 
                    {
                      const YDHP = new Discord.RichEmbed()
                        .setColor('#ff0000')
                        .setAuthor(client.user.username, client.user.displayAvatarURL)
                        .setDescription(lg[language].error)
                        .setFooter(lg[language].deleted_soon)
                      return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
                    }
                    else{
                       msg.edit(etep1 = new Discord.RichEmbed()
                        .setColor(DC)
                        .setImage('https://www.mediafire.com/convkey/8162/h5fs3inu6w6opmmzg.jpg')
                        .setDescription(lg[language].welcome_etep3_1 + `${serverData[message.guild.id].welcome}` + lg[language].welcome_etep3_2)

                       ).then(msg => {
                       });
                    }
                  })
              })
                .catch(function(){
                   const YDHP = new Discord.RichEmbed()
                  .setColor('#ff0000')
                  .setAuthor(client.user.username, client.user.displayAvatarURL)
                  .setDescription(lg[language].not_answered)
                  .setFooter(lg[language].deleted_soon)

                return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
            });
        }
      
      });
    }
  else
  {
    message.channel.send(lg[language].not_allowed + "ADMINISTRATOR" + lg[language].not_allowed_2)
  }
}