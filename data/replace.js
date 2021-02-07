const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const moment = require("moment");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const fs = require("fs");
require("./util/eventLoader.js")(client);
const db = require("quick.db");
client.emojis.cache.get("785437821926113290");
client.emojis.cache.get("785437821435117608");
//-----------------------------------------------\\
const token = process.env.token;
var prefix = ayarlar.prefix;

const log = message => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.login(token);
client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (ayarlar.sahip.includes(message.author.id)) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(process.env.token);
//---------------------------------|Komutlar|---------------------------------\\
//---------------------------------|GuildCreate Başlangıç|---------------------------------\\
client.on("guildCreate", guild => {
  // Birisi botu sunucuya attıgında bot özel mesaj atar.
  const tesekkurler = new Discord.MessageEmbed()
    .setTitle(`Guard hp Bilgilendirme`)
    .setTimestamp()
    .setColor("GREEN")
    .setDescription(
      `Beni Sunucuna Eklediğin İçin Teşekkür Ederim \n Sana En İyi Şekilde Hizmet Edeceğim.\n Eğer Bir Sorunla Karşılaşırsan Destek Sunucuma Gel https://discord.gg/T4nkSKys5h \n Komutlarımız için **f!yardım** komutunu kullanınız.`
    );
  guild.owner.send(tesekkurler);
});
//---------------------------------|GuildCreate Son|---------------------------------\\
//---------------------------------|Ototag Başlangıç|---------------------------------\\
client.on("guildMemberAdd", async member => {
  let emran = await db.fetch(`ototag.${member.guild.id}`);
  let tanersins;
  if (emran == null) tanersins = member.setNickname(`${member.user.username}`);
  else tanersins = member.setNickname(`${emran} ${member.user.username}`);
});
//---------------------------------|Ototag Son|---------------------------------\\
//---------------------------------|Afk Sistemi|---------------------------------\\
const ms = require("parse-ms");
const { DiscordAPIError } = require("discord.js");

client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (message.content.includes(`afk`)) return;

  if (await db.fetch(`afk_${message.author.id}`)) {
    db.delete(`afk_${message.author.id}`);
    db.delete(`afk_süre_${message.author.id}`);

    const embed = new Discord.MessageEmbed()

      .setColor("GREEN")
      .setAuthor(message.author.username, message.author.avatarURL)
      .setDescription(`${message.author.username} Artık \`AFK\` Değilsin.`);

    message.channel.send(embed);
  }

  var USER = message.mentions.users.first();
  if (!USER) return;
  var REASON = await db.fetch(`afk_${USER.id}`);

  if (REASON) {
    let süre = await db.fetch(`afk_süre_${USER.id}`);
    let timeObj = ms(Date.now() - süre);

    const afk = new Discord.MessageEmbed()

      .setColor("RED")
      .setDescription(
        `**BU KULLANICI AFK**\n\n**Afk Olan Kullanıcı :** \`${USER.tag}\`\n**Afk Süresi :** \`${timeObj.hours}saat\` \`${timeObj.minutes}dakika\` \`${timeObj.seconds}saniye\`\n**Sebep :** \`${REASON}\``
      );

    message.channel.send(afk);
  }
});
//---------------------------------|Afk Sistemi Son|---------------------------------\\
//---------------------------------|Mod-Log Sistemi Başlangıç|---------------------------------\\
const botadi = "Guard hp";

client.on("messageDelete", message => {
  let modlogs = db.get(`modlogkanaly_${message.guild.id}`);
  const modlogkanal = message.guild.channels.cache.find(
    kanal => kanal.id === modlogs
  );
  if (!modlogs) return;
  if (modlogs) {
    if (message.content.length > 1024) {
      modlogkanal.send({
        embed: {
          Color: "#080000",
          author: {
            name: `${message.author.tag} tarafından gönderilen bir mesaj silindi`,
            icon_url: message.author.displayAvatarURL({ dynamic: true })
          },
          fields: [
            {
              name: `Silinen mesaj 1024 karakterden fazla mesajı gösteremem`,
              value: `\`\`\`Bilinmiyor...\`\`\``
            }
          ],
          timestamp: new Date(),
          footer: {
            icon_url: message.author.displayAvatarURL({ dynamic: true }),
            text: `${botadi} | Mod-Log Sistemi`
          }
        }
      });
    } else {
      modlogkanal.send({
        embed: {
          Color: "#080000",
          author: {
            name: `${message.author.tag} kullanıcısının mesajı silindi\n`,
            icon_url: message.author.displayAvatarURL({ dynamic: true })
          },
          fields: [
            {
              name: `Silinen mesaj:`,
              value: "```" + message.content + "```"
            }
          ],
          timestamp: new Date(),
          footer: {
            icon_url: message.author.displayAvatarURL({ dynamic: true }),
            text: `${botadi} | Mod-Log Sistemi`
          }
        }
      });
    }
  }
});

