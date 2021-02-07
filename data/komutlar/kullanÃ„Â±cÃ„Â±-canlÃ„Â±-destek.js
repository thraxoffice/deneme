const Discord = require("discord.js")
exports.run = async(client, message, args) => {
  
  
const emoji1 = message.client.emojis.cache.get('☎️');
const emoji2 = message.client.emojis.cache.get('☎️');
const emoji3 = message.client.emojis.cache.get('☎️');
const emoji4 = message.client.emojis.cache.get('☎️');
const emoji5 = message.client.emojis.cache.get('☎️');
const emoji6 = message.client.emojis.cache.get('☎️');
const emoji7 = message.client.emojis.cache.get('☎️');
      let isEnabled;
      message.reply("Canlı Destek Komutunu Kullandığınız İçin Teşekkürler. Birazdan Yetkili Ekibimiz sizinle ilgilenicektir.");
      let mesaj = args.slice(0).join(' ');
      let chan = message.channel;
      let destekKanal = "798479107381002260";
      const embed = new Discord.MessageEmbed()
        .addField('Uyarı', `📞 Canlı Destek Çağrısı`)
        .setAuthor(`${message.author.tag} (${message.author.id})`, `${message.author.avatarURL()}`)
        .setColor("#ff4400")
        .addField(`Bilgiler`, `**Sunucu**: ${message.guild.name} (${message.guild.id}) \n**Kanal**: ${message.channel.name} (${message.channel.id}) \n**Destek İsteyen**: ${message.author.tag} (${message.author.id}) \n**Destek Mesajı**: ${mesaj}`)
        .setFooter("Canlı Destek")
        .setTimestamp()
      client.channels.cache.get(destekKanal).send({
        embed: embed
      });

    const collector = client.channels.cache.get(destekKanal).createMessageCollector(message => message.content.startsWith(''), {
      timeout: 1
    })
    client.channels.cache.get(destekKanal).send('☎️ Destek çagrısı bağlanmak için `katıl` yazınız. İptal Etmek İçin `kapat` yazınız.')
    collector.on('message', (message) => {
      if (message.content === 'kapat') collector.stop('aborted')
      if (message.content === 'katıl') collector.stop('success')
    })
    collector.on('end', (collected, reason) => {
      if (reason === 'time') return message.reply('☎️ Çagrı zaman aşımına uğradı.')
      if (reason === 'aborted') {
        message.reply('Çağrı reddedildi.')
        client.channels.cache.get(destekKanal).send('☎️ Başarıyla çağrı reddedildi.')
      }
      if (reason === 'success') {
        client.channels.cache.get(destekKanal).send('☎️ Destek çagrısı alındı!')
        client.channels.cache.get(destekKanal).send('☎️ Destek çağrısını kapatmak için `kapat` yazınız.')
        chan.send(`${message.author}`)
        chan.send('Çağrınız bir destek yetkili tarafından alındı!')
        chan.send('En Yakın Zamanda Size Yardımcı Olacagız.')
        chan.send('Destek çagrısı kapatmak için `kapat` yazınız.')
        isEnabled = true

      client.on('message', message => {
          function contact() {
            if (isEnabled === false) return
            if (message.author.id === client.user.id) return
            if (message.content.startsWith('kapat')) {
              message.channel.send('☎️ Çağrı Kapatıldı.')
              if (message.channel.id === chan.id) client.channels.cache.get(destekKanal).send('☎️ Çağrı karşı taraftan kapatıldı.')
              if (message.channel.id === destekKanal) chan.send('☎️ Çağrı karşı taraftan kapatıldı.')
              return isEnabled = false
            }
            if (message.channel.id === chan.id) client.channels.cache.get(destekKanal).send(`📞 **${message.author.tag}**: ${message.content}`)
            if (message.channel.id === destekKanal) chan.send(`📞 **${message.author.tag}**: ${message.content}`)
          }
          contact(client)
        })
      }
    })
}
  exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'canlı-destek',
  description: 'Canlı Destek Tablebi Oluşturur.',
  usage: 'canlı-destek'
};