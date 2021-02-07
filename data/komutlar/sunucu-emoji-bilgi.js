const Discord = require("discord.js");

exports.run = (client, message, args) => {
  let emojiname = args[0];
  const emoji = message.guild.emojis.cache.find(
    motion => motion.name === `${emojiname}`
  );
  if (!emojiname)
    return message.channel.send("Guard hp | **Emoji ismi yazmalısın!**");
  const motion = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setThumbnail(`${emoji.url}`)
    .addField("• Emojinin ismi", `${emojiname}`)
    .addField("• Emoji ID", `${emoji.id}`)
    .addField("• Link", `${emoji.url}`)
    .setTimestamp();
  message.channel.send(motion);
  console.log(motion);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["emoji-info"],
  permLevel: 0
};

exports.help = {
  name: "emoji-bilgi",
  description: "",
  usage: "emoji-info"
};
