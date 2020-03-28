const metarParser = require('aewx-metar-parser');
const Discord = require('discord.js')
const Config = require('../config.json')
const DC = Config.DC;
const Browser = require('zombie');

var metar = new Browser();
const lg = require('../storage/language.json');

exports.run = (client, message, args, language) => {
  if(args == ""){ 
    const YDHP = new Discord.RichEmbed()
        .setColor('#ff0000')
        .setAuthor(client.user.username, client.user.displayAvatarURL)
        .setDescription("Sorry, metar is empty")
        .setFooter("This message will be deleted soon.")

      message.channel.send(YDHP).then(msg => {msg.delete(35000)});
  }
  
  try{
    metar.visit("http://tgftp.nws.noaa.gov/data/observations/metar/stations/" + `${args.toString().toUpperCase()}` + ".TXT", function(){
      var metar_str = metar.text().toString();
      const metarObject = metarParser(metar_str.substring(17)); 
      console.log(metarObject);
      var clouds = "";
      try{
        for(var i = 0; i < metarObject.clouds.length; i++){
            clouds += metarObject.clouds[i].code + " Base Feet: " + metarObject.clouds[i].base_feet_agl + " Base Meters: " + Math.round(metarObject.clouds[i].base_meters_agl) + " \n"; 
        }
      }catch(err){
     const YDHP = new Discord.RichEmbed()
        clouds = "cavok";
      }
       let Metar = new Discord.RichEmbed()
        .setColor(DC)
        .setAuthor(client.user.username, client.user.displayAvatarURL)
        .setDescription(`METAR: \*\*${metarObject.icao}\*\*`)
        .addField('Metar', `\*\*${metarObject.raw_text}\*\*`, false)  
        .addField('Temperature', `\*\*${metarObject.temperature.celsius}C°\*\*`, true)
        .addField('Dew Point', `\*\*${metarObject.dewpoint.celsius}C°\*\*`, true)
        .addField('Humidity', `\*\*${Math.round(metarObject.humidity_percent)}\*\*`, true)
        .addField('*Barometer HG*', `\*\*${metarObject.barometer.hg.toFixed(2)}\*\*`, true)
        .addField('*Barometer KPA*', `\*\*${metarObject.barometer.kpa}\*\*`, true)
        .addField('*Barometer MB*', `\*\*${metarObject.barometer.mb}\*\*`, true)
        .addField('Flight Category', `\*\*${metarObject.flight_category}\*\*`, true)
        .addField('Clouds', '```' + `${clouds}` + '```', false)
        .addField('Wind degrees', `\*\*${metarObject.wind.degrees}\*\*`, true)
        .addField('Wind speed kts', `\*\*${metarObject.wind.speed_kts}\*\*`, true)
        .addField('Wind speed mps', `\*\*${Math.round(metarObject.wind.speed_mps)}\*\*`, true)
        .addField('Visibility miles', `\*\*${metarObject.visibility.miles}\*\*`, true)
        .addField('Visibility meters', `\*\*${metarObject.visibility.meters}\*\*`, true)  
        .setFooter(`${lg[language].resquest_command} + ${message.author.tag}`, `${message.author.avatarURL}`)

        message.channel.send(Metar);
    })
  }catch(err){
     const YDHP = new Discord.RichEmbed()
      .setColor('#ff0000')
      .setAuthor(client.user.username, client.user.displayAvatarURL)
      .setDescription(lg[language].error)
      .setFooter(lg[language].deleted_soon)
      return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
  }
}