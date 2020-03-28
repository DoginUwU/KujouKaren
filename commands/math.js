const Discord = require('discord.js')
const Config = require('../config.json')
const DC = Config.DC;
const Browser = require('zombie');

const lg = require('../storage/language.json');

exports.run = (client, message, args, language) => {
   if(args[1] == "+"){
      var value = parseFloat(args[0]) + parseFloat(args[2]);
      let math = new Discord.RichEmbed()
          .setColor(DC)
          .setAuthor(client.user.username, client.user.displayAvatarURL)
          .setDescription('**' + `${value}`+ '**')
          .setFooter(`${lg[language].math_plus}  ${args[0]} + ${args[2]}`)

          message.channel.send(math);
   } 
   if(args[1] == "-"){
      var value = parseFloat(args[0]) - parseFloat(args[2]);
      let math = new Discord.RichEmbed()
          .setColor(DC)
          .setAuthor(client.user.username, client.user.displayAvatarURL)
          .setDescription('**' + `${value}`+ '**')
          .setFooter(`${lg[language].math_less}  ${args[0]} - ${args[2]}`)

          message.channel.send(math);
   } 
  if(args[1] == "/"){
      var value = parseFloat(args[0]) / parseFloat(args[2]);
      let math = new Discord.RichEmbed()
          .setColor(DC)
          .setAuthor(client.user.username, client.user.displayAvatarURL)
          .setDescription('**' + `${value}`+ '**')
          .setFooter(`${lg[language].math_division}  ${args[0]} / ${args[2]}`)

          message.channel.send(math);
   } 
  if(args[1] == "*"){
      var value = parseFloat(args[0]) * parseFloat(args[2]);
      let math = new Discord.RichEmbed()
          .setColor(DC)
          .setAuthor(client.user.username, client.user.displayAvatarURL)
          .setDescription('**' + `${value}`+ '**')
          .setFooter(`${lg[language].math_multiply}  ${args[0]} * ${args[2]}`)

          message.channel.send(math);
   } 
  if(args[1] == "pow"){
      var value = Math.pow(parseFloat(args[0]), parseFloat(args[2]));
      let math = new Discord.RichEmbed()
          .setColor(DC)
          .setAuthor(client.user.username, client.user.displayAvatarURL)
          .setDescription('**' + `${value}`+ '**')
          .setFooter(`${lg[language].math_pow}  ${args[0]} pow ${args[2]}`)

          message.channel.send(math);
   } 
  if(args[1] == "square"){
      var value = Math.sqrt(parseFloat(args[0]));
      let math = new Discord.RichEmbed()
          .setColor(DC)
          .setAuthor(client.user.username, client.user.displayAvatarURL)
          .setDescription('**' + `${value}`+ '**')
          .setFooter(`${lg[language].math_square}  ${args[0]}`)

          message.channel.send(math);
   } 
  if(args[1] == "absolute"){
      var value = Math.abs(parseFloat(args[0]));
      let math = new Discord.RichEmbed()
          .setColor(DC)
          .setAuthor(client.user.username, client.user.displayAvatarURL)
          .setDescription('**' + `${value}`+ '**')
          .setFooter(`${lg[language].math_absolute}  ${args[0]}`)

          message.channel.send(math);
   } 
  if(args[1] == "round"){
      var value = Math.ceil(parseFloat(args[0]));
      let math = new Discord.RichEmbed()
          .setColor(DC)
          .setAuthor(client.user.username, client.user.displayAvatarURL)
          .setDescription('**' + `${value}`+ '**')
          .setFooter(`${lg[language].math_round} ${args[0]}`)

          message.channel.send(math);
   } 
  if(args[1] == "random"){
      var value = Math.floor(Math.random() * parseFloat(args[2])) + parseFloat(args[0]);
      let math = new Discord.RichEmbed()
          .setColor(DC)
          .setAuthor(client.user.username, client.user.displayAvatarURL)
          .setDescription('**' + `${value}`+ '**')
          .setFooter(`${lg[language].math_random} min: ${args[0]} max: ${args[2]}`)

          message.channel.send(math);
   } 
  if(args[0] == "pi"){
      var value = Math.PI;
      let math = new Discord.RichEmbed()
          .setColor(DC)
          .setAuthor(client.user.username, client.user.displayAvatarURL)
          .setDescription('**' + `${value}`+ '**')

          message.channel.send(math);
   } 
}