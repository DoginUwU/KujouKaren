const Discord = require('discord.js');
const Config = require('../config.json')
const DC = Config.DC;

const lg = require('../storage/language.json');

exports.run = (client, message, args, language, permission) => {
  if(message.member.hasPermission('MANAGE_MESSAGES')) {
    if (args.join(" ") == "") {
      let Error = new Discord.RichEmbed()
      .setColor(DC)
      .setDescription(lg[language].say_args_null)
      .setFooter(lg[language].deleted_soon)
    
      message.channel.send(Error).then(msg => {msg.delete(35000)});
    }else{
      message.channel.send(args.join(" "))
    }
  }else{
    message.channel.send(lg[language].not_allowed + "MANAGE_MESSAGES" + lg[language].not_allowed_2)
  }
}