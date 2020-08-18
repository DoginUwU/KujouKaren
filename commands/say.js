const Discord = require('discord.js');
const Config = require('../config.json')
const DC = Config.DC;

const lg = require('../storage/language.json');

exports.run = (client, message, args, language, permission, dt) => {
  if(message.member.hasPermission('MANAGE_MESSAGES')) {
    if (args.join(" ") == "") {
      let Error = new Discord.RichEmbed()
      .setColor(DC)
      .setDescription(lg[language].say_args_null)
      .setFooter(lg[language].deleted_soon)
    
      message.channel.send(Error).then(msg => {msg.delete(35000)});
    }else{
      message.delete();
      message.channel.send(args.join(" "))
    }
  }else{
    let Permission = new Discord.RichEmbed()
    .setColor("#ff0000")
    .setDescription(lg[language].dt_message)     
    return message.channel.send(Permission);
  }
}