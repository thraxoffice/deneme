const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");
exports.run = (client, message, args) => {
  let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix; //! yerine kendi prefixini yaz!
  let yazılar = db.fetch(`${message.guild.id}.otocevap.yazılar`);
  let cevaplar = db.fetch(`${message.guild.id}.otocevap.cevaplar`);
  let footer = db.fetch("footer");
  let efemm = args.slice(1).join(" ");
  let efemmm = args.slice(2).join(" ");
  let bilmefe = efemm.split(" | ");
  let bilmefee = efemmm.split(" | ");
  let ifefe = message.content.includes(" | ");
  var ekle = ["ekle", "+", "add"];
  var sil = ["sil", "-", "remove", "delete", "rm"];
  var list = ["liste", "list"];
  var edit = ["edit", "düzenle"];
  if (list.includes(args[0])) {
    var efe = "";
    let xefe = db
      .fetch(`${message.guild.id}.otocevap.yazılar`)
      .filter(a => a !== null).length;
    for (
      var i = 0;
      i <
      (db.fetch(`${message.guild.id}.otocevap.yazılar`)
        ? db.fetch(`${message.guild.id}.otocevap.yazılar`).length
        : 0);
      i++
    ) {
      efe += `${i + 1}) *${yazılar[i]}* - **${cevaplar[i]}** \n`;
    }
    if (!db.fetch(`${message.guild.id}.otocevap.yazılar`)) {
      efe += "✅ Eklenmiş hiç bir otomatik olarak cevap verilecek mesaj yok.";
    }
    if (db.fetch(`${message.guild.id}.otocevap.yazılar`).length == 0) {
      efe += "✅ Eklenmiş hiç bir otomatik olarak cevap verilecek mesaj yok.";
    }
    const basarili = new Discord.MessageEmbed()
      .setAuthor(
        `${message.author.username},`,
        message.author.avatarURL({ dynamic: true })
      )
      .setDescription(efe)
      .setColor("GREEN")
      .setFooter(footer);
    message.channel.send(basarili);
  } else if (ekle.includes(args[0])) {
    if (!efemm)
      return message.channel.send(
        new Discord.MessageEmbed().setDescription(
          "✅ Yanlış bir biçimde kullandın. Örnek kullanım: " +
            prefix +
            "otocevap düzenle <otocevapmesajı> <cevaplanacakmesaj> | <cevap>"
        )
      );
    if (!ifefe)
      return message.channel.send(
        new Discord.MessageEmbed().setDescription(
          "✅ Kelimelerin arasında boşluk bırak örnek `sa | Aleyküm Selam Hoşgeldin.` koyman gerekiyor ve `<cevaplanıcakmesaj> | <cevap>` şeklinde kullanmalısın."
        )
      );
    if (!bilmefe[0])
      return message.channel.send(
        new Discord.MessageEmbed().setDescription(
          "✅ Kelimelerin arasında boşluk bırak örnek `sa | Aleyküm Selam Hoşgeldin.` koyman gerekiyor ve `<cevaplanıcakmesaj> | <cevap>` şeklinde kullanmalısın."
        )
      );
    if (!bilmefe[1])
      return message.channel.send(
        new Discord.MessageEmbed().setDescription(
          "✅ Kelimelerin arasında boşluk bırak örnek `sa | Aleyküm Selam Hoşgeldin.` koyman gerekiyor ve `<cevaplanıcakmesaj> | <cevap>` şeklinde kullanmalısın."
        )
      );
    if (yazılar ? yazılar.includes(bilmefe[0]) : 0)
      return message.channel.send(
        new Discord.MessageEmbed().setDescription(
          "✅ Bu otocevap zaten sistemde ekli."
        )
      );
    db.push(`${message.guild.id}.otocevap.yazılar`, bilmefe[0]);
    db.push(`${message.guild.id}.otocevap.cevaplar`, bilmefe[1]);
    const basarili = new Discord.MessageEmbed()
      .setAuthor(
        `${message.author.username},`,
        message.author.avatarURL({ dynamic: true })
      )
      .setDescription(
        "✅ Başarılı bir şekilde cevaplanacak mesaj `" +
          bilmefe[0] +
          "` olarak, cevap ise `" +
          bilmefe[1] +
          "` olarak eklendi."
      )
      .setColor("GREEN")
      .setFooter("Guard hp Otocevap Sistemi");
    message.channel.send(basarili);
  } else if (sil.includes(args[0])) {
    if (!yazılar)
      return message.channel.send(
        new Discord.MessageEmbed().setDescription(
          "✅ Görünülürde eklenmiş bir otocevap yok!"
        )
      );
    if (!args[1])
      return message.channel.send(
        new Discord.MessageEmbed().setDescription(
          "✅ Otocevap silinmesi için bir otocevap ismi yazmalısın!"
        )
      );
    if (!yazılar.includes(efemm))
      return message.channel.send(
        new Discord.MessageEmbed().setDescription(
          "✅ Yazılan otocevap ismi otocevaplar arasında bulunamadı."
        )
      );
    for (
      var i = 0;
      i <
      (db.fetch(`${message.guild.id}.otocevap.yazılar`)
        ? db.fetch(`${message.guild.id}.otocevap.yazılar`).length
        : 0);
      i++
    ) {
      if (efemm == yazılar[i]) {
        const basarili = new Discord.MessageEmbed()
          .setAuthor(
            `${message.author.username},`,
            message.author.avatarURL({ dynamic: true })
          )
          .setDescription(
            "✅ Başarılı bir şekilde cevaplanacak mesaj `" +
              yazılar[i] +
              "` olarak, cevap ise `" +
              cevaplar[i] +
              "` olarak **silindi**."
          )
          .setColor("GREEN")
          .setFooter("Guard hp Otocevap Sistemi");
        const asd = db.fetch(`${message.guild.id}.otocevap.yazılar`);
        asd.splice(i, 1);
        db.set(`${message.guild.id}.otocevap.yazılar`, asd);
        const asdd = db.fetch(`${message.guild.id}.otocevap.cevaplar`);
        asdd.splice(i, 1);
        db.set(`${message.guild.id}.otocevap.cevaplar`, asdd);
        message.channel.send(basarili);
      }
    }
  } else if (edit.includes(args[0])) {
    if (!yazılar)
      return message.channel.send(
        new Discord.MessageEmbed().setDescription(
          "✅ Görülünürde eklenmiş bir otocevap bulunamadı!"
        )
      );
    if (!args[1])
      return message.channel.send(
        new Discord.MessageEmbed().setDescription(
          "✅ Otocevap düzenlemek için otocevap ismi yazmalısın!"
        )
      );
    if (!yazılar.includes(args[1]))
      return message.channel.send(
        new Discord.MessageEmbed().setDescription(
          "✅ Yazılan otocevap ismi otocevaplar arasında bulunamadı."
        )
      );
    if (!efemmm)
      return message.channel.send(
        new Discord.MessageEmbed().setDescription(
          "✅ Yanlış bir biçimde kullandın. Örnek kullanım: " +
            prefix +
            "otocevap düzenle <otocevapmesajı> <cevaplanacakmesaj> | <cevap>"
        )
      );
    if (!ifefe)
      return message.channel.send(
        new Discord.MessageEmbed().setDescription(
          "✅ Kelimelerin arasında boşluk bırak örnek `sa | Aleyküm Selam Hoşgeldin.` koyman gerekiyor ve `<cevaplanıcakmesaj> | <cevap>` şeklinde kullanmalısın."
        )
      );
    if (!bilmefee[0])
      return message.channel.send(
        new Discord.MessageEmbed().setDescription(
          "✅ Kelimelerin arasında boşluk bırak örnek `sa | Aleyküm Selam Hoşgeldin.` koyman gerekiyor ve `<cevaplanıcakmesaj> | <cevap>` şeklinde kullanmalısın."
        )
      );
    if (!bilmefee[1])
      return message.channel.send(
        new Discord.MessageEmbed().setDescription(
          "✅ Kelimelerin arasında boşluk bırak örnek `sa | Aleyküm Selam Hoşgeldin.` koyman gerekiyor ve `<cevaplanıcakmesaj> | <cevap>` şeklinde kullanmalısın."
        )
      );
    for (
      var i = 0;
      i <
      (db.fetch(`${message.guild.id}.otocevap.yazılar`)
        ? db.fetch(`${message.guild.id}.otocevap.yazılar`).length
        : 0);
      i++
    ) {
      if (args[1] == yazılar[i]) {
        const basarili = new Discord.MessageEmbed()
          .setAuthor(
            `${message.author.username},`,
            message.author.avatarURL({ dynamic: true })
          )
          .setColor("GREEN")
          .setDescription(
            "✅ Başarılı bir şekilde cevaplanacak mesaj `" +
              yazılar[i] +
              "` **" +
              bilmefee[0] +
              "** olarak, cevap ise `" +
              cevaplar[i] +
              "` **" +
              bilmefee[1] +
              "** olarak değiştirildi."
          )
          .setFooter("Guard hp Otocevap Sistemi");
        const asd = db.fetch(`${message.guild.id}.otocevap.yazılar`);
        asd.splice(i, 1);
        db.set(`${message.guild.id}.otocevap.yazılar`, asd);
        db.push(`${message.guild.id}.otocevap.yazılar`, bilmefee[0]);
        const asdd = db.fetch(`${message.guild.id}.otocevap.cevaplar`);
        asdd.splice(i, 1);
        db.set(`${message.guild.id}.otocevap.cevaplar`, asdd);
        db.push(`${message.guild.id}.otocevap.cevaplar`, bilmefee[1]);
        message.channel.send(basarili);
      }
    }
  } else {
    const embed = new Discord.MessageEmbed()
      .setAuthor(
        `${message.author.username},`,
        message.author.avatarURL({ dynamic: true })
      )
      .setDescription(
        `
Bu komutu kullanırken bilmen gerekenler:

✅> Eğer ${prefix}${message.content
          .split(" ")[0]
          .slice(ayarlar.prefix.length)}'dan sonra

✅ **${prefix}otocevap ${ekle.join(", ")}** yazarsan yeni bir otocevap ekler.
✅ **${prefix}otocevap ${sil.join(", ")}** yazarsan bir otocevabı siler.
✅ **${prefix}otocevap ${list.join(
          ", "
        )}** yazarsan sunucudaki otocevapları listeler.
✅ **${prefix}otocevap ${edit.join(", ")}** yazarsan bir otocevabı editlersin.

:pencil: Ek Bilgiler:
✅> Bir otocevap eklerken veya editlerken **cevap** verilecek kısımda

✅ **{sunucuadı}** yazarsanız {sunucuadı} yazılan kısımda sunucunun adı gözükecektir.
✅ **{üyesayı}** yazarsanız {üyesayı} yazılan kısımda sunucudaki üye sayısı gözükecektir.
✅ **{roller}** yazarsanız {roller} yazılan kısımda sunucudaki rolleri gözükücektir.
✅ **{sunucuid}** yazarsanız {sunucuid} yazılan kısımda sunucunun idsi gözükecektir.
✅ **{sunucubölge}** yazarsanız {sunucubölge} yazılan kısımda sunucunun bölgesi gözükecektir.
✅ **{sunucutarih}** yazarsanız {sunucutarih} yazılan kısımda sunucu ne zaman kurulduğu yazıcaktır.
✅ Eklenmesini istediğiniz başka şeyler varsa ${prefix}öneri ile bize iletebilirsiniz.`
      )
      .setColor("GREEN")
      .setFooter("Otocevap Sistemi");
    message.channel.send(embed);
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["otocevap-sistemi"],
  permLevel: 3,
  kategori: "moderasyon"
};
exports.help = {
  name: "otocevap",
  description: "Otomatik cevaplayıcı komutu.",
  usage: "otocevap"
};
