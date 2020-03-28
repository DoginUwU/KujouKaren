const Discord = require('discord.js');
const Config = require('../config.json')
const DC = Config.DC;
const fs = require('fs');
const serverData = require('../storage/serverData.json');

const lg = require('../storage/language.json');

exports.run = (client, message, args, language) => {
  try{
  let Mention = message.mentions.members.first() || message.member;
  if(Mention.hasPermission('MANAGE_CHANNELS'))
    {
      if(serverData[message.guild.id].nsfw == false){
        serverData[message.guild.id].nsfw = true;
      }else{
        serverData[message.guild.id].nsfw = false;
      }
      
      fs.writeFile('./storage/serverData.json', JSON.stringify(serverData, null, 2), (err) => {
        if (err) console.log(err)
      })
  
      const Prefix = new Discord.RichEmbed()
      .setColor(DC)
      .setAuthor(client.user.username, client.user.displayAvatarURL)
      .setDescription(`${lg[language].nsfw_successfully} \`${serverData[message.guild.id].nsfw}\``)
      .setFooter(`${lg[language].resquest_command} + ${message.author.tag}`, `${message.author.avatarURL}`)
  
      message.channel.send(Prefix)
    }
  else
  {
    message.channel.send(lg[language].not_allowed + "MANAGE_MESSAGES" + lg[language].not_allowed_2)
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