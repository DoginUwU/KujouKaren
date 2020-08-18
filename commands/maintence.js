  const Discord = require('discord.js');
const Config = require('../config.json');
const DC = Config.DC;
var file = require('file-system');
var backgrounds = require('../storage/backgrounds.json');
const Canvas = require("canvas");
const snekfetch = require("node-superfetch");
const serverData = require('../storage/serverData.json');
var playerData = require('../storage/playerData.json');
var bot_config = require('../storage/bot.json');
const fs = require('fs');

const lg = require('../storage/language.json');

exports.run = (client, message, args, language, permission) => {
  if (permission){
    if(bot_config["me"]){
      bot_config["me"].maintence = !bot_config["me"].maintence;
      fs.writeFile('./storage/bot.json', JSON.stringify(bot_config, null, 2), (err) => {
            if (err) {
              console.log(err);
               const YDHP = new Discord.RichEmbed()
                .setColor('#ff0000')
                .setAuthor(client.user.username, client.user.displayAvatarURL)
                .setDescription(lg[language].sorry_error)
                .setFooter(lg[language].deleted_soon)
              return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
            }
             const Prefix = new Discord.RichEmbed()
              .setColor(DC)
              .setAuthor(client.user.username, client.user.displayAvatarURL)
              .setDescription("Maintence mode changed to: " + bot_config["me"].maintence)
              .setFooter(`${lg[language].resquest_command} + ${message.author.tag}`, `${message.author.avatarURL}`)

              return message.channel.send(Prefix)
          })
    }
  }
}