client.on("guildBanAdd", async (guild, user) => {
  let modlogs = db.get(`modlogkanaly_${guild.id}`);
  const modlogkanal = guild.channels.cache.find(kanal => kanal.id === modlogs);
  if (!modlogs) return;
  if (modlogs) {
    let embed = new Discord.MessageEmbed()
      .setColor("#080000")
      .setAuthor("Bir kişi sunucudan yasaklandı")
      .setThumbnail(
        user.avatarURL({ dynamic: true }) || user.defaultAvatarURL()
      )
      .addField(`Yasaklanan kişi`, `\`\`\` ${user.tag} \`\`\` `)
      .setFooter(`${botadi} | Mod-Log Sistemi`)
      .setTimestamp();
    modlogkanal.send(embed);
  }
});

client.on("guildBanRemove", async (guild, user) => {
  let modlogs = db.get(`modlogkanaly_${guild.id}`);
  const modlogkanal = guild.channels.cache.find(kanal => kanal.id === modlogs);
  if (!modlogs) return;
  if (modlogs) {
    let embed = new Discord.MessageEmbed()
      .setColor("#080000")
      .setAuthor("Bir kişinin yasağı kaldırıldı")
      .setThumbnail(
        user.avatarURL({ dynamic: true }) || user.defaultAvatarURL()
      )
      .addField(`Yasağı kaldırılan kişi`, `\`\`\` ${user.tag} \`\`\` `)
      .setFooter(`${botadi} | Mod-Log Sistemi`)
      .setTimestamp();
    modlogkanal.send(embed);
  }
});

client.on("channelCreate", async channel => {
  let modlogs = db.get(`modlogkanal_${channel.guild.id}`);
  const modlogkanal = channel.guild.channels.cache.find(
    kanal => kanal.id === modlogs
  );
  if (!modlogs) return;
  if (modlogs) {
    if (channel.type === "text") {
      modlogkanal.send({
        embed: {
          Color: "#080000",
          fields: [
            {
              name: `Bir Kanal Oluşturuldu. \nOluşturulan Kanalin İsmi:`,
              value: `\`\`\` ${channel.name} \`\`\``
            },
            {
              name: `Oluşturulan Kanalin Türü`,
              value: `\`\`\` Metin Kanalı \`\`\``
            }
          ],
          timestamp: new Date(),
          footer: {
            text: `${botadi} | Mod-Log Sistemi`
          }
        }
      });
    } else {
      if (channel.type === "voice") {
        modlogkanal.send({
          embed: {
            Color: "#080000",
            fields: [
              {
                name: `Bir Kanal Oluşturuldu. \nOluşturulan Kanalin İsmi:`,
                value: `\`\`\` ${channel.name} \`\`\``
              },
              {
                name: `Oluşturulan Kanalin Türü`,
                value: `\`\`\` Ses Kanalı \`\`\``
              }
            ],
            timestamp: new Date(),
            footer: {
              text: `${botadi} | Mod-Log Sistemi`
            }
          }
        });
      }
    }
  }
});

