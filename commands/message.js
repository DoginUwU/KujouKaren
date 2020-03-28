const Discord = require("discord.js");
const Config = require('../config.json')
const DC = Config.DC;

const lg = require('../storage/language.json');

exports.run = (client, message, args, language, permission) => {
  
  var choose = args[0];
  var id = args[1];
  var sMSG = args.slice(2).join(" ")
  
  if(permission)
  {
  
    if(choose.toLowerCase() == "guild"){
      
      client.channels.get(id).send(sMSG)
      let guild = new Discord.RichEmbed()
      .setColor(DC)
      .setAuthor(client.user.username, client.user.displayAvatarURL)
      .setDescription(`${lg[language].message_sent} \"${sMSG}\" ${lg[language].to} \"<#${id}>\"`)
      .setFooter(lg[language].deleted_soon)
      
      message.channel.send(guild).then(msg => {msg.delete(35000)});
    }
  
    if(choose.toLowerCase() == "member"){
      
      client.users.get(id).send(sMSG)
      let member = new Discord.RichEmbed()
      .setColor(DC)
      .setAuthor(client.user.username, client.user.displayAvatarURL)
      .setDescription(`${lg[language].message_sent} \"${sMSG}\" ${lg[language].to} \"<#${id}>\"`)
      .setFooter(lg[language].deleted_soon)
      
      message.channel.send(member).then(msg => {msg.delete(35000)});     
    }
  }
  else
  {
    let YDHP = new Discord.RichEmbed()
    .setColor(DC)
    .setAuthor(client.user.username, client.user.displayAvatarURL)
    .setDescription(lg[language].adm_cmds_disabled)
    .setFooter(lg[language].deleted_soon)
    
    message.channel.send(YDHP).then(msg => {msg.delete(35000)});  
  }
}