const Discord = require("discord.js");
const db = require("quick.db");

exports.run = (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      'Bu komutu kullanabilmek için "**Yönetici**" yetkisine sahip olmalısın.'
    );
  let guild = message.guild;
  let link = args[0];
  let ad = args[1];
  if (!link)
    return message.channel.send(
      new Discord.MessageEmbed().setDescription(
        "✅ Bir emoji linki belirtmelisin."
      )
    );
  if (!ad)
    return message.channel.send(
      new Discord.MessageEmbed().setDescription("✅ Bir emoji ismi yazmalısın.")
    );

  guild.emojis
    .create(link, ad)
    .then(emoji =>
      message.channel.send(
        `✅ ${emoji.name} adında emoji oluşturuldu. (${emoji}`
      )
    );
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["hızlı-emoji", "emoji-ekle", "emojiekle", "hızlıemoji"],
  permLevel: 0
};

exports.help = {
  name: "emoji-ekle",
  description: "Hızlı emoji eklersiniz.",
  usage: "emoji-ekle"
};
