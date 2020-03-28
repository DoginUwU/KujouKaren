const Discord = require('discord.js');
const Config = require('../config.json')
const DC = Config.DC;
const fs = require('fs');
let playerData = require('../storage/playerData.json');
const serverData = require('../storage/serverData.json');

const lg = require('../storage/language.json');

exports.run = (client, message, args, language) => {
  if(serverData[message.guild.id].eco == false){ return;}
  var idPlayer = message.author.id + message.guild.id;
  try{
    if(playerData[idPlayer]){
      var RegExPattern = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
         if (!((args.toString().match(RegExPattern)) && (args.toString() !=''))) {
           const YDHP = new Discord.RichEmbed()
            .setColor('#ff0000')
            .setAuthor(client.user.username, client.user.displayAvatarURL)
           .setDescription(lg[language].error)
      .setFooter(lg[language].deleted_soon)
          return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
         }else{
           playerData[idPlayer].birthday = args.toString();
           fs.writeFile('./storage/playerData.json', JSON.stringify(playerData, null, 2), (err) => {
            if (err) console.log(err)
            else{
              const birthday = new Discord.RichEmbed()
                .setColor(DC)
                .setAuthor(client.user.username, client.user.displayAvatarURL)
                .setDescription(`${lg[language].birthday_successfully} \`${playerData[idPlayer].birthday}\``)
                .setFooter(`${lg[language].resquest_command} + ${message.author.tag}`, `${message.author.avatarURL}`)
              return message.channel.send(birthday)
            }
        })
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