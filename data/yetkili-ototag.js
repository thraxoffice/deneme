const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args, member) => {

      if (!message.guild) {
    const ozelmesajuyari = new Discord.RichEmbed()
    .setColor(0x2488E7)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('Sadece herhangi bir sunucudan mesaj gönderebilirim.:relaxed: ')
    return message.author.sendEmbed(ozelmesajuyari); }

     if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(':no_entry: Bu komudu kullanabilmek için `Sunucuyu Yönet` yetkisine sahip olmalısın!') 
     let mesaj = args.join(' ');
     if (!mesaj) return message.channel.send("<a:XTik:798277028050501642> Ototag ayarlamak için bir değer belirtmelisiniz.  `r_ototag || r_ `"); 
     if (message.channel.type === "dm") return;
     if (message.author.bot) return;
      await db.set(`ototag_${message.guild.id}`, mesaj)
      return message.channel.send(`Sunucunuz otomatik olarak verilecek tag \`${mesaj}\` olarak belirlenmiştir.`)

}



exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ototag',
  description: 'nblm',
  usage: 'ototag'
};
