var weather = require('weather-js');
const Discord = require('discord.js');
const Config = require('../config.json')
const DC = Config.DC;

const lg = require('../storage/language.json');

module.exports.run = async(client, message, args, language) => {
  weather.find({search: args.toString().replace(/,/g, " "), degreeType: 'C'}, function(err, result) {
  if(err) {
    console.log(err);
    const YDHP = new Discord.RichEmbed()
      .setColor('#ff0000')
      .setAuthor(client.user.username, client.user.displayAvatarURL)
      .setDescription(lg[language].error)
      .setFooter(lg[language].deleted_soon)
    return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
  }
    try{
    var icon = "";
      if(result[0].current.skytext == "Sunny"){
         icon = '🌞';
      }
      if(result[0].current.skytext == "Clear"){
         icon = '🌞';
      }
      if(result[0].current.skytext == "Mostly Sunny"){
         icon = '⛅';
      }
      if(result[0].current.skytext == "Mostly Cloudy"){
         icon = '⛅';
      }
      if(result[0].current.skytext == "Cloudy"){
         icon = '☁';
      }
    //var weather = JSON.parse(result);
    const YDHP = new Discord.RichEmbed()
      .setColor(DC)
      .setAuthor(`${result[0].location.name}  ${icon}`)
      .addField(lg[language].weather_temp, `${result[0].current.temperature}`, true)
      .addField(lg[language].weather_sky, `${result[0].current.skytext}`, true)
      .addField(lg[language].weather_humidity, `${result[0].current.humidity}`, true)
      .addField(lg[language].weather_wind, `${result[0].current.winddisplay}`, true)
      .addField(lg[language].weather_day, `${result[0].current.day}`, true)
      .setFooter(`${lg[language].resquest_command} ${message.author.tag}`, `${message.author.avatarURL}`);
  
      message.channel.send(YDHP);
    }catch(err){
      console.log(err);
      const YDHP = new Discord.RichEmbed()
      .setColor('#ff0000')
      .setAuthor(client.user.username, client.user.displayAvatarURL)
      .setDescription(lg[language].error)
      .setFooter(lg[language].deleted_soon)
    return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
    }
  });
}

