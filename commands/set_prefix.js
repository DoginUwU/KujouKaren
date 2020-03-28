const Discord = require('discord.js');
const Config = require('../config.json')
const DC = Config.DC;
const fs = require('fs');
const prefix = require('../storage/prefix.json');

const lg = require('../storage/language.json');

exports.run = (client, message, args, language, permission) => {
  let Mention = message.member;
  if(Mention.hasPermission('ADMINISTRATOR') || permission)
    {
      
        prefix[message.guild.id].prefix = args.join(" ")
        if (!prefix[message.guild.id].prefix) {
          prefix[message.guild.id].prefix = Config.prefix;
        }
  
      const Prefix = new Discord.RichEmbed()
      .setColor(DC)
      .setAuthor(client.user.username, client.user.displayAvatarURL)
      .setDescription(`${lg[language].prefix_changed} \`${prefix[message.guild.id].prefix}\``)
      .setFooter(`${lg[language].resquest_command} + ${message.author.tag}`, `${message.author.avatarURL}`)
  
      message.channel.send(Prefix)
    }
  else
  {
    const YDHP = new Discord.RichEmbed()
      .setColor('#ff0000')
      .setAuthor(client.user.username, client.user.displayAvatarURL)
      .setDescription(lg[language].not_allowed)
      .setFooter(lg[language].deleted_soon)
  
      message.channel.send(YDHP).then(msg => {msg.delete(35000)});
  }
}