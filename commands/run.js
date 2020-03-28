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

exports.run = (client, message, args, language, permission) => {
  if (permission){
  let Prefix = serverData[message.guild.id].prefix;
  const code = args.join(" ");
  
  if(code != ""){
    runCommand();
  }
  
  async function runCommand(){
     try {
      const evaled = eval(code);
      const clean = await client.clean(client, evaled);
      return message.channel.send(`\`\`\`js\n${clean}\n\`\`\``);
     }catch(err){
       if(err){
         if(err != "TypeError: client.clean is not a function"){
          const YDHP = new Discord.RichEmbed()
            .setColor('#ff0000')
            .setAuthor(client.user.username, client.user.displayAvatarURL)
            .setDescription(err)
          return message.channel.send(YDHP);
         }
       }
     }
  }
  }
}