client.on("channelDelete", async channel => {
  let modlogs = db.get(`modlogkanaly_${channel.guild.id}`);
  const modlogkanal = channel.guild.channels.cache.find(
    kanal => kanal.id === modlogs
  );
  if (!modlogs) return;
  if (modlogs) {
    if (channel.type === "text") {
      modlogkanal.send({
        embed: {
          Color: "#080000",
          fields: [
            {
              name: `Bir Kanal Silindi. \nSilinen Kanalin İsmi:`,
              value: `\`\`\` ${channel.name} \`\`\``
            },
            {
              name: `Silinen Kanalin Türü`,
              value: `\`\`\` Ses Kanalı \`\`\``
            }
          ],
          timestamp: new Date(),
          footer: {
            text: `${botadi} | Mod-Log Sistemi`
          }
        }
      });
    } else {
      if (channel.type === "voice") {
        modlogkanal.send({
          embed: {
            Color: "#080000",
            fields: [
              {
                name: `Bir Kanal Silindi. \nSilinen Kanalin İsmi:`,
                value: `\`\`\` ${channel.name} \`\`\``
              },
              {
                name: `Silinen Kanalin Türü`,
                value: `\`\`\` Ses Kanalı \`\`\``
              }
            ],
            timestamp: new Date(),
            footer: {
              text: `${botadi} | Mod-Log Sistemi`
            }
          }
        });
      }
    }
  }
});

client.on("roleDelete", async role => {
  let modlogs = db.get(`modlogkanaly_${role.guild.id}`);
  const modlogkanal = role.guild.channels.cache.find(
    kanal => kanal.id === modlogs
  );
  if (!modlogs) return;
  if (modlogs) {
    modlogkanal.send({
      embed: {
        Color: "#080000",
        fields: [
          {
            name: `Bir Rol Silindi. \nSilinen Rolun İsmi:`,
            value: `\`\`\` ${role.name} \`\`\``
          }
        ],
        timestamp: new Date(),
        footer: {
          text: `${botadi} | Mod-Log Sistemi`
        }
      }
    });
  }
});

client.on("emojiDelete", async emoji => {
  let modlogs = db.get(`modlogkanaly_${emoji.guild.id}`);
  const modlogkanal = emoji.guild.channels.cache.find(
    kanal => kanal.id === modlogs
  );
  if (!modlogs) return;
  if (modlogs) {
    modlogkanal.send({
      embed: {
        Color: "#080000",
        fields: [
          {
            name: `Bir Emoji Silindi. \nSilinen Emojinin İsmi:`,
            value: `\`\`\` ${emoji.name} \`\`\``
          }
        ],
        timestamp: new Date(),
        footer: {
          text: `${botadi} | Mod-Log Sistemi`
        }
      }
    });
  }
});

client.on("roleCreate", async role => {
  let modlogs = db.get(`modlogkanaly_${role.guild.id}`);
  const modlogkanal = role.guild.channels.cache.find(
    kanal => kanal.id === modlogs
  );
  if (!modlogs) return;
  if (modlogs) {
    modlogkanal.send({
      embed: {
        Color: "#080000",
        fields: [
          {
            name: `Yeni Bir Rol Oluşturuldu. \nOluşturulan Rolun İsmi:`,
            value: `\`\`\` ${role.name} \`\`\``
          }
        ],
        timestamp: new Date(),
        footer: {
          text: `${botadi} | Mod-Log Sistemi`
        }
      }
    });
  }
});

client.on("messageUpdate", async (oldMessage, newMessage) => {
  let modlogs = db.get(`modlogkanaly_${oldMessage.guild.id}`);
  const modlogkanal = oldMessage.guild.channels.cache.find(
    kanal => kanal.id === modlogs
  );
  if (!modlogs) return;
  if (modlogs) {
    if (oldMessage.author.bot) {
      return false;
    }

    if (!oldMessage.guild) {
      return false;
    }

    if (oldMessage.content == newMessage.content) {
      return false;
    }
    modlogkanal.send({
      embed: {
        Color: "#080000",
        author: {
          name: `${oldMessage.author.tag} mesajını düzenledi:\n`,
          icon_url: oldMessage.author.displayAvatarURL({ dynamic: true })
        },
        fields: [
          {
            name: `Eski mesaj:`,
            value: `\`\`\` ${oldMessage.content} \`\`\``
          },
          {
            name: `Yeni Mesaj:`,
            value: `\`\`\` ${newMessage.content} \`\`\``
          }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: oldMessage.author.displayAvatarURL({ dynamic: true }),
          text: `${botadi} | Mod-Log Sistemi`
        }
      }
    });
  }
});

