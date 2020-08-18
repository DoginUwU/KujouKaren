const Discord = require('discord.js');
const Config = require('../config.json')
const DC = Config.DC;
const fs = require('fs');
const lg = require('../storage/language.json');
let serverData = require('../storage/serverData.json');

exports.run = (client, message, args, language, dt) => {
  let Mention = message.member;
  if(Mention.hasPermission('ADMINISTRATOR'))
    {
       const etep1 = new Discord.RichEmbed()
          .setColor(DC)
          .setDescription(lg[language].track_start)
  
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
                  const joinChannel = message.guild.channels.find(x => x.name === text);
                  if(joinChannel == null || !joinChannel){
                    const YDHP = new Discord.RichEmbed()
                        .setColor('#ff0000')
                        .setAuthor(client.user.username, client.user.displayAvatarURL)
                        .setDescription(lg[language].track_start1)
                      serverData[message.guild.id].track = "";
                      fs.writeFile('./storage/serverData.json', JSON.stringify(serverData, null, 2), (err) => {})
                      return message.channel.send(YDHP);
                    
                  }
                   serverData[message.guild.id].track = text;
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
                        .setDescription(lg[language].track_1 + `${serverData[message.guild.id].track}` )

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
    let Permission = new Discord.RichEmbed()
    .setColor("#ff0000")
    .setDescription(lg[language].dt_message)     
    return message.channel.send(Permission);
  }
}