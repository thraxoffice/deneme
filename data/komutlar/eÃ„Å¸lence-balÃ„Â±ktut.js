const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require("../ayarlar.json");
const db = require("quick.db");

exports.run = async(client, message, args) => {  
  
   message.channel.send('Balık Tuttun Oltayı Sıkı Tut Balık Kaçmasın!').then(message => {
   var baliklar = ['``Sazan Tuttun!`` :fish:' ,'``Köpek Balığı Tuttun İyi Para Eder Sat Sat`` :D' ,'``Uskumru Tuttun!`` :fish:' ,'``Mezgit Tuttun! Havyarıda Var Hee`` :) :fish:' ,'``Japon Balığı Tuttun Yemeyi Düşünmüyorsun Herhalde?``' ,'``Hamsi Tuttun!`` :fish:' ,'``Levrek Tuttun!`` :fish:' ,'``Hiçbirşey Tutamadın Maalesef!`` :wastebasket:' ,'``Alabalık Tuttun!`` :fish:' ,'``Maalesef Balık Oltadan Kaçtı!`` :wastebasket:' ,'``İstavrit Tuttun!`` :fish:'];
      var balik = baliklar[Math.floor(Math.random() * baliklar.length)];
           const baliks = new Discord.MessageEmbed()
           .setColor("BLUE")
           .setDescription(`${balik}`)
           message.channel.send(baliks);
});  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['balık', 'balıktut', 'balık-tut'],
  permLevel: 0
};

exports.help = {
  name: 'balıktut',
  description: 'Balık Tutarsın.',
  usage: 'balıktut'
};
   