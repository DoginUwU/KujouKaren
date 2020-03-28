const Discord = require('discord.js');
const Config = require('../config.json')
const DC = Config.DC;
const translate = require('@vitalets/google-translate-api');

const lg = require('../storage/language.json');

exports.run = (client, message, args, language) => {
  
  var text = args.toString().replace(args[0].toString(), "");
  translate(text.toString().replace(/,/g, " "), {to: args[0].toString()}).then(res => {
    
    const translateEmbed = new Discord.RichEmbed()
      .setColor(DC)
      .setAuthor(client.user.username, client.user.displayAvatarURL)
      .addField(`${lg[language].translate_to} ${args[0].toString()}`, `${res.text}`)
      .setFooter(`${lg[language].resquest_command} ${message.author.tag}`, `${message.author.avatarURL}`)
    return message.channel.send(translateEmbed)
    
  }).catch(err => {
     console.error(err);
     const YDHP = new Discord.RichEmbed()
      .setColor('#ff0000')
      .setAuthor(client.user.username, client.user.displayAvatarURL)
      .setDescription(lg[language].error)
      .setFooter(lg[language].deleted_soon)
    return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
  });
}