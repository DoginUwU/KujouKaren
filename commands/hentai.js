const Discord = require('discord.js');
const Config = require('../config.json')
const DC = Config.DC;
const fs = require('fs');
const serverData = require('../storage/serverData.json');
const Kaori = require('kaori');
const kaori = new Kaori();

const lg = require('../storage/language.json');

exports.run = (client, message, args, language) => {
  try{
    if(serverData[message.guild.id]){
    if(serverData[message.guild.id].nsfw == true){
        if (!message.channel.nsfw) return message.channel.send(lg[language].hentai_not_nsfw);
        var score = 0;  
        var argsHentai = args.toString().replace(/,/g, " ");
        if(args.toString().includes("score:")){
              score = args.toString();
              score = score.match(/\d+/)[0];
          argsHentai = argsHentai.replace("score:"+ score, "");
           }
        argsHentai = argsHentai.toString().replace(/,/g, " ");
        argsHentai = argsHentai.toString().split(" ");
        argsHentai = argsHentai.filter(e => e !== '');  
        if(argsHentai.toString() == ""){
            var hentaiImg = kaori.search('rule34', { limit: 1, random: true, score: parseInt(score) })
            .then(images => {
              return  message.channel.sendMessage({
              "embed": {
                color: 0xffdb00,
                title: 'rule34 - Score [' + images[0].score + ']',
                url: images[0].common.fileURL,
                "image": {
                "url": images[0].common.fileURL,
                },
                footer: {
                  text: ""
                }
            }
        });
            })
            .catch(err => {
              console.log(err);
              const YDHP = new Discord.RichEmbed()
                .setColor('#ff0000')
                .setAuthor(client.user.username, client.user.displayAvatarURL)
                .setDescription(lg[language].hentai_not_find)
                .setFooter(lg[language].deleted_soon)

                return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
            });
          
        }else if(argsHentai.length == 1){
          try{
          var hentaiImg = kaori.search('rule34', { tags: [argsHentai[0].toString()], limit: 1, random: true, score: parseInt(score) })
            .then(images => {
              return  message.channel.sendMessage({
              "embed": {
                color: 0xffdb00,
                title: 'rule34 - Score [' + images[0].score + ']',
                url: images[0].common.fileURL,
                "image": {
                "url": images[0].common.fileURL,
                },
                footer: {
                  text: ""
                }
            }
        });
            })
            .catch(err => {
              const YDHP = new Discord.RichEmbed()
                .setColor('#ff0000')
                .setAuthor(client.user.username, client.user.displayAvatarURL)
                .setDescription(lg[language].hentai_not_find)
                .setFooter(lg[language].deleted_soon)

                return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
            });
        }catch(err){
          const YDHP = new Discord.RichEmbed()
                .setColor('#ff0000')
                .setAuthor(client.user.username, client.user.displayAvatarURL)
                .setDescription(lg[language].hentai_not_find)
                .setFooter(lg[language].deleted_soon)

                return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
        }
        }
        else if(argsHentai.length == 2){
          try{
         for (var i = 0; i < parseInt(argsHentai[1].toString()); i++) {
          var hentaiImg = kaori.search('rule34', { tags: [argsHentai[0].toString()], limit: 1, random: true, score: parseInt(score) })
            .then(images => {
              return  message.channel.sendMessage({
              "embed": {
                color: 0xffdb00,
                title: 'rule34 - Score [' + images[0].score + ']',
                url: images[0].common.fileURL,
                "image": {
                "url": images[0].common.fileURL,
                },
                footer: {
                  text: ""
                }
            }
        });
            })
            .catch(err => { 
              const YDHP = new Discord.RichEmbed()
                .setColor('#ff0000')
                .setAuthor(client.user.username, client.user.displayAvatarURL)
                .setDescription(lg[language].hentai_not_find)
                .setFooter(lg[language].deleted_soon)

                return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
            });
          }
          }catch(err){
              const YDHP = new Discord.RichEmbed()
                .setColor('#ff0000')
                .setAuthor(client.user.username, client.user.displayAvatarURL)
                .setDescription(lg[language].hentai_not_find)
                .setFooter(lg[language].deleted_soon)

                return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
        }
            
        }
       else if(argsHentai.length == 3){
         for (var i = 0; i < parseInt(args[1]); i++) {
          var hentaiImg = kaori.search(args[2], { tags: [args[0]], limit: 1, random: true, score: parseInt(score) })
            .then(images => {
              return  message.channel.sendMessage({
              "embed": {
                color: 0xffdb00,
                title: args[2] + ' - Score [' + images[0].score + ']',
                url: images[0].common.fileURL,
                "image": {
                "url": images[0].common.fileURL,
                },
                footer: {
                  text: ""
                }
            }
        });
            })
            .catch(err => console.log(err));
          }
        }
      
    }else if(serverData[message.guild.id].nsfw == false){
      const YDHP = new Discord.RichEmbed()
      .setColor('#ff0000')
      .setAuthor(client.user.username, client.user.displayAvatarURL)
      .setDescription(lg[language].hentai_active_nsfw)
      .setFooter(lg[language].deleted_soon)
  
      return message.channel.send(YDHP).then(msg => {msg.delete(35000)});
    }
    }
  }catch(err){
    const YDHP = new Discord.RichEmbed()
      .setColor('#ff0000')
      .setAuthor(client.user.username, client.user.displayAvatarURL)
      .setDescription(lg[language].error)
      .setFooter(lg[language].deleted_soon)
  
      message.channel.send(YDHP).then(msg => {msg.delete(35000)});
  }
}