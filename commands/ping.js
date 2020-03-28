const Discord = require("discord.js");
const Config = require('../config.json');
const DC = Config.DC;

const lg = require('../storage/language.json');

exports.run = (client, message, args, language) => {
  try{
    const Ping = new Discord.RichEmbed()
    .setColor(DC)
    .setAuthor(client.user.username, client.user.displayAvatarURL)
    .setThumbnail(client.user.displayAvatarURL)
    .addField(`${lg[language].latency}`, `${Date.now() - message.createdTimestamp}ms`)
    .addField(`${lg[language].api_latency}`, `${Math.round(client.ping)}ms`)
    .setFooter(`${lg[language].resquest_command} ${message.author.tag}`, `${message.author.avatarURL}`)

    return message.channel.send(Ping);
  }catch(err){
    const YDHP = new Discord.RichEmbed()
      .setColor('#ff0000')
      .setAuthor(client.user.username, client.user.displayAvatarURL)
      .setDescription(lg[language].error)
      .setFooter(lg[language].deleted_soon)
  
      message.channel.send(YDHP).then(msg => {msg.delete(35000)});
  }
}