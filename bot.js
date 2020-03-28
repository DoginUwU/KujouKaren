const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

//Implements.
const Discord = require('discord.js');
const Config = require('./config.json');
var file = require('file-system');
let playerData = require('./storage/playerData.json');
var background = JSON.parse(file.readFileSync("./storage/background.json", "utf8"));
const serverData = JSON.parse(file.readFileSync("./storage/serverData.json", "utf8"));
const lg = require('./storage/language.json');
const bot_config = require('./storage/bot.json');
const votes = require('./storage/votes.json');
var file = require('file-system');
const pack = require('./package.json');
const DC = Config.DC;
const { readdirSync } = require('fs')
var fs = require('fs');
const client = new Discord.Client({
    autoReconnect: true,
    messageCacheMaxSize: 2024,
    fetchAllMembers: true,
    disabledEvents: ['typingStart', 'typingStop', 'guildMemberSpeaking'],
    messageCacheLifetime: 1680,
    disableEveryone: true,
    messageSweepInterval: 1680
});

const Active = Config.Active;

const Token = process.env.CLIENT_TOKEN;
const CID = process.env.CLIENT_ID;
const Manager_1 = process.env.CLIENT_MANAGER_1;
const Manager_2 = process.env.CLIENT_MANAGER_2;
const Owner_1 = process.env.CLIENT_OWNER_1;
const Owner_2 = process.env.CLIENT_OWNER_2;
const Owner_3 = process.env.CLIENT_OWNER_3;
var permission = false;

const DBL = require('dblapi.js');
const dbl = new DBL(process.env.bot_token, { webhookPort: 5000, webhookAuth: 'password' });

//When the bot enters a guild.
client.on("guildCreate", guild => {
  
    console.log(`The bot entered the server: ${guild.name} (id: ${guild.id}). Population: ${guild.memberCount} members!`);
  
    client.user.setActivity(`${client.users.size} Users!`, { type: 'LISTENING' });
      fs.writeFile("storage/serverData.json", JSON.stringify(serverData), (err) => {
        if(err) console.log(err)
      })
  
      if(!serverData[guild.id]){
        serverData[guild.id] = {
          "nsfw": false,
          "default_channel": "",
          "delm": false,
          "eco": false,
          "prefix": Config.Prefix,
          "links": true,
          "reactions": false,
          "admin": false,
          "music": false,
          "language": "en",
          "welcome": "",
          "welcome1": "",
          "welcome2": "",
          "goodbye": "",
          "goodbye1": "",
          "goodbye2": ""
        }
        fs.writeFile('./storage/serverData.json', JSON.stringify(serverData, null, 2), (err) => {
          if (err) console.log(err)
        })
      }
    });

//When the bot is removed from a guild.
client.on("guildDelete", guild => {
  
    console.log(`The bot has been removed from the server: ${guild.name} (id: ${guild.id})`);
  
    client.user.setActivity(`${client.users.size} Users!`, { type: 'LISTENING' });  
  
});

client.on('guildMemberAdd', (member) =>{
    let imgUser = member.user.avatarURL;
    if(serverData[member.guild.id]){
      if(serverData[member.guild.id].welcome != "" && serverData[member.guild.id].welcome1 != "" && serverData[member.guild.id].welcome2 != ""){
        try{
        const joinChannel = member.guild.channels.find(x => x.name === serverData[member.guild.id].welcome);
          let imageBot = member.user.avatarURL;
           
           let embedBot = new Discord.RichEmbed()
           .setColor(DC)
           .setAuthor(serverData[member.guild.id].welcome1)
           .setThumbnail(imageBot)
           .setDescription(`<@${member.user.id}> ${serverData[member.guild.id].welcome2}`)
           joinChannel.send(embedBot);
         }catch(err){}
      }
    }
});

client.on('guildMemberRemove', (member) =>{
    let imgUser = member.user.avatarURL;
    if(serverData[member.guild.id]){
      if(serverData[member.guild.id].goodbye != "" && serverData[member.guild.id].goodbye1 != "" && serverData[member.guild.id].goodbye2 != ""){
         try{
        const joinChannel = member.guild.channels.find(x => x.name === serverData[member.guild.id].goodbye);
          let imageBot = member.user.avatarURL;
           
           let embedBot = new Discord.RichEmbed()
           .setColor(DC)
           .setAuthor(serverData[member.guild.id].goodbye1)
           .setThumbnail(imageBot)
           .setDescription(`<@${member.user.id}> ${serverData[member.guild.id].goodbye2}`)
           joinChannel.send(embedBot);
         }catch(err){}
      }
    }
});

