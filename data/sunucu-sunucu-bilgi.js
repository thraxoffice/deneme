const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');
const moment = require('moment');
const client = new Discord.Client();
exports.run = (bot, message, params) => { 
  const filterLevels = ['Yok', 'Rolü Olmayanlar İçin', 'Herkes İçin']
       const tarih =  message.guild.createdAt

let kur = {
			"01": "Ocak",
			"02": "Şubat",
			"03": "Mart",
			"04": "Nisan",
			"05": "Mayıs",
			"06": "Haziran",
			"07": "Temmuz",
			"08": "Ağustos",
			"09": "Eylül",
			"10": "Ekim",
			"11": "Kasım",
			"12": "Aralık"
    }

   const embed = new Discord.MessageEmbed()
   .setColor("#ff4400")
   .setAuthor(message.guild.name)
   .setThumbnail(message.guild.iconURL,)
      .addField('• Ad ve ID', `📝 ${message.guild.name + ', '+ message.guild.id}`, false)
   		.addField('• Kanallar', `:small_orange_diamond:Toplam: ${message.guild.channels.cache.size} | :keyboard: Yazı: ${message.guild.channels.cache.filter(c => c.type === "text").size} | Sesli ${message.guild.channels.cache.filter(c => c.type === "voice").size}`, false)
      .addField('• Üyeler', `:bust_in_silhouette: Üye: ${message.guild.memberCount} | :thumbsup: Çevrimiçi: ${message.guild.members.cache.filter(m => m.user.presence.status != "offline").size}`, false)
			.addField('• Roller', `:lock: ${message.guild.roles.cache.size}`,false)
   		.addField('• Rol Listesi', message.guild.roles.cache.map(roles => `\`${roles.name}\``).join(' '))
			.addField('• Sakıncalı içerik filtresi', `:underage: ${filterLevels[message.guild.explicitContentFilter]}`,false)
      .addField('• Bölge', message.guild.region.replace(':map: europe',':map: Avrupa'), false)
      .addField('• Oluşturulma Tarihi',` ${moment(message.guild.createdAt).format('DD')} ${kur[moment(message.guild.createdAt).format('MM')]} ${moment(message.guild.createdAt).format('YYYY h:mm:ss')}`, false)
      .addField('• Sunucu Sahibi', `:shield: <@${message.guild.owner.user+''}>`,false)
   .setTimestamp()
   message.channel.send(embed);
 };
 exports.conf = {
   enabled: true,
   guildOnly: false,
   aliases: ['sunucu-bilgi'],
   permLevel: 0
 };

 exports.help = {
   name: 'sunucu-bilgi',
   description: 'Kullanılan Yerdeki Sunucu Bilgilerini Gösterir.',
   usage: 'sunucu-bilgi'
 };