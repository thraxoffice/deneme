const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("quick.db");

var prefix = ayarlar.prefix;

module.exports.run = async (client, message, args) => {
  const modlog = await db.fetch(`modlogkanaly_${message.guild.id}`);
  const prefixx = await db.fetch(`prefix_${message.guild.id}`);
  const reklam = await db.fetch(`reklamengl_${message.guild.id}`);
  const küfür = await db.fetch(`küfürengl_${message.guild.id}`);
  const otocevapyazi = await db.fetch(`${message.guild.id}.otocevap.yazılar`);
  const otocevapcevap = await db.fetch(`${message.guild.id}.otocevap.cevaplar`);
  const capslock = await db.fetch(`capslockengl_${message.guild.id}`);
  const otorol = await db.fetch(`autoRole_${message.guild.id}`);
  const otorolkanal = await db.fetch(`autoRoleChannel_${message.guild.id}`);
  const sayac = await db.fetch(`sayac_${message.guild.id}`);
  const sayacK = await db.fetch(`sayacK_${message.guild.id}`);
  const girişçıkış = await db.fetch(`gçkanal_${message.guild.id}`);
  const güvenlik = await db.fetch(`güvenlik.${message.guild.id}`);

  let sayfalar = [
    `
> Sunucu Ayarları  
  
> **Prefix-Sistemi**: ${
      prefixx ? "✅ **``| Ayarlandı``**" : "❌ **``| Ayarlanmadı``**"
    }
> **Mod-Log-Sistemi**: ${
      modlog ? "✅ **``| Ayarlandı``**" : "❌ **``| Ayarlanmadı``**"
    }
> **Otocevap-Sistemi**: ${
      otocevapyazi + otocevapcevap
        ? "✅ **``| Ayarlandı``**"
        : "❌ **``| Ayarlanmadı``**"
    }
> **Güvenlik-Sistemi**: ${
      güvenlik ? "✅ **``| Ayarlandı``" : "❌ **``| Ayarlanmadı``**"
    }
> **Capslock-Engelle: ${
      capslock ? "✅ **``| Ayarlandı``**" : "❌ **``| Ayarlanmadı``**"
    }

> \<a:emoji_64:802991211769888808> •\`\Sunucu Ayarları Devamı İçin Emojiye\`\ \<a:emoji_56:802990124299714591> \`\Tıklayın\`\ `,
    `
> **Reklam-Engelle**: ${
      reklam ? "✅ **``| Ayarlandı``**" : "❌ **``| Ayarlanmadı``**"
    }
> **Küfür-Engelle**: ${
      küfür ? "✅ **``| Ayarlandı``**" : "❌ **``| Ayarlanmadı``**"
    }
> **Sayaç-Sistemi**: ${
      sayac + sayacK ? "✅ **``| Ayarlandı``**" : "❌ **``| Ayarlanmadı``**"
    }
> **Otorol-Sistemi**: ${
      otorol + otorolkanal
        ? "✅ **``| Ayarlandı``**"
        : "❌ **``| Ayarlanmadı``**"
    }
> **Giriş-Çıkış-Sistemi**: ${
      girişçıkış ? "✅ **``| Ayarlandı``**" : "❌ **``| Ayarlanmadı``**"
    }

> \<a:emoji_64:802991211769888808> •\`\Geri Dönmek İçin Emojiye\`\ \<a:emoji_56:802990124299714591> \`\Tıklayın\`\ `
  ];
  let page = 1;

  const embed = new Discord.MessageEmbed()
    .setTitle("Guard hp Sunucu Ayarlar Sistemi")
    .setColor("#501c67")
    .setFooter(`Sayfa ${page} - ${sayfalar.length}`)
    .setDescription(sayfalar[page - 1]);

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
        embed.setTitle("Guard hp Sunucu Ayarlar Sistemi");
        embed.setDescription(sayfalar[page - 1]);
        embed.setFooter(`Sayfa ${page} - ${sayfalar.length}`);
        embed.setColor("#501c67");
        msg.edit(embed);
      });

      forwards.on("collect", r => {
        if (page === sayfalar.length) return;
        page++;
        embed.setTitle("Guard hp Sunucu Ayarlar Sistemi");
        embed.setDescription(sayfalar[page - 1]);
        embed.setFooter(`Sayfa ${page} - ${sayfalar.length}`);
        embed.setColor("#501c67");
        msg.edit(embed);
      });
    });
  });
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [
    "ayarlar-sistemi",
    "ayarlar listesi",
    "ayarlar menüsü",
    "ayarlar-listesi"
  ],
  permLevel: 0
};

module.exports.help = {
  name: "ayarlar",
  description: "Sunucu ayarlarını gösterir.",
  usage: "ayarlar"
};
