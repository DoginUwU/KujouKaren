const Discord = require('discord.js');
const Config = require('../config.json')
const DC = Config.DC;

const One = "https://media1.tenor.com/images/051cf0932320cdfbb4be560cf8f3eae7/tenor.gif?itemid=9772379"
const Two = "https://media.tenor.com/images/47892bb88afc132a3afb775988208240/tenor.gif"
const Three = "https://i0.wp.com/31.media.tumblr.com/d725a314c5605a2f7e632f92bf331645/tumblr_inline_mjby5jC3WN1qz4rgp.gif"
const Four = "https://sweetytextmessages.com/wp-content/uploads/2018/02/Anime-Gif-with-Sad-Face-3.gif"
const Five = "https://media.giphy.com/media/Xqlsn2kLPBquI/giphy.gif"

const lg = require('../storage/language.json');

exports.run = (client, message, args, language) => {
  
  function RandomSad() {
    var rand = [One, Two, Three, Four, Five];
        return rand[Math.floor(Math.random()*rand.length)];
  }
  
   let Error = new Discord.RichEmbed()
    .setColor(DC)
    .setDescription(`${message.author} is sad.`)
    .setImage(RandomSad())
    .setFooter(`Command requested by: ${message.author.tag}`, `${message.author.avatarURL}`)
    
    return message.channel.send(Error).then(msg => {msg.react('😭')});
}