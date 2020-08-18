const Discord = require('discord.js');
const Config = require('../config.json')
const DC = Config.DC;
const fs = require('fs');
var file = require('file-system');
const prefix = JSON.parse(file.readFileSync("./storage/serverData.json", "utf8"));

const lg = require('../storage/language.json');

exports.run = (client, message, args, language, permission, dt) => {
  let Mention = message.member;
  if(Mention.hasPermission('ADMINISTRATOR') || permission) {
        prefix[message.guild.id].prefix = args.toString();
        if (!prefix[message.guild.id].prefix) {
          prefix[message.guild.id].prefix = Config.prefix;
        }
  
      fs.writeFile('./storage/serverData.json', JSON.stringify(prefix, null, 2), (err) => {
            if (err) console.log(err)
        
            else{
              let Prefix = new Discord.RichEmbed()
              .setColor(DC)
              .setAuthor(client.user.username, client.user.displayAvatarURL)
              .setDescription(`${lg[language].prefix_changed} \`${prefix[message.guild.id].prefix}\``)
              .setFooter(`${lg[language].resquest_command} + ${message.author.tag}`, `${message.author.avatarURL}`)
              return message.channel.send(Prefix)
            }
        })
    }
  else
  {
    let Permission = new Discord.RichEmbed()
    .setColor("#ff0000")
    .setDescription(lg[language].dt_message)     
    return message.channel.send(Permission);
  }
}