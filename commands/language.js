const Discord = require('discord.js');
const Config = require('../config.json')
const DC = Config.DC;
const fs = require('fs');
var file = require('file-system');
const serverData = JSON.parse(file.readFileSync("./storage/serverData.json", "utf8"));
const lg = require('../storage/language.json');

exports.run = (client, message, args, language, permission, dt) => {
  let Mention = message.member;
  if(message.member.hasPermission('MANAGE_CHANNELS') || permission)
    {
      try{
        if(serverData[message.guild.id] && args != ""){
           var keys = Object.keys(lg);
          for(var i = 0; i <= keys.length; i++){
             if(i == keys.length){
               const YDHP = new Discord.RichEmbed()
                .setColor('#ff0000')
                .setAuthor(client.user.username, client.user.displayAvatarURL)
                .setDescription(lg[language].error)
                .setFooter(lg[language].deleted_soon)

              return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
             }else if(keys[i] == args){
                serverData[message.guild.id].language = args;
                fs.writeFile('./storage/serverData.json', JSON.stringify(serverData, null, 2), (err) => {
                  if (err) console.log(err)
                  else{
                    const description = new Discord.RichEmbed()
                      .setColor(DC)
                      .setAuthor(client.user.username, client.user.displayAvatarURL)
                      .setDescription(`${lg[args].language_changed} \`${serverData[message.guild.id].language}\``)
                      .setFooter(`${lg[language].resquest_command} ${message.author.tag}`, `${message.author.avatarURL}`)
                    return message.channel.send(description)
                }
              })
               break;
             }
          }
        }else{
            var language_list = "";
            var keys = Object.keys(lg);
            for(var i = 0; i < keys.length; i++){
              language_list += keys[i] + "\n";
            }
           const Language = new Discord.RichEmbed()
                .setColor(DC)
                .setAuthor(client.user.username, client.user.displayAvatarURL)
                .addField(lg[language].language_list+":", language_list)
                .setFooter(`${lg[language].resquest_command} ${message.author.tag}`, `${message.author.avatarURL}`)

              return message.channel.send(Language);
        }
      }catch(err){
        const YDHP = new Discord.RichEmbed()
          .setColor('#ff0000')
          .setAuthor(client.user.username, client.user.displayAvatarURL)
          .setDescription(lg[language].error)
          .setFooter(lg[language].deleted_soon)
        return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
      }
    }else{
      let Permission = new Discord.RichEmbed()
    .setColor("#ff0000")
    .setDescription(lg[language].dt_message)     
    return message.channel.send(Permission);
    }
}