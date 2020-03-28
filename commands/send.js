const Discord = require('discord.js');
const Config = require('../config.json')
const DC = Config.DC;

const lg = require('../storage/language.json');

exports.run = (client, message, args, language) => {
   if(args == ""){
      const YDHP = new Discord.RichEmbed()
      .setColor('#ff0000')
      .setAuthor(client.user.username, client.user.displayAvatarURL)
      .setDescription(lg[language].error)
      .setFooter(lg[language].deleted_soon)
      return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
    }else{
      try{
        let dUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        const dUserEmbed = new Discord.RichEmbed()
        .setColor(DC)
        .setAuthor(client.user.username, client.user.displayAvatarURL)
        .setDescription(`${lg[language].send_sending}** ${dUser.user.username} ** `)
        .setFooter(`${lg[language].resquest_command} + ${message.author.tag}`, `${message.author.avatarURL}`)
        message.channel.send(dUserEmbed)

        var msg = args.toString().replace(/,/g, " ");
        const dmUserEmbed = new Discord.RichEmbed()
        .setColor(DC)
        .setAuthor(client.user.username, client.user.displayAvatarURL)
        .setDescription(`${msg}`)
        .setFooter(`${lg[language].resquest_command} + ${message.author.tag}`, `${message.author.avatarURL}`)
        dUser.send(dmUserEmbed)
      }catch(err){
        const YDHP = new Discord.RichEmbed()
          .setColor('#ff0000')
          .setAuthor(client.user.username, client.user.displayAvatarURL)
          .setDescription(lg[language].error)
          .setFooter(lg[language].deleted_soon)

          message.channel.send(YDHP).then(msg => {msg.delete(35000)});
      }
    } 
}