client.on("emojiCreate", async emoji => {
  let modlogs = db.get(`modlogkanaly_${emoji.guild.id}`);
  const modlogkanal = emoji.guild.channels.cache.find(
    kanal => kanal.id === modlogs
  );
  if (!modlogs) return;
  if (modlogs) {
    modlogkanal.send({
      embed: {
        Color: "#080000",
        fields: [
          {
            name: `Bir emoji eklendi. \nEklenen Emojinin İsmi:`,
            value: `\`\`\` ${emoji.name} \`\`\``
          }
        ],
        timestamp: new Date(),
        footer: {
          text: `${botadi} | Mod-Log Sistemi`
        }
      }
    });
  }
});
//---------------------------------|Mod-Log Sistemi Son|---------------------------------\\
//---------------------------------|Reklam-Engelle Başlangıç|---------------------------------\\
client.on("message", async msg => {
  var replace = await db.fetch(`reklamengl_${msg.guild.id}`);
  if (replace == "acik") {
    const reklam = [
      ".com",
      ".net",
      ".https",
      ".http",
      ".io",
      "discord.gg",
      ".gg",
      ".tk",
      ".pw",
      ".party",
      ".xyz",
      ".me",
      "www.",
      "https",
      "http",
      ".gl",
      ".com.tr",
      ".tr",
      ".batihost",
      ".network",
      ".rf",
      ".gd",
      ".rf.gd",
      ".org",
      ".az"
    ];
    if (reklam.some(word => msg.content.includes(word))) {
      try {
        if (!msg.member.hasPermission("BAN_MEMBERS")) {
          msg.delete({ timeout: 1 });
          return msg
            .reply(
              "✅ Bu Sunucuda Reklam Engelleme Filtresi Aktiftir. Reklam Yapmana İzin Veremem!"
            )
            .then(msg => msg.delete({ timeout: 1500 }));

          msg.delete(3000);
        }
      } catch (err) {
        console.log(err);
      }
    }
  } else if (replace == "kapali") {
  }
  if (!replace) return;
});
//---------------------------------|Reklam-Engelle Son|---------------------------------\\
//---------------------------------|Küfür-Engelle Başlangıç|---------------------------------\\
client.on("message", async msg => {
  var replace = await db.fetch(`küfürengl_${msg.guild.id}`);
  if (replace == "acik") {
    const küfür = [
      "sg",
      "oç",
      "oçe",
      "anan",
      "ananı",
      "ananı sikim",
      "anneni sikim",
      "anneni sikeyim",
      "ananı sikeyim",
      "annen",
      "ağzına",
      "ağzına sıçim",
      "ağzına sıçayım",
      "ağzına s",
      "am",
      "ambiti",
      "amını",
      "amını s",
      "amcık",
      "amcik",
      "amcığını",
      "amciğini",
      "amcığını",
      "amcığını s",
      "amck",
      "amckskm",
      "amcuk",
      "amına",
      "amına k",
      "amınakoyim",
      "amına s",
      "amunu",
      "amını",
      "amın oğlu",
      "amın o",
      "amınoğlu",
      "amk",
      "aq",
      "amnskm",
      "anaskm",
      "ananskm",
      "amkafa",
      "amk çocuğu",
      "amk oç",
      "piç",
      "amk ç",
      "amlar",
      "amcıklar",
      "amq",
      "amındaki",
      "amnskm",
      "ananı",
      "anan",
      "ananın am",
      "ananızın",
      "aneni",
      "aneni s",
      "annen",
      "anen",
      "ananın dölü",
      "sperm",
      "döl",
      "anasının am",
      "anası orospu",
      "orospu",
      "orosp,",
      "kahpe",
      "kahbe",
      "kahße",
      "ayklarmalrmsikerim",
      "ananı avradını",
      "avrat",
      "avradını",
      "avradını s",
      "babanı",
      "babanı s",
      "babanın amk",
      "annenin amk",
      "ananın amk",
      "bacı",
      "bacını s",
      "babası pezevenk",
      "pezevenk",
      "pezeveng",
      "kaşar",
      "a.q",
      "a.q.",
      "bitch",
      "çük",
      "yarrak",
      "am",
      "cibiliyetini",
      "bokbok",
      "bombok",
      "dallama",
      "göt",
      "götünü s",
      "ebenin",
      "ebeni",
      "ecdadını",
      "gavat",
      "gavad",
      "ebeni",
      "ebe",
      "fahişe",
      "sürtük",
      "fuck",
      "gotten",
      "götten",
      "göt",
      "gtveren",
      "gttn",
      "gtnde",
      "gtn",
      "hassiktir",
      "hasiktir",
      "hsktr",
      "haysiyetsiz",
      "ibne",
      "ibine",
      "ipne",
      "kaltık",
      "kancık",
      "kevaşe",
      "kevase",
      "kodumun",
      "orosbu",
      "fucker",
      "penis",
      "pic",
      "porno",
      "sex",
      "sikiş",
      "s1kerim",
      "s1k",
      "puşt",
      "sakso",
      "sik",
      "skcm",
      "siktir",
      "sktr",
      "skecem",
      "skeym",
      "slaleni",
      "sokam",
      "sokuş",
      "sokarım",
      "sokarm",
      "sokaym",
      "şerefsiz",
      "şrfsz",
      "sürtük",
      "taşak",
      "taşşak",
      "tasak",
      "tipini s",
      "yarram",
      "yararmorospunun",
      "yarramın başı",
      "yarramınbaşı",
      "yarraminbasi",
      "yrrk",
      "zikeyim",
      "zikik",
      "zkym",
      "Amk",
      "Yarrak",
      "pust",
      "serefsiz"
    ];
    if (küfür.some(word => msg.content.includes(word))) {
      try {
        if (!msg.member.hasPermission("BAN_MEMBERS")) {
          msg.delete({ timeout: 1 });
          return msg
            .reply(
              "✅ Bu Sunucuda Küfür Engelleme Filtresi Aktiftir. Küfür Etmene İzin Veremem!"
            )
            .then(msg => msg.delete({ timeout: 1500 }));

          msg.delete(3000);
        }
      } catch (err) {
        console.log(err);
      }
    }
  } else if (replace == "kapali") {
  }
  if (!replace) return;
});
//---------------------------------|Küfür-Engelle Son|---------------------------------\\
//---------------------------------|Capslock-Engelle Başlangıç|---------------------------------\\
client.on("message", async msg => {
  var replace = await db.fetch(`capslockengl_${msg.guild.id}`);
  if (replace == "acik") {
    if (msg.channel.type === "dm") return;
    if (msg.author.bot) return;
    if (msg.content.length > 4) {
      if (db.fetch(`capslock_${msg.guild.id}`)) {
        let caps = msg.content.toUpperCase();
        if (msg.content == caps) {
          if (!msg.member.hasPermission("ADMINISTRATOR")) {
            if (!msg.mentions.users.first()) {
              msg.delete({ timeout: 1 });
              return msg
                .reply(`✅ Bu sunucuda, büyük harf kullanımı engellenmekte!`)
                .then(msg => msg.delete({ timeout: 1500 }));

              msg.delete(3000);
            }
          }
        }
      }
    } else if (replace == "kapali") {
    }
    if (!replace) return;
  }
});
//---------------------------------|CapsLock-Engelle Son|---------------------------------\\
//---------------------------------|Sayaç-Sistemi Sistemi Başlangıç|---------------------------------\\
client.on("guildMemberAdd", async member => {
  let Piratesayı = await db.fetch(`PirateCode+SayaçSayı_${member.guild.id}`);
  let Piratekanal = await db.fetch(`PirateCode+SayaçKanal_${member.guild.id}`);
  if (!Piratesayı || !Piratekanal) return;
  let sonuç = Piratesayı - member.guild.memberCount;
  client.channels
    .get(Piratekanal)
    .send(
      `:mega: ${member} Katıldı **${Piratesayı}** Kişiye Ulaşmak için **${sonuç}** Kişi Kaldı`
    );
});
client.on("guildMemberRemove", async member => {
  let Piratesayı = await db.fetch(`PirateCode+SayaçSayı_${member.guild.id}`);
  let Piratekanal = await db.fetch(`PirateCode+SayaçKanal_${member.guild.id}`);
  if (!Piratesayı || !Piratekanal) return;
  let sonuç = Piratesayı - member.guild.memberCount;

  client.channels
    .get(Piratekanal)
    .send(
      `:mega:  ${member} Ayrıldı **${Piratesayı}** Kişiye Ulaşmak İçin **${sonuç}** Kişi Kaldı`
    );
  return;
});
//---------------------------------|Sayaç Sistemi Son|---------------------------------\\
//---------------------------------|Otorol Sistemi Başlangıç|---------------------------------\\
client.on("guildMemberAdd", member => {
  let rol = db.fetch(`autoRole_${member.guild.id}`);
  if (!rol) return;
  let kanal = db.fetch(`autoRoleChannel_${member.guild.id}`);
  if (!kanal) return;

  member.roles.add(member.guild.roles.cache.get(rol));
  let embed = new Discord.MessageEmbed()
    .setDescription(
      `:mega: Sunucuya yeni katılan **${member.user.username}** kullanıcısına **${rol}** rolü verildi <a:evet:784518934711762976>`
    )
    .setColor("RANDOM"); //.setFooter(`<@member.id>`)
  member.guild.channels.cache.get(kanal).send(embed);
});
//---------------------------------|Otorol Sistemi Son|---------------------------------\\
//---------------------------------|Bot Koruma Sistemi Başlangıç|---------------------------------\\
//BOT ENGEL,anti-baskın yada anti-raid
client.on("guildMemberAdd", async member => {
  // Yapımı Tamamen CodAre'den '~'Resađ Seferov✨#0809 a aitdir
  let kanal =
    (await db.fetch(`antiraidK_${member.guild.id}`)) == "bot-koruma aç";
  if (!kanal) return;
  var cod = member.guild.owner;
  if (member.user.bot === true) {
    if (db.fetch(`botizin_${member.guild.id}.${member.id}`) == "aktif") {
      let are = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setThumbnail(member.user.avatarURL({ dynamic: true }))
        .setDescription(
          `✅ **${member.user.tag}** (${member.id}) adlı bota bir yetkili verdi eğer kaldırmak istiyorsanız **${prefix}bot-izni kaldır botun_id**.`
        );
      cod.send(are); //CodAre✨
    } else {
      let izinverilmemişbot = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setThumbnail(member.user.avatarURL({ dynamic: true }))
        .setDescription(
          "✅ **" +
            member.user.tag +
            "**" +
            " (" +
            member.id +
            ") " +
            "adlı bot sunucuya eklendi ve banladım eğer izin vermek istiyorsanız **" +
            prefix +
            "bot-izni ver botun_id**"
        );
      member.ban(); // Eğer sunucudan atmak istiyorsanız ban kısmını kick yapın
      cod.send(izinverilmemişbot);
    }
  }
});
//---------------------------------|Bot Koruma Sistemi Son|---------------------------------\\
//---------------------------------|Oto Cevap Sistemi Başlangıç|---------------------------------\\
client.on("message", async message => {
  if (message.author.bot) return;
  let yazılar = db.fetch(`${message.guild.id}.otocevap.yazılar`);
  let cevaplar = db.fetch(`${message.guild.id}.otocevap.cevaplar`);
  var efe = "";
  let sunucuadı = message.guild.name;
  let üyesayı = message.guild.members.cache.size;
  let roller = message.guild.roles.cache.map(role => role.name).join(", ");
  let sunucuid = message.guild.id;
  let sunucubolge = message.guild.region;
  let olusturulma = message.guild.createdAt;
  for (
    var i = 0;
    i <
    (db.fetch(`${message.guild.id}.otocevap.yazılar`)
      ? db.fetch(`${message.guild.id}.otocevap.yazılar`).length
      : 0);
    i++
  ) {
    if (message.content.toLowerCase() == yazılar[i].toLowerCase()) {
      efe += `${cevaplar[i]
        .Guardhp("{sunucuadı}", `${sunucuadı}`)
        .Guardhp("{üyesayı}", `${üyesayı}`)
        .Guardhp("{roller}", `${roller}`)
        .Guardhp("{sunucuid}", `${sunucuid}`)
        .Guardhp("{sunucubölge}", `${sunucubolge}`)
        .Guardhp("{sunucutarih}", `${olusturulma}`)}`;
      var embed = new Discord.MessageEmbed().setDescription(`${efe}`);
      return message.channel.send({ embed: embed });
    }
  }
});
//---------------------------------|Oto Cevap Sistemi Son|---------------------------------\\
//---------------------------------|Güvenlik Sistemi Başlangıç|---------------------------------\\
client.on("guildMemberAdd", member => {
  let kanal = db.fetch(`güvenlik.${member.guild.id}`);
  if (!kanal) return;

  let aylar = {
    "01": "Ocak",
    "02": "Şubat",
    "03": "Mart",
    "04": "Nisan",
    "05": "Mayıs",
    "06": "Haziran",
    "07": "Temmuz",
    "08": "Ağustos",
    "09": "Eylül",
    "10": "Ekim",
    "11": "Kasım",
    "12": "Aralık"
  };

  let bitiş = member.user.createdAt;
  let günü = moment(new Date(bitiş).toISOString()).format("DD");
  let ayı = moment(new Date(bitiş).toISOString())
    .format("MM")
    .replace("01", "Ocak")
    .replace("02", "Şubat")
    .replace("03", "Mart")
    .replace("04", "Nisan")
    .replace("05", "Mayıs")
    .replace("06", "Haziran")
    .replace("07", "Temmuz")
    .replace("08", "Ağustos")
    .replace("09", "Eylül")
    .replace("10", "Ekim")
    .replace("11", "Kasım")
    .replace("12", "Aralık")
    .replace("13", "CodAre"); //codare
  let yılı = moment(new Date(bitiş).toISOString()).format("YYYY");
  let saati = moment(new Date(bitiş).toISOString()).format("HH:mm");

  let günay = `${günü} ${ayı} ${yılı} ${saati}`;

  let süre = member.user.createdAt;
  let gün = moment(new Date(süre).toISOString()).format("DD");
  let hafta = moment(new Date(süre).toISOString()).format("WW");
  let ay = moment(new Date(süre).toISOString()).format("MM");
  let ayy = moment(new Date(süre).toISOString()).format("MM");
  let yıl = moment(new Date(süre).toISOString()).format("YYYY");
  let yıl2 = moment(new Date().toISOString()).format("YYYY");

  let netyıl = yıl2 - yıl;

  let created = ` ${netyıl} yıl  ${ay} ay ${hafta} hafta ${gün} gün önce`;

  let kontrol;
  if (süre < 1296000000)
    kontrol = "<a:r_hayir:785437821435117608> Bu hesap şüpheli!";
  if (süre > 1296000000)
    kontrol = "<a:r_evet:785437821926113290> Bu hesap güvenli!";

  let codare = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setTitle(`${member.user.username} Sunucuya Katıldı`)
    .setDescription(
      "<@" +
        member.id +
        "> Bilgileri : \n  Hesap oluşturulma tarihi **[" +
        created +
        "]** (`" +
        günay +
        "`) \n Hesap durumu : **" +
        kontrol +
        "**"
    ) //codare
    .setTimestamp();
  client.channels.cache.get(kanal).send(codare);
});
//---------------------------------|Güvenlik Sistemi Son|---------------------------------\\
//---------------------------------|Rol Koruma Sistemi Başlangıç|---------------------------------\\
client.on("roleDelete", async (role, channel, message, guild) => {
  let rolkoruma = await db.fetch(`rolk_${role.guild.id}`);
  if (rolkoruma == "acik") {
    role.guild.createRole({
      name: role.name,
      color: role.color,
      permissions: role.permissions
    });
    role.guild.owner.send(
      new Discord.MessageEmbed().setDescription(
        `<a:evet:784518934711762976> **${role.name}** Adlı Rol Silindi Ve Ben Rolü Tekrar Oluşturdum`
      )
    );
  }
});
//---------------------------------|Rol Koruma Sistemi Son|---------------------------------\\

