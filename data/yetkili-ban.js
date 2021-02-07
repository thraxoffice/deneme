const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      "✅ Bu Komutu Kullanabilmek İçin **YÖNETİCİ** Yetkisine Sahip Olman Gerek."
    );
  let banlimit = db.fetch(`onlycode.banlimit_${message.guild.id}`);
  let banlog = db.fetch(`onlycode.banlog_${message.guild.id}`);
  let bansayı = db.fetch(
    `onlycode.bansayı_${message.author.id}_${message.guild.id}`
  );

  if (!banlimit) return message.channel.send(`✅ Ban Limiti Ayarlanmamış.`);
  let kişi = message.mentions.users.first();
  if (!kişi)
    return message.channel.send(
      `✅ Yasaklayacağın  Kullanıcıyı Etiketlemelisin.`
    );
  let sebep = args.slice(1).join(``);
  if (!sebep) sebep = `Belirtilmemiş.`;
  if (bansayı >= banlimit)
    return message.channel.send(`✅ Yasaklama Limitine Ulaşmışsın.`);
  message.guild.member(kişi).ban(sebep);
  db.add(`onlycode.bansayı_${message.author.id}_${message.guild.id}`, 1);
  const embd = new Discord.MessageEmbed();
  embd.setDescription(
    `✅ ${message.author} Adlı Kullanıcı ${kişi} Adlı Kullanıcıyı **${sebep}** Sebebiyle Sunucudan Yasakladı.`
  );
  return message.channel.send(embd);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["yasakla", "ban"],
  permLevel: 0
};

exports.help = {
  name: "ban",
  description: "Üye yasaklarsınız.",
  usage: "ban @Kullanıcı [Sebep]"
};
