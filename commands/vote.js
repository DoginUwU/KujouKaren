const Discord = require('discord.js')
const Config = require('../config.json')
const DC = Config.DC;

const lg = require('../storage/language.json');

exports.run = (client, message, args, language) => {
   let Vote = new Discord.RichEmbed()
   .setColor(DC)
   .setAuthor(client.user.username, client.user.displayAvatarURL)
   .setDescription(lg[language].vote_help + " " + `[${lg[language].here_3}](https://discordbots.org/bot/568539957703213077/vote)` + ", " + lg[language].vote_help_2)
   .setFooter(`${lg[language].resquest_command} ${message.author.tag}`, `${message.author.avatarURL}`)
   
   return message.channel.send(Vote)
}