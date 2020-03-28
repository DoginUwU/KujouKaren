const Discord = require('discord.js')
const lg = require('../storage/language.json');

exports.run = (client, message, args, language, permission) => {
  if(permission){
    if(args.join(" ").toLowerCase() == "error 1"){
      return message.channel.send(lg[language].not_allowed + "PERMISSION" + lg[language].not_allowed_2)
    }else if(args.join(" ").toLowerCase() == "error 2"){
      return message.channel.send(lg[language].maintence)
    }
  }
}