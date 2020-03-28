const metarParser = require('aewx-metar-parser');
const Discord = require('discord.js')
const Config = require('../config.json')
const morsify = require('morsify');
const DC = Config.DC;

const lg = require('../storage/language.json');

exports.run = (client, message, args, language) => {
  var args2 = args.toString().replace(args[0], "")
  var msg = "";
  if(args[0] == "decode"){
    
    msg = Buffer.from(args2.toString().replace(/,/g, " "), 'base64').toString('ascii');
  }
   if(args[0] == "encode"){
    msg = Buffer.from(args2.toString().replace(/,/g, " ")).toString('base64');
  }
  
   let morse = new Discord.RichEmbed()
      .setColor(DC)
      .setAuthor(client.user.username, client.user.displayAvatarURL)
      .setDescription('**' + `${msg}`+ '**')

    return message.channel.send(morse);
}