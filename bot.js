const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);


//Implements.
const Discord = require('discord.js');
const Config = require('./config.json');
var file = require('file-system');
let playerData = require('./storage/playerData.json');
var background = JSON.parse(file.readFileSync("./storage/background.json", "utf8"));
let serverData = require('./storage/serverData.json');
const lg = require('./storage/language.json');
const bot_config = require('./storage/bot.json');
const votes = require('./storage/votes.json');
var file = require('file-system');
const pack = require('./package.json');
const DC = Config.DC;
const { readdirSync } = require('fs')
var fs = require('fs');
var spotify_id = [];
var spotify_name = [];
var spotify_id_server = [];
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

//Regions.
let Region = {
        "brazil": "pt-br",
        "eu-central": "en",
        "singapore": "en",
        "us-central": "en",
        "sydney": "en",
        "us-east": "en",
        "us-south": "en",
        "us-west": "en",
        "eu-west": "en",
        "vip-us-east": "en",
        "london": "en",
        "amsterdam": "en",
        "hongkong": "en",
        "russia": "en",
        "southafrica": "en"
    };

setInterval(function(){
  client.guilds.forEach(guild => {
    try{
  if(serverData[guild.id] != null){
  if(serverData[guild.id].track != ""){
    //console.log(guild.id);
     const joinChannel = guild.channels.find(x => x.name === serverData[guild.id].track);
     //joinChannel.send("a");
    var onlineMembers = guild.members.filter(member => member.presence.game != null && member.presence.game.name == "Spotify");
      
    onlineMembers.forEach((member, key) => {
      var activity = member.presence.game;
      var img = `https://i.scdn.co/image/${activity.assets.largeImage.slice(8)}`
      var url = `https://open.spotify.com/track/${activity.syncID}`;
      var music = activity.details;
      var authors = activity.state; 
      
      for(var i = 0; i <= spotify_id.length; i++){
        if(spotify_id[i] == member.user.id && i < spotify_id.length){
           if(spotify_name[i] == music && spotify_id_server[i] == guild.id){
              return;
            }else{
              spotify_name[i] = music;
            }
        }else if(i == spotify_id.length && spotify_id[i] != member.user.id){
          spotify_id.push(member.user.id);
          spotify_name.push(music);  
          spotify_id_server.push(guild.id);  
           let Spotify = new Discord.RichEmbed()
          .setColor("#00bd06")
          .setAuthor("Spotify", "https://www.magneticmag.com/.image/t_share/MTY1MTczMzk2MzUzNTkwNTg0/spotify_icon_cmyk_green.png")
          .addField(lg[serverData[guild.id].language].listening_now, `[${music}](${url})`)
          .addField(lg[serverData[guild.id].language].spo_author, activity.state)
          .addField(lg[serverData[guild.id].language].spo_user, member.user.username)
          .setThumbnail(img)
          //spotify.push({id: "1", music: "a"});


          joinChannel.send(Spotify);
          return;
        }
      }
      
      

      let Spotify = new Discord.RichEmbed()
      .setColor("#00bd06")
      .setAuthor("Spotify", "https://www.magneticmag.com/.image/t_share/MTY1MTczMzk2MzUzNTkwNTg0/spotify_icon_cmyk_green.png")
      .addField(lg["en"].listening_now, `[${music}](${url})`)
      .addField(lg["en"].spo_author, activity.state)
      .addField("User", member.user.username)
      .setThumbnail(img)
      //spotify.push({id: "1", music: "a"});
      
      
      joinChannel.send(Spotify);
    });
  }
    }
  }catch(err){
    console.log("ERROR: *SPOTIFY TRACK* " + err);
  }
    });
    
}, 1200);


