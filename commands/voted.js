const Discord = require('discord.js')
const Config = require('../config.json')
const DC = Config.DC;
const moment = require("moment");
const DBL = require('dblapi.js');


let DP = {
        "online": "<:Online:555836354022473772> Online",
        "offline": "<:Desconectado:555836353544454154> Offline",
        "idle": "<:Ausente:555836351136792608> Idle",
        "dnd": "<:Ocupado:555836353787723788> Do Not Disturb",
    }

const lg = require('../storage/language.json');

exports.run = (client, message, args, language) => {
  const dbl = new DBL(process.env.bot_token, client);
  dbl.getVotes().then(votes => {
    dbl.hasVoted(args.toString()).then(voted => {
    if (voted){
      dbl.getUser(args.toString()).then(user => {
          var bio = "none";
          if(user.bio != ""){
             bio = user.bio;
          }
          let Userinfo = new Discord.RichEmbed()
            .setColor(user.color)
            .setAuthor(`${user.username}`)
            .addField("Voted?", "✅ Yes")
            .addField("Bio", bio)
            .setFooter(`${lg[language].resquest_command} ${message.author.tag}`, `${message.author.avatarURL}`)

        message.channel.send(Userinfo)
      });
    }
    else {
      dbl.getUser(args.toString()).then(user => {
         var bio = "none";
          if(user.bio != ""){
             bio = user.bio;
          }
          let Userinfo = new Discord.RichEmbed()
            .setColor(user.color)
            .setAuthor(`${user.username}`)
            .addField("Voted?", "❌ No")
            .addField("Bio", bio)
            .setFooter(`${lg[language].resquest_command} ${message.author.tag}`, `${message.author.avatarURL}`)

        message.channel.send(Userinfo)
      });
    }
  });
  });
}