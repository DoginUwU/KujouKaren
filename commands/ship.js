const Discord = require('discord.js')
const Canvas = require("canvas");
const snekfetch = require("node-superfetch");
const Config = require('../config.json')
const DC = Config.DC;

const lg = require('../storage/language.json');

exports.run = (client, message, args, language) => {
  let user_one = message.mentions.users.first();
  let user_two_t = args[1];
  let user_two = client.users.find(user => user == user_two_t);
  
  console.log(user_two_t.user);
  
  if(args[0] != "" && args[1] != ""){
    DrawShip();
  }else{
    const YDHP = new Discord.RichEmbed()
      .setColor('#ff0000')
      .setAuthor(client.user.username, client.user.displayAvatarURL)
      .setDescription(lg[language].error)
      .setFooter(lg[language].deleted_soon)
  
      message.channel.send(YDHP).then(msg => {msg.delete(35000)});
  }
  
  async function DrawShip(){
    try{
      const canvas = Canvas.createCanvas(1200, 505);
      const ctx = canvas.getContext('2d');

      var panelIMG = "https://www.mediafire.com/convkey/73e4/988x283nbvs50ydzg.jpg";

      const { body: a } = await snekfetch.get(panelIMG);
      const panel = await Canvas.loadImage(a);

      const { body: b } = await snekfetch.get(user_one.avatarURL);
      const user1 = await Canvas.loadImage(b);

      const { body: c } = await snekfetch.get(user_two.avatarURL);
      const user2 = await Canvas.loadImage(c);

      ctx.drawImage(panel, 0, 0, 1200, 505); 
      ctx.drawImage(user1, 65, 70, 366, 370);
      ctx.drawImage(user2, 772, 70, 366, 370);

      var randomInt = Math.floor(Math.random() * 101);

      var user1_lenght = user_one.username.toString().length;
      var count1 = Math.floor(user1_lenght / 2);
      var user2_lenght = user_two.username.toString().length;
      var count2 = Math.floor(user2_lenght / 2);

      var name = "";

      for(var i = 0; i <= count1; i++){

        if(i == count1){

        }else{
          name += user_one.username.toString().charAt(i);
        }
      }

       for(var i = 0; i <= count2; i++){

            if(i == count2){

            }else{
              name += user_two.username.toString().charAt(i);
            }
        }

      name = name.toString().replace(" ", "");


      if(randomInt < 31 && randomInt > 10){
         message.channel.send(`${lg[language].ship_1} \`${name}\``);
      }
      if(randomInt < 10 && randomInt > -1){
         message.channel.send(`${lg[language].ship_2}  \`${name}\``);
      }

      if(randomInt < 50 && randomInt > 30){
         message.channel.send(`${lg[language].ship_3}  \`${name}\``);
      }
      if(randomInt < 80 && randomInt > 50){
         message.channel.send(`${lg[language].ship_4}  \`${name}\``);
      }

      if(randomInt < 100 && randomInt > 80){
         message.channel.send(`${lg[language].ship_5}  \`${name}\``);
      }

      if(randomInt == 100){
         message.channel.send(`${lg[language].ship_6} \`${name}\``);
      }

      if(randomInt > 99) {
        ctx.font = "72px Consolas";
        ctx.fillStyle = "#FFF";
        ctx.fillText(`${randomInt}%`, 515, 270);
      }
      else if(randomInt > 9) {
        ctx.font = "85px Consolas";
        ctx.fillStyle = "#FFF";
        ctx.fillText(`${randomInt}%`, 515, 270);
      }
      else if(randomInt < 10) {
        ctx.font = "85px Consolas";
        ctx.fillStyle = "#FFF";
        ctx.fillText(`${randomInt}%`, 545, 270);
      }
      const attach = new Discord.Attachment(canvas.toBuffer(), 'ship.png');

      message.channel.send(attach);
    }catch(err){
      const YDHP = new Discord.RichEmbed()
      .setColor('#ff0000')
      .setAuthor(client.user.username, client.user.displayAvatarURL)
      .setDescription(lg[language].error)
      .setFooter(lg[language].deleted_soon)
  
      message.channel.send(YDHP).then(msg => {msg.delete(35000)});
    }
  }
}