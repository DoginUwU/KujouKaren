const Discord = require('discord.js');
const Config = require('../config.json')
const DC = Config.DC;
const lg = require('../storage/language.json');

exports.run = (client, message, args, language) => {
  if(!message.member.hasPermission('MANAGE_MESSAGES')){
        return message.channel.send(lg[language].not_allowed + "MANAGE_MESSAGES" + lg[language].not_allowed_2)
      }else{
      if(args == ""){
        message.channel.bulkDelete(1).then(() => {
            const YDHP = new Discord.RichEmbed()
              .setColor(DC)
              .setAuthor(client.user.username, client.user.displayAvatarURL)
              .setDescription(lg[language].deleted_message)
              .setFooter(lg[language].deleted_soon)

              return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
        })
      }else{
        message.channel.bulkDelete(args[0]).then(() => {
          const YDHP = new Discord.RichEmbed()
              .setColor(DC)
              .setAuthor(client.user.username, client.user.displayAvatarURL)
              .setDescription(lg[language].deleted + " " +`\*\*${args[0]}\*\*`+ " " + lg[language].messages)
              .setFooter(lg[language].deleted_soon)

            return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
        })
      }  
    }
}