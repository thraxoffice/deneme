const Discord = require('discord.js');
const db = require('quick.db');

const moment = require('moment');
require('moment-duration-format');
exports.run = async (client, message, args) => {  
   var olcum = await message.channel.send( ' Ölçüm yapılıyor, lütfen bekleyiniz.').then(msg => msg.delete({ timeout: 1500 }))
 var olcum2 = await message.channel.send( ' Ölçüm yapılıyor, lütfen bekleyiniz..').then(msg => msg.delete({ timeout: 1500 }))
 var olcum3 = await message.channel.send( ' Ölçüm yapılıyor, lütfen bekleyiniz...').then(msg => msg.delete({ timeout: 1500 }))
     const ping = new Discord.MessageEmbed()
     .setColor("#ff4400")
     .setDescription(`Tepki gecikmesi, **${Math.round((olcum2.createdTimestamp - olcum.createdTimestamp - client.ws.ping) )}**ms\nBot gecikmesi, **${Math.round(client.ws.ping)}\**ms`)
   await message.channel.send(ping);
  
  
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ping',
  description: 'Botun pingini gösterir',
  usage: ''
};