//When the bot enters a guild.
client.on("guildCreate", guild => {
  
    console.log(`The bot entered the server: ${guild.name} (id: ${guild.id}). Population: ${guild.memberCount} members!`);
  
    client.user.setActivity(`${client.users.size} Users!`, { type: 'LISTENING' });
      fs.writeFile("./storage/serverData.json", JSON.stringify(serverData), (err) => {
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
          "goodbye2": "",
          "color": "#ffdb00",
          "track": "",
          "ads": true
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
  
    if(message.content == "kek" && message.author.bot){
      return message.channel.send("Kek é teu cu, arrombado >:v");
    }
  if(message.content == "rawr" && message.author.bot && message.author.id === "729785275521433641"){
      return message.channel.send("Com certeza é o dogin");
    }
  
  console.log(message.content);
  if(message.content.includes(":HYPERAYAYA:") && !message.author.bot){
    message.channel.send("AYAYA!");
  }

  
    if(message.content == "kujou?" && !message.author.bot){
      message.channel.send("Sim?");
      try{
        message.channel.awaitMessages(response => response.content != "Sim?", {
            max: 2,
            time: 30000,
            errors: ['time'],
          }).then((collected) => {
          console.log(collected.first().content);
            /* 1 */ if(collected.first().content == "O'que você acha do zero?"){
              message.channel.send("O zero é uma vadia, puta, safada");
              try{
              message.channel.awaitMessages(response => response.content != "O zero é uma vadia, puta, safada", {
                  max: 2,
                  time: 30000,
                  errors: ['time'],
                }).then((collected) => {
                console.log(collected.first().content);
                  if(collected.first().content == "e do bot de osu?"){
                    message.channel.send("puta babaca, kek é teu cu");
                      try{
                        message.channel.awaitMessages(response => response.content != "puta babaca, kek é teu cu", {
                            max: 2,
                            time: 30000,
                            errors: ['time'],
                          }).then((collected) => {
                          console.log(collected.first().content);
                            if(collected.first().content == "concordo"){
                              message.channel.send("pse :v");
                              try{
                              message.channel.awaitMessages(response => response.content != "pse :v", {
                                  max: 2,
                                  time: 30000,
                                  errors: ['time'],
                                }).then((collected) => {
                                console.log(collected.first().content);
                                  if(collected.first().content == "pronto, bot 10/10"){
                                    message.channel.send("https://tenor.com/view/yesyesyesyesyes-jojo-gif-8822335");

                                  }
                              });
                            }catch(err){
                              console.log("a");
                              return undefined;
                            }
                            }
                        });
                      }catch(err){
                        console.log("a");
                        return undefined;
                      }
                  }
              });
            }catch(err){
              console.log("a");
              return undefined;
            }
            }
          
          if(collected.first().content == "bolo"){
              message.channel.send("BOLO :v");
          }
          if(collected.first().content == "O'que acha da baby?"){
              message.channel.send("Ela é muito legal >:3");
          }
          if(collected.first().content == "hentai"){
              message.channel.send("ADORO HENTAI >////////<");
          }
          if(collected.first().content == "jorge é legal?"){
              message.channel.send("Jorge é desumilder, não escuta musica com meu dono, parece o caiquer");
          }
          if(collected.first().content == "eu quero sair?"){
              message.channel.send("não quer, caralho");
          }
          if(collected.first().content == "puta"){
              message.channel.send("puta é o Figueiredo, aquele arrombado");
          }
          if(collected.first().content == "manda o zero calar a boca"){
              message.channel.send("Cala a boca zero");
          }
          if(collected.first().content == "manda o dogs calar a boca"){
              message.channel.send("Não 👍");
          }
          if(collected.first().content == "gosta de furry ou yaoi?"){
              message.channel.send("Furro é meu pau!");
          }
          if(collected.first().content == "vou jogar sa merda?"){
              message.channel.send("não 👍");
          }
          if(collected.first().content == "quero dar meu cu?"){
              message.channel.send("você sempre quer");
          }
          if(collected.first().content == "Ativar musicas"){
              message.channel.send("não");
          }
          if(collected.first().content == "to com fome"){
              message.channel.send("me comer é que você não vai");
              try{
                message.channel.awaitMessages(response => response.content != "me comer é que você não vai", {
                  max: 2,
                                  time: 30000,
                                  errors: ['time'],
                                }).then((collected) => {
                                console.log(collected.first().content);
                                  if(collected.first().content == "puta"){
                                    message.channel.send("sua vó");

                                  }
                              });
                            }catch(err){
                              console.log("a");
                              return undefined;
                            }
          }
        });
      }catch(err){
        console.log("a");
        return undefined;
      }
    }
        
  
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
          "goodbye2": "",
          "color": "#ffdb00",
          "track": "",
          "ads": true
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
       if(message.mentions.users.first().id == 160739354589921280){
         //return message.channel.send("Para de pingar meu dono, puta, cachorra 😡");
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
  
    //Bloquear
    /*if(message.guild.id == "524341449500917760" && message.content.toLowerCase() == "furry"){
        message.delete(1);
        console.log("deleted");
    }*/
  
  
  
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
        var color = serverData[message.guild.id].color;
      
        //Message
        var M = function() {
        let M = new Discord.RichEmbed()
        .setDescription("A")
        return message.channel.send(M);
        };
        

        commandFile.run(client, message, args, language, permission, DC, M);
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