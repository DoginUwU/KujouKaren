const Discord = require('discord.js');
const Config = require('../config.json')
const { readdirSync } = require('fs')

const bot = require('../storage/bot.json');
const Active = Config.Active;

module.exports = async (client) => {
  
  const evtfile = readdirSync('./events/')
  const cmdfile = readdirSync('./commands/')
  
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
  console.log(client.user.username + " " + "started successfully!")
  console.log(client.guilds.size + " " + "guilds.")
  console.log(client.users.size + " " + "users.")
  console.log(client.channels.size + " " + "channels.")
  console.log(cmdfile.length + " " + "commands.")
  console.log(evtfile.length + " " + "events.")
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
  
  if(bot["me"].maintence == true){
    client.user.setGame('dnd');
    client.user.setActivity("Maintenance.", { type: 'STREAMING', url: "https://www.twitch.tv/Alph4_Zer0" });
  }else{
    client.user.setGame('online');
    //client.user.setActivity(`${client.users.size} users!`, { type: 'WATCHING', url: "https://www.twitch.tv/Alph4_Zer0" });
    client.user.setActivity(`<3`, { type: 'WATCHING', url: "https://www.twitch.tv/Alph4_Zer0" });
  }
};