//---------------------------------|Kanal Koruma Sistemi Başlangıç|---------------------------------\\
client.on("channelDelete", async function(channel) {
  let rol = await db.fetch(`kanalk_${channel.guild.id}`);

  if (rol) {
    const guild = channel.guild.cache;
    let channelp = channel.parentID;

    channel.clone().then(z => {
      let kanal = z.guild.channels.cache.find(c => c.name === z.name);
      kanal.setParent(
        kanal.guild.channels.find(channel => channel.id === channelp)
      );
    });
  }
});
//---------------------------------|Kanal Koruma Sistemi Son|---------------------------------\\

//---------------------------------/Eklendim-Atıldım/---------------------------//
client.on("guildDelete", guild => {
  let rrrsembed = new Discord.MessageEmbed()

    .setColor("RED")
    .setTitle(" Bot Kicklendi ")
    .addField("Sunucu Adı:", guild.name)
    .addField("Sunucu sahibi", guild.owner)
    .addField("Sunucu Sahibi'nin ID'si", guild.ownerID)
    .addField("Sunucunun Kurulu Olduğu Bölge:", guild.region)
    .addField("Sunucudaki Kişi Sayısı:", guild.memberCount);

  client.channels.cache.get("798479108047896576").send(rrrsembed);
});
//--------------------------------------------------------//

