const Discord = require('discord.js');
const Config = require('../config.json')
const DC = Config.DC;
const fs = require('fs');
const serverData = require('../storage/serverData.json');

const lg = require('../storage/language.json');

exports.run = (client, message, args, language, dt) => {
  try{
  let Mention = message.member;
  if(Mention.hasPermission('MANAGE_CHANNELS'))
    {
      if(serverData[message.guild.id].ads == false){
        serverData[message.guild.id].ads = true;
      }else{
        serverData[message.guild.id].ads = false;
      }
      
      fs.writeFile('./storage/serverData.json', JSON.stringify(serverData, null, 2), (err) => {
        if (err) console.log(err)
      })
  
      const Prefix = new Discord.RichEmbed()
      .setColor(DC)
      .setAuthor(client.user.username, client.user.displayAvatarURL)
      .setDescription(`${lg[language].ads_successfully} \`${serverData[message.guild.id].ads}\``)
      .setFooter(`${lg[language].resquest_command} + ${message.author.tag}`, `${message.author.avatarURL}`)
  
      message.channel.send(Prefix)
    }
  else
  {
    let Permission = new Discord.RichEmbed()
    .setColor("#ff0000")
    .setDescription(lg[language].dt_message)     
    return message.channel.send(Permission);
    }
  }catch(err){
    const YDHP = new Discord.RichEmbed()
      .setColor('#ff0000')
      .setAuthor(client.user.username, client.user.displayAvatarURL)
      .setDescription(lg[language].error)
      .setFooter(lg[language].deleted_soon)
  
      message.channel.send(YDHP).then(msg => {msg.delete(35000)});
  }
}