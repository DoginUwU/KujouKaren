const Discord = require('discord.js')
const Config = require('../config.json')
const DC = Config.DC;

const lg = require('../storage/language.json');

exports.run = (client, message, args, permission, language) => {
  const guilds = client.guilds.map(m => m.name).join("`, `"); 
  
  if (permission) {
    let Guilds = new Discord.RichEmbed()
    .setColor(DC)
    .setAuthor(client.user.username, client.user.displayAvatarURL)
    .setDescription(`\`${guilds}\``)
    
    message.channel.send(Guilds)
  }
}