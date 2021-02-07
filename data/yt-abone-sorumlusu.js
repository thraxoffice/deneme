let database = require("quick.db")
let ayarlar = require("../ayarlar.json")



exports.run = async(client, message) => {
  if(!message.member.permissions.has('ADMINISTRATOR')) return message.reply('Bu komutu kullanmak için yetkin yetersiz')
  
  let rol = message.mentions.roles.first()
  if(!rol) return message.channel.send(`Abone Sorumlusu Rolünü Etiketleyerek Tekrar Dener Misin?`)
  
  
  database.set(`abonesorumlusu.${message.guild.id}`, rol.id)
  message.channel.send(`Abone Sorumlusunu ${rol} Olarak Ayarladım!`)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['abone-sorumlusu'],
  perm: 0
}
exports.help = {
  name: 'abone-sorumlusu'
}

exports.play = {
  kullanım: 'abone-sorumlusu @rol',
  açıklama: 'Abone Sorumlusu Rolünü Ayarlarsınız',
  kategori: 'Abone'
}