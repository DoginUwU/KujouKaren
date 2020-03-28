const Discord = require('discord.js');
const Config = require('../config.json')
const DC = Config.DC;

const One = "https://media1.tenor.com/images/7db5f172665f5a64c1a5ebe0fd4cfec8/tenor.gif"
const Two = "https://media1.tenor.com/images/4d89d7f963b41a416ec8a55230dab31b/tenor.gif"
const Three = "https://media1.tenor.com/images/1069921ddcf38ff722125c8f65401c28/tenor.gif"
const Four = "https://media1.tenor.com/images/34a1d8c67e7b373de17bbfa5b8d35fc0/tenor.gif"

function RandomHit() {
    var rand = [One, Two, Three, Four];
        return rand[Math.floor(Math.random()*rand.length)];
  }

const lg = require('../storage/language.json');

exports.run = (client, message, args, language) => {
  if(args != ""){
    let dUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
   
   let Error = new Discord.RichEmbed()
    .setColor(DC)
    .setDescription(`${message.author} huged ${dUser.user}`)
    .setImage(RandomHit())
    .setFooter(`${lg[language].resquest_command} ${message.author.tag}`, `${message.author.avatarURL}`)
    
    return message.channel.send(Error).then(msg => {msg.react('😀')});
  }
}