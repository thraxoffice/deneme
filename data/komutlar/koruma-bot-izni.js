const Discord = require("discord.js");
const db = require("quick.db");
exports.run = (client, message, args) => {
  if (db.has(`antiraidK_${message.guild.id}`) === false) {
    return message.channel.send(
      new Discord.MessageEmbed().setDescription(
        "✅ Bot koruma sistemi açılmamış. Açmak için **bot-koruma aç**"
      )
    );
  }
  if (!args[1])
    return message.reply(
      new Discord.MessageEmbed().setDescription(
        "✅ Lütfen bir bot id si girin."
      )
    );

  if (isNaN(args[1])) {
    return message.channel.sed(
      new Discord.MessageEmbed()
        .setColor("#501c67")
        .setDescription("✅ Sadece bot id'si girin.")
    );
  }
  if (args[0] == "ver") {
    client.users.get(args[0]);
    db.set(`botizin_${message.guild.id}.${args[1]}`, "aktif");
    const verdik = new Discord.MessageEmbed()
      .setColor("#501c67")
      .setDescription("✅" + args[1] + "ID li bota izin verildi.");
    message.channel.send(verdik);
  }
  if (args[0] == "kaldır") {
    db.delete(`botizin_${message.guild.id}.${args[1]}`, "aktif");
    const kaldırdık = new Discord.MessageEmbed()
      .setDescription("#501c67")
      .setDescription("✅" + args[1] + "ID'li botun izni kaldırıldı.");
    message.channel.send(kaldırdık);
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["bot-izni"],
  permLevel: 0
};
exports.help = {
  name: "bot-izni"
};
