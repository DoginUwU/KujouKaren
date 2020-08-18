const myanimelist = require('myanimelists');
const { getSeasons } = require('myanimelists');
const malScraper = require('mal-scraper');
const Discord = require('discord.js');
const Config = require('../config.json')
const lg = require('../storage/language.json');
let serverData = require('../storage/serverData.json');

exports.run = (client, message, args, language, DC) => {
  try{
      if(args == ""){ 
        const YDHP = new Discord.RichEmbed()
            .setColor('#ff0000')
            .setAuthor(client.user.username, client.user.displayAvatarURL)
            .setDescription(lg[language].anime_valid_name)
            .setFooter(lg[language].deleted_soon)
  
           return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
      }
      
      //var msgW = message.channel.send("Wait... Loading");
    
      const { getInfoFromName } = require('myanimelists');
      const { getEpisodesList } = require('myanimelists');
    
      malScraper.getInfoFromName(args.toString().replace(/,/g, " "))
        .then(result => {

        try{
            Anime(result);
        }catch(erro){ 
          const YDHP = new Discord.RichEmbed()
            .setColor(DC)
            .setAuthor(client.user.username, client.user.displayAvatarURL)
            .setDescription(lg[language].anime_not_find)
            .setFooter(lg[language].deleted_soon)
  
            message.channel.send(YDHP).then(msg => {msg.delete(35000)});
        }
          })
        .catch(error => {
           const YDHP = new Discord.RichEmbed()
            .setColor(DC)
            .setAuthor(client.user.username, client.user.displayAvatarURL)
            .setDescription(lg[language].anime_not_find)
            .setFooter(lg[language].deleted_soon)
  
            message.channel.send(YDHP).then(msg => {msg.delete(35000)});
      });
      async function Anime(result){
        try{
         let embed = new Discord.RichEmbed()
        .setColor(DC)
        .setAuthor(client.user.username, client.user.displayAvatarURL)
        .setThumbnail(result.picture)
        .setTitle(`${result.title}`)
        .setURL(`${result.url}`)
        .addField("Tags:", `${result.genres}`, true)
        .addField("Studio: ", `${result.studios}`, true)
        .addField("Creator:", `${result.staff[0].name}`, true)
        .addField("Status:", `${result.status}`, true)
        .addField("Episodes:", `${result.episodes}`, true)
        .addField("Duration:", `${result.duration}`, true)
        .addField("Type:", `${result.source}`, true)
        .addField("Note:", `${result.score}`, true)
        .addField("Popularity:", `${result.popularity}`, true)
        .addField("Rank:", `${result.ranked}`, true)
        .addField("Synopsis:", `${result.synopsis}`, false)
        .addField("Rating:", `${result.rating}`, true)
        .setFooter(`${lg[language].resquest_command} ${message.author.tag}`, `${message.author.avatarURL}`)
        message.channel.send(embed);
        }catch(error){
           const YDHP = new Discord.RichEmbed()
            .setColor(DC)
            .setAuthor(client.user.username, client.user.displayAvatarURL)
            .setDescription(lg[language].anime_not_find)
            .setFooter(lg[language].deleted_soon)
  
            return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
        }
      }
  }catch(err){
    const YDHP = new Discord.RichEmbed()
      .setColor(DC)
      .setAuthor(client.user.username, client.user.displayAvatarURL)
      .setDescription(lg[language].error)
      .setFooter(lg[language].deleted_soon)
  
      message.channel.send(YDHP).then(msg => {msg.delete(35000)});
  }
}