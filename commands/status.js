const Discord = require('discord.js')
const Config = require('../config.json')
const DC = Config.DC;

const lg = require('../storage/language.json');

exports.run = (client, message, args, language, permission) => {
  
  if(permission)
  {
  
  var MD = args[0].toLowerCase();
  var TP = args[1].toLowerCase();
  var GM = args.slice(2).join(" ")
  
  let DP = {
    "online": "Online",
    "dnd": "Do Not Disturb",
    "idle": "Idle",
    "inv": "Invisible",
  
    "play": "Playing",
    "watch": "Watching",
    "list": "Listening",
    "stream": "Streaming"
  }
  
  if(MD == "online") {
    client.user.setGame('Online');
  }
  else if(MD == "dnd") {
    client.user.setGame('dnd');
  }
  else if(MD == "idle") {
    client.user.setGame('idle');
  }
  else if(MD == "inv") {
    client.user.setGame('invisible');
  }
  
  if(TP == "play") {
    client.user.setActivity(`${GM}`, { type: 'PLAYING' });
  }
  else if(TP == "watch") {
    client.user.setActivity(`${GM}`, { type: 'WATCHING' });
  }
  else if(TP == "list") {
    client.user.setActivity(`${GM}`, { type: 'LISTENING' });
  }
  else if(TP == "stream") {
    client.user.setActivity(`${GM}`, { type: 'STREAMING', url: "https://www.twitch.tv/Alph4_Zer0" });
  }
  else {
    client.user.setActivity(`${GM}`, { type: 'PLAYING' });
  }
    let SS = new Discord.RichEmbed()
    .setColor(DC)
    .setAuthor(client.user.username, client.user.displayAvatarURL)
    .setDescription(`${lg[language].status_changed} ${DP[MD]}, ${DP[TP]}, ${GM}`)
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