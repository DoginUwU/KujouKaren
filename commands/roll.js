const Discord = require('discord.js');
const Config = require('../config.json');
const DC = Config.DC;
var file = require('file-system');
var backgrounds = require('../storage/backgrounds.json');
const Canvas = require("canvas");
const snekfetch = require("node-superfetch");
const serverData = require('../storage/serverData.json');
var playerData = require('../storage/playerData.json');

const lg = require('../storage/language.json');

var Roll = require('roll');


exports.run = (client, message, args, language, permission) => {
  var roll = new Roll();
  var valid = roll.validate(args[0]);
  if (!valid) {
  message.channel.send("Desculpe, dado invalido")
  }
  
  var oneDie = roll.roll(args[0]);
   let dice = new Discord.RichEmbed()
    .setColor("#00bd06")
    .setAuthor("Dado de RPG")
    .addField(`Resultado: `, oneDie.result, false)
    .addField(`Rolagens: `, oneDie.rolled, false)
    .addField(`Quantidade: `, oneDie.input.quantity, true)
    .addField(`Lados: `, oneDie.input.sides, true)
    .addField(`Transformações: `, oneDie.input.transformations, true)
    .setThumbnail("https://sc01.alicdn.com/kf/HTB1ZAhXXli5K1Rjt_hNq6zUDVXau.jpg_350x350.jpg")
    .setFooter(`${lg[language].resquest_command} ${message.author.tag}`, `${message.author.avatarURL}`)
    message.channel.send(dice);
}