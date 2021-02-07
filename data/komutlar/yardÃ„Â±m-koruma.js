const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

var prefix = ayarlar.prefix;

module.exports.run = async (client, message, args) => {
  let sayfalar = [
    `
      > **\<a:emoji_67:805502297353879603> • Koruma Komutları**
      
      > \<a:emoji_67:805502297353879603> [${prefix}rol-koruma](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot)
      > **• Sunucuda silinen rolleri geri yükler.**
      > \<a:emoji_67:805502297353879603> [${prefix}kanal-koruma](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot)
      > **• Sunucuda silinen kanalları geri yükler.**
      > \<a:emoji_67:805502297353879603> [${prefix}bot-koruma](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot)
      > **• Sunucuya giren botları banlar.**
      > \<a:emoji_67:805502297353879603> [${prefix}bot-izni](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot) 
      > **• Sunucuya giren botların banlanmaması için izin verirsiniz.**
      > \<a:emoji_67:805502297353879603> [${prefix}güvenlik](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot) 
      > **• Sunucuya giren kişiler güvenilir mi değil mi kontrol eder.**`
  ];
  let page = 1;

  const embed = new Discord.MessageEmbed()
    .setTitle("Guard hp Koruma Sistemi")
    .setColor("#501c67")
    .setFooter(`Sayfa ${page} - ${sayfalar.length}`)
    .setDescription(sayfalar[page - 1])
    .setTimestamp()
    .setImage(
      "https://cdn.discordapp.com/attachments/802226619891843103/805180094733746266/standard.gif"
    );

  message.channel.send(embed).then(msg => {
    msg.react("▶").then(r => {
      msg.react("◀");

      const backwardsFilter = (reaction, user) =>
        reaction.emoji.name === "sol" && user.id === message.author.id;
      const forwardsFilter = (reaction, user) =>
        reaction.emoji.name === "RainbowOkGif" && user.id === message.author.id;

      const backwards = msg.createReactionCollector(backwardsFilter, {
        time: 60000
      });
      const forwards = msg.createReactionCollector(forwardsFilter, {
        time: 60000
      });

      backwards.on("collect", r => {
        if (page === 1) return;
        page--;
        embed.setTitle("Guard hp Bot Koruma Sistemi");
        embed.setDescription(sayfalar[page - 1]);
        embed.setFooter(`Sayfa ${page} - ${sayfalar.length}`);
        embed.setColor("#501c67");
        embed.setTimestamp();
        embed.setImage(
          "https://cdn.discordapp.com/attachments/802226619891843103/805180094733746266/standard.gif"
        );
        msg.edit(embed);
      });

      forwards.on("collect", r => {
        if (page === sayfalar.length) return;
        page++;
        embed.setTitle("Guard hp Bot Koruma Sistemi");
        embed.setDescription(sayfalar[page - 1]);
        embed.setFooter(`Sayfa ${page} - ${sayfalar.length}`);
        embed.setTimestamp();
        embed.setColor("#501c67");
        embed.setImage(
          "https://cdn.discordapp.com/attachments/802226619891843103/805180094733746266/standard.gif"
        );
        msg.edit(embed);
      });
    });
  });
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [
    "koruma-sistemi",
    "koruma listesi",
    "koruma menüsü",
    "koruma-listesi"
  ],
  permLevel: 0
};

module.exports.help = {
  name: "koruma",
  description: "Koruma sistemi komutlarını gösterir.",
  usage: "koruma"
};
