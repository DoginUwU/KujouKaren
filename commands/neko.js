const metarParser = require('aewx-metar-parser'); // ma oe >w<
const Discord = require('discord.js')
const Config = require('../config.json')
const akaneko = require('akaneko');
const DC = Config.DC;

const lg = require('../storage/language.json');

exports.run = (client, message, args, language) => {
   if(args[0] === "nsfw" || args[0] === "hentai"){
    message.channel.send("NSFW Neko", {
        files: [akaneko.lewdNeko()]
    })
  }else{
    message.channel.send("SFW Neko", {
        files: [akaneko.neko()]
    })
  }
}