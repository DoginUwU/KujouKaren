const metarParser = require('aewx-metar-parser'); // ma oe >w<
const Discord = require('discord.js')
const Config = require('../config.json')
const morsify = require('morsify');
const DC = Config.DC;

const lg = require('../storage/language.json');

exports.run = (client, message, args, language) => {
  var args2 = args.toString().replace(args[0], "")
  var msg = "";
  if(args[0] == "decode"){
    
    msg = morsify.decode(args2.toString().replace(/,/g, " "));
  }
   if(args[0] == "encode"){
    msg = morsify.encode(args2.toString().replace(/,/g, " "));
  }
  
   let morse = new Discord.RichEmbed()
      .setColor(DC)
      .setAuthor(client.user.username, client.user.displayAvatarURL)
      .setDescription('**' + `${msg}`+ '**')

    return message.channel.send(morse);
}