const Discord = require('discord.js');
const Config = require('../config.json');
const lg = require('../storage/language.json');
const DC = Config.DC;
let serverData = require('../storage/serverData.json');

function EightBall(language) {
    var random = [lg[language].ball_yes, lg[language].no, lg[language].ball_certainty, lg[language].ball_r_yes, lg[language].ball_r_no, lg[language].ball_certainty_no, lg[language].ball_think_not, lg[language].ball_guess_so];
    return random[Math.floor(Math.random()*random.length)];
}

exports.run = (client, message, args , language) => {
  var Question = args.join(" ")
  
  if(Question == "")
  {
    let Error = new Discord.RichEmbed()
    .setColor(DC)
    .setAuthor(client.user.username, client.user.displayAvatarURL)
    .setDescription(lg[language].ball_ERROR)
    .setFooter(lg[language].deleted_soon)
            
    return message.channel.send(Error).then(msg => {msg.delete(35000)}); 
  }
  else {
    let Ball = new Discord.RichEmbed()     
    .setColor(DC)
    .setAuthor("🎱Ball", client.user.avatarURL)
    .addField(lg[language].question, Question)
    .addField(lg[language].answer, EightBall(language))
    .setFooter(`${lg[language].resquest_command} ${message.author.tag}`, `${message.author.avatarURL}`)

    return message.channel.send(Ball);
  }
}