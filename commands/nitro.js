const Discord = require('discord.js')

module.exports.run = async(client, message, args) => {
    message.delete();
    let pEmbed = new Discord.RichEmbed()
    .setThumbnail("https://cdn.discordapp.com/attachments/739208101663866952/746113017799901214/unknown.png")
    .setDescription("**You've been gifted a subscription**" +
    "\n\n **MeliodasGamers#5872** has gifted you Nitro Classic for 1 month! \n\n\n\n" + 
    "[<:1_:746111046065848375>](https://www.youtube.com/watch?v=tPJ5AJPJZqs&t=23s)[<:2_:746111045956927509>](https://www.youtube.com/watch?v=tPJ5AJPJZqs&t=23s)[<:3_:746111045768314881>](https://www.youtube.com/watch?v=tPJ5AJPJZqs&t=23s)[<:4_:746111046032556052>](https://www.youtube.com/watch?v=tPJ5AJPJZqs&t=23s)\n"+
    "[<:5_:746111045948407908>](https://www.youtube.com/watch?v=tPJ5AJPJZqs&t=23s)[<:6_:746111045654937672>](https://www.youtube.com/watch?v=tPJ5AJPJZqs&t=23s)[<:7_:746111045663457342>](https://www.youtube.com/watch?v=tPJ5AJPJZqs&t=23s)[<:8_:746111045952733304>](https://www.youtube.com/watch?v=tPJ5AJPJZqs&t=23s) [<:9_:746117591025844344>](https://www.youtube.com/watch?v=tPJ5AJPJZqs&t=23s) ** ** [<:9_:746117591025844344>](https://www.youtube.com/watch?v=tPJ5AJPJZqs&t=23s) [<:9_:746117591025844344>](https://www.youtube.com/watch?v=tPJ5AJPJZqs&t=23s) [<:9_:746117591025844344>](https://www.youtube.com/watch?v=tPJ5AJPJZqs&t=23s)[<:9_:746117591025844344>](https://www.youtube.com/watch?v=tPJ5AJPJZqs&t=23s)"+ 
    "Expires in 47 hours")
    message.channel.send(pEmbed);
}