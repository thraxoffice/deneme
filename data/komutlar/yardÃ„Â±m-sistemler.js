const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

var prefix = ayarlar.prefix;

module.exports.run = async (client, message, args) => {
  let sayfalar = [
    `
  > **🎟️ • Guard hp Bilet Sistemi**
  
  > 🎟️ [${prefix}bilet aç](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot)
  > **• Bilet kanalı açarsınız.**
  > 🎟️ [${prefix}bilet kapat](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot)
  > **• Bilet kanalını kapatırsınız.**
  > 🎟️ [${prefix}bilet ekle](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot)
  > **• Bilet kanalına birini eklersiniz.**
  > 🎟️ [${prefix}bilet gönder](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot)
  > **• Bilet kanalına bilet gönderir.**
  > 🎟️ [${prefix}bilet-kanal ayarla #kanal](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot)
  > **• Bilet kanalını ayarlar.**
  
  > \<a:emoji_77:807389727396724786> [${prefix}otocevap ekle <cevaplanacakmesaj> | <cevap>](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot) 
  > **• Otocevap eklersiniz. "Örnek: sa | Aleyküm Selam Hoşgeldin" şeklinde ekleyebilirsiniz.**
  > \<a:emoji_77:807389727396724786> [${prefix}otocevap sil <otocevap> ](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot) 
  > **• Otocevap silersiniz. "Örnek: otocevap sil sa" şeklinde silebilirsiniz.**
  > \<a:emoji_77:807389727396724786> [${prefix}otocevap liste](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot) 
  > **• Otocevapa eklediğiniz mesajları listeler.**
  > \<a:emoji_77:807389727396724786> [${prefix}otocevap düzenle <otocevap>](https://discord.com/api/oauth2/authorize?client_id=805470573454688266&permissions=8&scope=bot) 
  > **• Otocevap düzenlersiniz. "Örnek: otocevap düzenle Sa | Aleyküm Selam Hoşgeldin"**
  
  > \<a:emoji_64:802991211769888808> •\`\Diğer Sistemlere Gitmek İçin Emojiye\`\ \<a:emoji_56:802990124299714591> \`\Tıklayın\`\ `
  ];
  let page = 1;

  const embed = new Discord.MessageEmbed()
    .setTitle("Guard hp Ayarlanabilir Sistemler")
    .setColor("#084e0d")
    .setFooter(`Sayfa ${page} - ${sayfalar.length}`)
    .setDescription(sayfalar[page - 1])
    .setTimestamp()
    .setImage(
      "https://cdn.discordapp.com/attachments/802226619891843103/805180094733746266/standard.gif"
    );
  message.channel.send(embed).then(msg => {
    msg.react("802991211769888808").then(r => {
      msg.react("802990124299714591");

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
        embed.setTitle("Guard hp Ayarlanabilir Sistemler");
        embed.setDescription(sayfalar[page - 1]);
        embed.setFooter(`Sayfa ${page} - ${sayfalar.length}`);
        embed.setColor("#084e0d");
        embed.setTimestamp();
        embed.setImage(
          "https://cdn.discordapp.com/attachments/802226619891843103/805180094733746266/standard.gif"
        );
        msg.edit(embed);
      });

      forwards.on("collect", r => {
        if (page === sayfalar.length) return;
        page++;
        embed.setTitle("Guard hp Ayarlanabilir Sistemler");
        embed.setDescription(sayfalar[page - 1]);
        embed.setFooter(`Sayfa ${page} - ${sayfalar.length}`);
        embed.setColor("#084e0d");
        embed.setTimestamp();
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
  aliases: ["sistemler", "sistem"],
  permLevel: 0
};

module.exports.help = {
  name: "yardım-sistemler",
  description: "Bütün sistem komutlarını gösterir.",
  usage: "sistemler"
};
