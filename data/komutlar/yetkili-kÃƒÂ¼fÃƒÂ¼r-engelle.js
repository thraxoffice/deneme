const db = require('quick.db')
const Discord = require('discord.js')
const ayarlar = require("../ayarlar.json");
const client = new Discord.Client()
client.emojis.cache.get('784518934711762976');
client.emojis.cache.get('784518943423463484');

var prefix = ayarlar.prefix;
exports.run = async (bot, message, args) => {  
  if (!args[0]) return message.channel.send(`<a:XTik:798277028050501642> Bu komutu kullanmak için aç yada kapat yazmalısın Örnek: ${prefix}küfür-engelle aç / kapat!`)
  if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('<a:XTik:798277028050501642> `ÜYELERİ_YASAKLA` yetkisine sahip olmalısın!')
  
  if (args[0] == 'aç') {
    var replace = await db.set(`küfürengl_${message.guild.id}`, 'acik')
      const küfürac = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription('<a:tik1:798276995011051530> Küfür Engelleme sistemi başarıyla Açıldı `Üyeleri Yasakla` yetkisi olan kişileri engellemeyeceğim.')
      message.channel.send(küfürac);
    }
  
  if (args[0] == 'kapat') {
    var replace = await db.set (`küfürengl_${message.guild.id}`, 'kapali')
      const küfürkapat = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription('<a:tik1:798276995011051530> Küfür Engelleme sistemi kapatıldı. Sunucuda küfür etmek serbest!')
      message.channel.send(küfürkapat);
    }
  

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'küfür-engelle',
  description: '[Admin Komutu]',
  usage: 'küfür-engelle'
};