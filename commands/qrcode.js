const metarParser = require('aewx-metar-parser');
const Discord = require('discord.js')
const Config = require('../config.json')
const morsify = require('morsify');
const DC = Config.DC;
const fs = require('fs');
const lg = require('../storage/language.json');

var QRCode = require('qrcode')
 


exports.run = (client, message, args, language) => {
  var msg = "";
  
  fs.exists("./image/qrcode.png",function(exists){
    fs.unlink('./image/qrcode.png',function(err){
        if(err) return console.log(err);
          return console.log('File deleted');
    });
  });
    
  QRCode.toDataURL(args.toString().replace(/,/g, " "), function (err, url) {
    let base64Image = url.split(';base64,').pop();
    fs.writeFile('./image/qrcode.png', base64Image, {encoding: 'base64'}, function(err) {
      if(err) return console.log(err);
        console.log('File created');
    });
    const attachment = new Discord.Attachment('./image/qrcode.png', 'qrcode.png');
    /*let morse = new Discord.RichEmbed()
      .setColor(DC)
      .setAuthor(client.user.username, client.user.displayAvatarURL)
      .attachFile(attachment)
      .setThumbnail('attachment://sample.png');
    message.channel.send(morse).then(*/
      /*fs.unlink('./image/qrcode.png',function(err){
        if(err) return console.log(err);
          return console.log('File deleted');
      })  */
      
      message.channel.send({files: ["./image/qrcode.png"] })
    //);
    
    
  })
  
   
}