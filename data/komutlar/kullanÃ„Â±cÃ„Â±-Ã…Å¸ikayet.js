const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("quick.db");
const client = new Discord.Client();
client.emojis.cache.get("784518934711762976");
client.emojis.cache.get("784518943423463484");

var prefix = ayarlar.prefix;

exports.run = function(client, message, args) {
  let type = args.slice(0).join(" ");
  if (type.length < 1)
    return message.channel.send(
      new Discord.MessageEmbed().setDescription(
        `Kullanım: ${prefix}şikayet <Şikayet>`
      )
    );
  const embed = new Discord.MessageEmbed()
    .setColor("#ff4400")
    .setDescription(
      "✅ Şikayetiniz Başarıyla [DestekSunucum](https://discord.gg/3FvxATKfDk) da Bildirildi!"
    );
  message.channel.send(embed);
  const embed2 = new Discord.MessageEmbed()
    .setColor("#ff4400")
    .setDescription(
      `**${message.author.tag}** adlı kullanıcının Bot Hakkında Şikayeti:`
    )
    .addField(
      `Kulanıcı Bilgileri`,
      `Kullanıcı ID: ${message.author.id}\nKullanıcı Adı: ${message.author.username}\nKullanıcı Tagı: ${message.author.discriminator}`
    )
    .addField("Şikayet", type)
    .setThumbnail(message.author.avatarURL({ dynamic: true }));
  client.channels.cache.get("798479109415370752").send(embed2); // Kanal ID
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sikayet"],
  permLevel: 0
};
exports.help = {
  name: "şikayet",
  description: "Bot hakkında şikayet de bulunursunuz.",
  usage: "şikayet <Şikayet>"
};
