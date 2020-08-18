const Discord = require('discord.js');
const Config = require('../config.json')
const DC = Config.DC;
const fs = require('fs');
let playerData = require('../storage/playerData.json');
let marry = require('../storage/marry.json');
const serverData = require('../storage/serverData.json');

const lg = require('../storage/language.json');

exports.run = (client, message, args, language) => {
  var users = 0;
   /*if (message.author.id === "694503142167150623" || message.author.id === "160739354589921280"){
        message.channel.send(`Enviado com sucesso para ${client.users.size} membros!`)
        client.guilds.forEach(guild => {
        setTimeout(async() => {
        switch (guild.id) {
            case "721574952347762850":
                console.log("ignorando 1");
                break;
            case "681682730056286213":
                console.log("ignorando 2");
                break;
            case "733488659046727790":
                console.log("ignorando 3");
                break;
            case "726593155910074428":
                console.log("ignorando 4");
                break;
            case "605826317274972160":
                console.log("ignorando 5");
                break;
            default:
               try {
                 var ads = serverData[message.guild.id].ads || serverData[message.guild.id].ads == undefined || serverData[message.guild.id].ads == null;
                 if(ads && message.guild.region === "brazil"){
                    guild.members.forEach(async (user) => {
                      setTimeout(async() => {
                      var embed = new Discord.RichEmbed() 
                      .setAuthor(`Café da esquina ⭐`)
                      .setColor("#6603fc")
                      .setTimestamp(new(Date))
                      .setDescription("Olá, bem-vindo(a) na nossa Cafeteria! Um servidor voltado para o entretenimento e em fazer novas amizades.")
                      .addField("Entrar", `[Clique aqui](https://discord.gg/8hme9Sc)`)
                      .setThumbnail("https://cdn.discordapp.com/attachments/735891614261837825/735893586436030575/bem-vindo.png")
                      .setFooter(`Você pode desativar meus anuncios com o comando K!ads | sonho de valça grátis pra quem entrar (brincadeira)"`)
                      await user.send(embed);   
                      console.log(`Enviado para: ` + user.username);
                      }, 1000);
                    });
                 }
               } catch (error) {
                       console.log("pessoa ignorada!")
                   }
               
                break;
        }
        }, 1000);
    })
    }else{
        return message.reply("Você não tem permissão para executar esse comando!")
    }  */
}