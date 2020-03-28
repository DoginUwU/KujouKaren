const Discord = require('discord.js');
const Config = require('../config.json');
const DC = Config.DC;

const One = "https://i.redd.it/3iiocp7oxfvy.gif"
const Two = "https://thumbs.gfycat.com/ValidBigheartedBlobfish-size_restricted.gif"
const Three = "https://66.media.tumblr.com/80cd245b87483830e670a91433e5ef7f/tumblr_nzsyt5upQi1rqe0rbo2_500.gif"
const Four = "https://cdn.discordapp.com/attachments/540308761458245642/569876295102758933/giphy.gif"
const Five = "https://media1.tenor.com/images/d26161c9498a226cafe625db6b6782bc/tenor.gif"

function RandomHit() {
    var rand = [One, Two, Three, Four, Five];
        return rand[Math.floor(Math.random()*rand.length)];
  }

const lg = require('../storage/language.json');

exports.run = (client, message, args, language) => {
  if(args != ""){
    let dUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
   
   let Error = new Discord.RichEmbed()
    .setColor(DC)
    .setDescription(`${message.author} hit ${dUser.user}`)
    .setImage(RandomHit())
    .setFooter(`${lg[language].resquest_command} + ${message.author.tag}`, `${message.author.avatarURL}`)
    
    return message.channel.send(Error).then(msg => {msg.react('😤')});
  }
}