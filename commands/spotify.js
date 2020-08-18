const Discord = require("discord.js");
const Config = require('../config.json'); 
const DC = Config.DC;
const lg = require('../storage/language.json');

exports.run = (client, message, args, language) => {
  let user = message.mentions.users.first() || message.author;
  var activity = user.presence.game;
  console.log(activity);
  if(activity != null && activity.type == 2 && activity.name == "Spotify" && activity.assets != null){
    
    var img = `https://i.scdn.co/image/${activity.assets.largeImage.slice(8)}`
    var url = `https://open.spotify.com/track/${activity.syncID}`;
    var music = activity.details;
    var authors = activity.state;
    
    let Spotify = new Discord.RichEmbed()
    .setColor("#00bd06")
    .setAuthor("Spotify", "https://www.magneticmag.com/.image/t_share/MTY1MTczMzk2MzUzNTkwNTg0/spotify_icon_cmyk_green.png")
    .addField(lg[language].listening_now, `[${music}](${url})`)
    .addField(lg[language].spo_author, activity.state)
    .setThumbnail(img)
    .setFooter(`${lg[language].resquest_command} ${message.author.tag}`, `${message.author.avatarURL}`)
    console.log(activity);
    
    message.channel.send(Spotify);
    
    //message.channel.send("Ouvindo spotify. Musica: **" +  + "** Autor: **" + activity.state + "** " + img + " " + url);
  
  }else{
    const YDHP = new Discord.RichEmbed()
      .setColor('#ff0000')
      .setAuthor(client.user.username, client.user.displayAvatarURL)
      .setDescription(lg[language].error_spotify1)
  
      message.channel.send(YDHP);
  }
}