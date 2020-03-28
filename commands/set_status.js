const Discord = require('discord.js')
const Config = require('../config.json')
const DC = Config.DC;

const lg = require('../storage/language.json');

exports.run = (client, message, args, language, permission) => {
  
  if(permission)
  {
  
  var MD = args[0];
  var TP = args[1];
  var GM = args.slice(2).join(" ")
  
  let DP = {
    "Green": "Online",
    "Red": "Do Not Disturb",
    "Orange": "Idle",
    "Gray": "Invisible",
  
    "Play": "Playing",
    "Watch": "Watching",
    "List": "Listening",
    "Stream": "Streaming"
  }
  
  if(MD == "Green") {
    client.user.setGame('Online');
  }
  else if(MD == "Red") {
    client.user.setGame('dnd');
  }
  else if(MD == "Orange") {
    client.user.setGame('idle');
  }
  else if(MD == "Gray") {
    client.user.setGame('invisible');
  }
  
  if(TP == "Play") {
    client.user.setActivity(`${GM}`, { type: 'PLAYING' });
  }
  else if(TP == "Watch") {
    client.user.setActivity(`${GM}`, { type: 'WATCHING' });
  }
  else if(TP == "List") {
    client.user.setActivity(`${GM}`, { type: 'LISTENING' });
  }
  else if(TP == "Stream") {
    client.user.setActivity(`${GM}`, { type: 'STREAMING', url: "https://www.twitch.tv/Alph4_Zer0" });
  }
  else {
    client.user.setActivity(`${GM}`, { type: 'PLAYING' });
  }
    let SS = new Discord.RichEmbed()
    .setColor(DC)
    .setAuthor(client.user.username, client.user.displayAvatarURL)
    .setDescription(`The bot status settings have been changed to: ${DP[MD]}, ${DP[TP]}, ${GM}`)
    .setFooter(lg[language].deleted_soon)
  
    message.channel.send(SS).then(msg => {msg.delete(35000)});  
  }
  else
  {
    let YDHP = new Discord.RichEmbed()
    .setColor(DC)
    .setAuthor(client.user.username, client.user.displayAvatarURL)
    .setDescription(lg[language].not_allowed)
    .setFooter(lg[language].deleted_soon)
    
    message.channel.send(YDHP).then(msg => {msg.delete(35000)});  
  }
}