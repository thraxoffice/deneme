let database = require("quick.db")
let ayarlar = require("../ayarlar.json")



exports.run = async(client, message) => {
  if(!message.member.permissions.has('ADMINISTRATOR')) return message.reply('Bu komutu kullanmak için yetkin yetersiz')
  
  let mesaj = message.mentions.channels.first()
  if(!mesaj) return message.channel.send(`Bir kanal etiketlemen gerekmekte örnek: ${ayarlar.prefix}abonemesaj #kanal`)
  
  
  database.set(`abonemesaj.${message.guild.id}`, mesaj.id)
  message.channel.send(`Abone kanalı başarıyla ${mesaj} olarak ayarlandı.`)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['abone-mesaj'],
  perm: 0
}
exports.help = {
  name: 'abone-mesaj'
}

exports.play = {
  kullanım: 'abone-mesaj #kanal',
  açıklama: 'Abone Logunu Ayarlarsınız',
  kategori: 'Abone'
}