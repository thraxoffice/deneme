const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

var prefix = ayarlar.prefix;

module.exports.run = async (client, message, args) => {
  let sayfalar = [
    `
      > **\<a:emoji_66:805501864392917072> • Youtube Komutları**
      
      > \<a:emoji_66:805501864392917072> [${prefix}abone](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot)
      > **• Abone Rolu Verirsiniz.**
      > \<a:emoji_66:805501864392917072> [${prefix}abone-mesaj](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot) 
      > **• Abone Mesajinin Nereye Gitceğini Belirlersiniz.**
      > \<a:emoji_66:805501864392917072> [${prefix}abone-sorumlusu @rol](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot) 
      > **• Abone Sorumlusunun Rolunu Ayarlayabilirsin.**
      > \<a:emoji_66:805501864392917072> [${prefix}abone-rol @rol](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot)
      > **• Abone Rolunu Ayarlarsınız.**`
  ];
  let page = 1;

  const embed = new Discord.MessageEmbed()
    .setTitle("Guard hp Youtube Komutları")
    .setTitle("Guard hp Youtube Komutları")
    .setColor("#501c67")
    .setFooter(`Sayfa ${page} - ${sayfalar.length}`)
    .setDescription(sayfalar[page - 1])
    .setTimestamp()
    .setImage(
      "https://cdn.discordapp.com/attachments/802226619891843103/805180094733746266/standard.gif"
    );

  message.channel.send(embed).then(msg => {
    msg.react("797033410484109323").then(r => {
      msg.react("797033472274464779");

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
        embed.setTitle("Guard hp Sunucu Komutları");
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
        embed.setTitle("Guard hp Sunucu Komutları");
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
  aliases: ["yardım-youtube", "youtube"],
  permLevel: 0
};

module.exports.help = {
  name: "youtube",
  description: "Sunucu komutlarını gösterir.",
  usage: "youtube"
};
