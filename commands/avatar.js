const Discord = require('discord.js')
const Config = require('../config.json')
const DC = Config.DC;
const lg = require('../storage/language.json');
let serverData = require('../storage/serverData.json');

exports.run = (client, message, args, language, DC) => {
  if(args[0] == "bot"){
    let MentionAvatar = client.user.displayAvatarURL;
    let MentionUsername = client.user.username;

    let Avatar = new Discord.RichEmbed()
    .setColor(DC)
    .setAuthor(MentionUsername, MentionAvatar)
    .setImage(MentionAvatar)
    .setFooter(`${lg[language].resquest_command} ${message.author.tag}`, `${message.author.avatarURL}`)

    return message.channel.send(Avatar);
  }
  
  let Mention = message.mentions.members.first() || message.member;
  let MentionAvatar = Mention.user.displayAvatarURL;
  let MentionUsername = Mention.user.username;
  
  let Avatar = new Discord.RichEmbed()
  .setColor(DC)
  .setAuthor(MentionUsername, MentionAvatar)
  .setImage(MentionAvatar)
  .setFooter(`${lg[language].resquest_command} ${message.author.tag}`, `${message.author.avatarURL}`)
    
  return message.channel.send(Avatar);
}