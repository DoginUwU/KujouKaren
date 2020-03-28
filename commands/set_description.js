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
      playerData[idPlayer].description = args.toString().replace(/,/g, " ");
      fs.writeFile('./storage/playerData.json', JSON.stringify(playerData, null, 2), (err) => {
            if (err) console.log(err)
            else{
              const description = new Discord.RichEmbed()
                .setColor(DC)
                .setAuthor(client.user.username, client.user.displayAvatarURL)
                .setDescription(`${lg[language].description_successfully} \`${playerData[idPlayer].description}\``)
                .setFooter(`${lg[language].resquest_command} + ${message.author.tag}`, `${message.author.avatarURL}`)
              return message.channel.send(description)
            }
      })
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