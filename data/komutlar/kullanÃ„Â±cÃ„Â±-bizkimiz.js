const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("quick.db");

var prefix = ayarlar.prefix;

exports.run = (client, message, args) => {
  const kimizbiz = new Discord.MessageEmbed()
    .setColor("#ff4400")
    .setAuthor(`» Guard hp`, client.user.avatarURL({ dynamic: true }))
    .setDescription("» Guard hp Ekibi Biz Kimiz?")
    .setThumbnail(client.user.avatarURL({ dynamic: true }))
    .addField(
      `**» Biz Sizin İçin 7/24 Hizmet Veren Biriyiz. Sizler İçin Uğraşiyoruz Sunucunuzu Güzelleştirmek İçin Yeni Komutlar Ekliyoruz Botlarımızın Bilgileri İçin f!davet Yazarak Bulabilirsiniz.`
    )
    .setFooter(``, client.user.avatarURL({ dynamic: true }));
  message.channel.send(kimizbiz).catch();
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["bizkimiz"],
  permLevel: 0
};

exports.help = {
  name: "bizkimiz",
  category: "Bot",
  description: "Ekip Hakkında Bilgi Verir."
};
