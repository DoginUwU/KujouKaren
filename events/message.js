let serverList = ['524341449500917760', '558417263913336832']

let ft = false;

module.exports = async (client, message) => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return console.log(`DM: ${message.author.id}: ${message.content}`);
  
    if(ft == false){
      for(var i = 0; i < serverList.length; i++){
        if(message.guild.id == serverList[i]) {
          console.log(`"${message.guild.name}" - ${message.author.username}: ${message.content}`);
        }
      }
    }else{
      console.log(`"${message.guild.name}" - ${message.author.username}: ${message.content}`);
    }
}