client.on("guildCreate", guild => {
  let rrrsembed = new Discord.MessageEmbed()

    .setColor("GREEN")
    .setTitle(" Bot Eklendi ")
    .addField("Sunucu Adı:", guild.name)
    .addField("Sunucu sahibi", guild.owner)
    .addField("Sunucu Sahibi'nin ID'si", guild.ownerID)
    .addField("Sunucunun Kurulu Olduğu Bölge:", guild.region)
    .addField("Sunucudaki Kişi Sayısı:", guild.memberCount);

  client.channels.cache.get("798479108047896576").send(rrrsembed);
});
//----------------------------------------------------------/
client.on("message", msg => {
  var dm = client.channels.cache.get("798604253220044830");
  if (msg.channel.type === "dm") {
    if (msg.author.id === client.user.id) return;
    const botdm = new Discord.MessageEmbed()
      .setTitle(`${client.user.username} Dm`)
      .setTimestamp()
      .setColor("#ffd100")
      .setThumbnail(`${msg.author.avatarURL()}`)
      .addField("Gönderen", msg.author.tag)
      .addField("Gönderen ID", msg.author.id)
      .addField("Gönderilen Mesaj", msg.content);

    dm.send(botdm);
  }
  if (msg.channel.bot) return;
});
//---------------------------------------------------------//
client.on("message", async message => {
  if (message.content === "<@!794482280437514241>")
    return message.channel.send(
      "Bana seslendiniz sanırım yardım için r_yardım iyi kullanmalar dilerim!"
    );
});
//----------------------------------------------------------------------------------------------------------------//
client.on("guildCreate", guild => {
  let pinkcode = "798547499886575616";

  if (guild.memberCount < 10) {
    //kişi sınırını ayarlayabilirsiniz

    guild.leave();

    return client.channels.cache
      .get(pinkcode)
      .send(
        "Eklendiğim sunuculardan birisi 10 üye altında olduğu için çıktım."
      );
  }
});
//------------------------------------------------------------------------------------------------------------\\
client.on("guildMemberAdd", async member => {
  let sayac = await db.fetch(`sayac_${member.guild.id}`);
  let skanal = await db.fetch(`sayacK_${member.guild.id}`);
  if (!sayac) return;
  if (member.guild.memberCount >= sayac) {
    member.guild.channels.cache
      .get(skanal)
      .send(
        `✅ **${member.user.tag}** sunucuya **katıldı**! \`${db.fetch(
          `sayac_${member.guild.id}`
        )}\` kişi olduk! ✅ Sayaç sıfırlandı.`
      );
    db.delete(`sayac_${member.guild.id}`);
    db.delete(`sayacK_${member.guild.id}`);
    return;
  } else {
    member.guild.channels.cache
      .get(skanal)
      .send(
        `✅ **${member.user.tag}** sunucuya **katıldı**! \`${db.fetch(
          `sayac_${member.guild.id}`
        )}\` üye olmamıza son \`${db.fetch(`sayac_${member.guild.id}`) -
          member.guild.memberCount}\` üye kaldı! Sunucumuz şuanda \`${
          member.guild.memberCount
        }\` kişi!`
      );
  }
});

client.on("guildMemberRemove", async member => {
  let sayac = await db.fetch(`sayac_${member.guild.id}`);
  let skanal = await db.fetch(`sayacK_${member.guild.id}`);
  if (!sayac) return;
  member.guild.channels.cache
    .get(skanal)
    .send(
      `<a:XTik:798277028050501642> **${
        member.user.tag
      }** sunucudan **ayrıldı**! \`${db.fetch(
        `sayac_${member.guild.id}`
      )}\` üye olmamıza son \`${db.fetch(`sayac_${member.guild.id}`) -
        member.guild.memberCount}\` üye kaldı! Sunucumuz şuanda \`${
        member.guild.memberCount
      }\` kişi!`
    );
});
/////////////////////////////////////////////////
client.on("messageDelete", message => {
  const data = require("quick.db");
  data.set(`snipe.mesaj.${message.guild.id}`, message.content);
  data.set(`snipe.id.${message.guild.id}`, message.author.id);
});
