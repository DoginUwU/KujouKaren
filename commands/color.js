const Discord = require('discord.js');
const Config = require('../config.json')
const fs = require('fs');
const lg = require('../storage/language.json');
let serverData = require('../storage/serverData.json');

exports.run = (client, message, args, language, DC) => {
  let Mention = message.member;
  if(Mention.hasPermission('ADMINISTRATOR'))
    {
       if(args[0] == "green" || )
    }
  else
  {
    let Permission = new Discord.RichEmbed()
    .setColor("#ff0000")
    .setDescription(lg[language].dt_message)     
    return message.channel.send(Permission);
  }
}