//When the bot is online
client.on("message", (message) => {
  
    if(message.channel.type == "dm") return;
    if (message.author.bot) return;
  if(serverData[message.guild.id]){
  var language = serverData[message.guild.id].language;
    }
  
   if(!serverData[message.guild.id]){
        serverData[message.guild.id] = {
          "nsfw": false,
          "default_channel": "",
          "delm": false,
          "eco": false,
          "prefix": Config.Prefix,
          "links": true,
          "reactions": false,
          "admin": false,
          "music": false,
          "language": "en",
          "welcome": "",
          "welcome1": "",
          "welcome2": "",
          "goodbye": "",
          "goodbye1": "",
          "goodbye2": ""
        }
        fs.writeFile('./storage/serverData.json', JSON.stringify(serverData, null, 2), (err) => {
          if (err) console.log(err)
        })
      }

  
    const Prefix = serverData[message.guild.id].prefix;
  
    var idPlayer = message.author.id + message.guild.id;
  
     if(!serverData[message.guild.id].prefix){
        serverData[message.guild.id].prefix = Config.Prefix;
        fs.writeFile('./storage/serverData.json', JSON.stringify(serverData, null, 2), (err) => {
          if (err) console.log(err)
        })
      }
  
  if(serverData[message.guild.id].eco == true){
  if(!background[idPlayer]){ 
    background[idPlayer] = {
      Default: true
    }
    fs.writeFile('./storage/background.json', JSON.stringify(background, null, 2), (err) => {
          if (err) console.log(err)
        })
  }
  }
  
    if(serverData[message.guild.id].eco == true){
    if(!playerData[idPlayer]){ 
        //console.log("good dia");
        playerData[idPlayer] = {
          nickname: "",
          birthday: "00/00/0000",
          description: "new person",
          gender: "null",
          married: "none",
          "background": "Default",
          "coins": 0,
          "xp": 0,
          "level": 1,
          "house_level": 1,
          "server": message.guild.id,
          "id": message.author.id
        }
        fs.writeFile('./storage/playerData.json', JSON.stringify(playerData, null, 2), (err) => {
          if (err) console.log(err)
        })
      }else{
        //console.log("good noite");
      }
    }
  
    //Saves the "Xp" collected by the user.
      if(serverData[message.guild.id].eco == true){
      let curxp = playerData[idPlayer].xp;
      let curlvl = playerData[idPlayer].level;
      let nxtlvl = playerData[idPlayer].level * 300;
  
      let dif = nxtlvl - curxp;
  
      //console.log(nxtlvl);  
      if(serverData[message.guild.id].eco == true){
        let xpAdd = Math.floor(Math.random() * 7) + 8;
        //console.log(`Added: "${xpAdd}" of xp for: "${message.author.id}"`)
      
  
      playerData[idPlayer].xp = curxp + xpAdd; 
      if(nxtlvl <= playerData[idPlayer].xp) {
        playerData[idPlayer].level = curlvl + 1;
        playerData[idPlayer].xp = 0 + xpAdd;
        function RandomM() {
          var rand = [63, 138, 250, 450, 625, 825, 952, 1250, 1450, 1654, 2000];
            return rand[Math.floor(Math.random()*rand.length)];
        }
        playerData[idPlayer].coins = playerData[idPlayer].coins += RandomM();
        
        let lvlup = new Discord.RichEmbed()
        .setColor(DC)
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setThumbnail(message.author.displayAvatarURL)
        .setDescription(`${lg[language].congratulations_2} <@${message.author.id}>. ${lg[language].level_up}\n${lg[language].new_level}: \`${playerData[idPlayer].level}\`\nㅤ`)
        .addField(lg[language].you_got, `${RandomM()} ${lg[language].coins}`)
        .setFooter(lg[language].deleted_soon)

        message.channel.send(lvlup).then(msg => {msg.delete(35000)});
        
        fs.writeFile('./storage/playerData.json', JSON.stringify(playerData, null, 2), (err) => {
          if (err) console.log(err)
        });
    } 
    //console.log(`${message.author.id}: Coins: ${playerData[message.author.id + message.guild.id].coins} - Exp: ${curxp} - Lvl: ${curlvl}`)
  
    //Collects all data and saves them.
   fs.writeFile('./storage/playerData.json', JSON.stringify(playerData, null, 2), (err) => {
          if (err) console.log(err)
        });
    }
  }
  
    var language = serverData[message.guild.id].language;
  
    
    
    //Bot with no prefix commands
     if(message.mentions.users.first()){
      if(message.mentions.users.first().id == 568539957703213077){
       const YDHP = new Discord.RichEmbed()
            .setColor(DC)
            .setAuthor(client.user.username, client.user.displayAvatarURL)
            .setDescription(lg[language].hello + " " + message.author + ". " + lg[language].my_prefix_is + " **" + Prefix + "**. " + lg[language].you_addme + " **" + `[${lg[language].click_here}](${Config.IL})` + "**.")
            .setFooter(`${client.user.username} ${pack.version}v - ${lg[language].new_commands_comming}`);
            return message.channel.send(YDHP);
      }
    }
  
   if(serverData[message.guild.id].links == false){
      if(message.content.includes("discord.gg/")){
        message.delete();
        message.channel.send("<:Exit:578967098613563393>" + " " + message.author + " " + lg[language].invitation_not).then(msg => {msg.delete(35000)});;
      }
    }
  if(serverData[message.guild.id].reactions == true){
    if (message.attachments.size > 0) {
      message.react('👍').then(() => message.react('👎')).catch(() => console.error('One of the emojis failed to react.'));
    }
  }
  
  //Vote system
  var date = new Date();
  try{
    dbl.hasVoted(message.author.id).then(voted => {
    if (voted){
        if(!votes[idPlayer]){
          votes[idPlayer] = {
            "voted": true,
            "date": date.getTime()
          }
          votes[idPlayer].voted = true;
          votes[idPlayer].date = date.getTime();
          playerData[idPlayer].coins += 5000;
          fs.writeFile('./storage/votes.json', JSON.stringify(votes, null, 2), (err) => {
          if (err){ console.log(err);}
            else{
              fs.writeFile('./storage/playerData.json', JSON.stringify(playerData, null, 2), (err) => {
                if (err){ console.log(err);}
                  else{
                    let Cong = new Discord.RichEmbed()
                      .setColor(DC)
                      .setAuthor(client.user.username, client.user.displayAvatarURL)
                      .setDescription(lg[language].congratulations)
                      .setFooter(lg[language].vote_ntx_day)
                    message.channel.send(Cong);
                  }
              })
            }
        })
        }else{
          var horas = (date.getTime() - votes[idPlayer].date) / 1000 / 60 / 60;
          if(horas >= 12){
            votes[idPlayer].voted = true;
            votes[idPlayer].date = date.getTime();
            playerData[idPlayer].coins += 5000;
            fs.writeFile('./storage/votes.json', JSON.stringify(votes, null, 2), (err) => {
            if (err){ console.log(err);}
              else{
                fs.writeFile('./storage/playerData.json', JSON.stringify(playerData, null, 2), (err) => {
                    if (err){ console.log(err);}
                    else{
                       let Congratulations = new Discord.RichEmbed()
                          .setColor(DC)
                          .setAuthor(client.user.username, client.user.displayAvatarURL)
                          .setDescription(lg[language].congratulations)
                          .setFooter(lg[language].vote_ntx_day)
                          message.channel.send(Congratulations);
                    }
                })
              }
          })
          }
        }
    }
    });
  }catch(err){
    
  }
  
  
  
    //Bot with no prefix commands
  
    //Bot with prefix commands
    if (!message.content.startsWith(Prefix)) return;
  
    let command = message.content.split(" ")[0].toLowerCase();
    command = command.slice(Prefix.length);

    let args = message.content.split(" ").slice(1);
  
    if(message.author.id == process.env.CLIENT_OWNER_1 || message.author.id == process.env.CLIENT_OWNER_2 || message.author.id == process.env.CLIENT_MANAGER_1 || message.author.id == process.env.CLIENT_MANAGER_2){
       permission = true;
    }else{
      permission = false;
    }
  
    if(serverData[message.guild.id].delm == 1){
       message.delete(1);
    }else{
      
    }

    try {
        if(bot_config["me"].maintence == true && command != "" && !permission){ 
          return message.channel.send(lg[language].maintence)
       }else if(bot_config["me"].maintence == true && command != "" && permission){
        //message.channel.send("`Alert: maintence mode is on...`"); 
       }
        //message.channel.startTyping()
        client.commands = new Discord.Collection();
        client.aliases = new Discord.Collection();
        let commandFile = require(`./commands/${command}.js`);
        commandFile.run(client, message, args, language, permission);
        //client.commands.set(commandFile.help.name, commandFile);
        //message.channel.stopTyping(true)
    } catch (err) {
        if (err.code == "MODULE_NOT_FOUND") {message.channel.stopTyping(); return;};
        console.error(err);
    }
    })  

    const evtFiles = readdirSync('./events/')
    console.log(`Loaded "${evtFiles.length}" events were uploaded`)
    evtFiles.forEach(f => {
    const eventName = f.split('.')[0]
    const event = require(`./events/${f}`)

    client.on(eventName, event.bind(null, client))
    })

    client.on('error', (err) => {
    console.log('error', err)
    })

//The bot needs this to get starts, then... do not remove this.
client.login(Token);    