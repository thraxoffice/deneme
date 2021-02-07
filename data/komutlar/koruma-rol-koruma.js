
        const db = require("quick.db");
        const Discord = require("discord.js");
        const ayarlar = require("../ayarlar.json");
        
        exports.run = async (client, message, args) => {
          let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || ayarlar.prefix;
        
          if (!args[0]) {
            const embed = new Discord.MessageEmbed()
              .setColor("RED")
              .setDescription(`✅ **Hatalı Kullanım Örnek: ${prefix}rol-koruma aç / kapat**`);
        
            message.channel.send(embed);
            return;
          }
          let rol = await db.fetch(`rolk_${message.guild.id}`);
          if (args[0] == "aç") {
            if (rol) {
              const embed = new Discord.MessageEmbed()
                .setColor("#501c67")
                .setDescription("**✅ Rol koruma sistemi zaten aktif durumda!**");
        
              message.channel.send(embed);
              return;
            } else {
              db.set(`rolk_${message.guild.id}`, "acik");
              const embed = new Discord.MessageEmbed()
                .setColor("#501c67")
                .setDescription("**✅ Rol koruma sistemi aktif silinen rolleri tekrar açacağım ve size bildiriceğim**");
        
              message.channel.send(embed);
            }
          } else if (args[0] == "kapat") {
            db.delete(`rolk_${message.guild.id}`);
            const embed = new Discord.MessageEmbed()
              .setColor("#501c67")
              .setDescription("**✅ Rol koruma sistemi başarıyla kapatıldı**");
        
            message.channel.send(embed);
          }
        };
        exports.conf = {
          enabled: true,
          guildOnly: false,
          aliases: ["rol-k"],
          permLevel: 2,
          kategori: "sunucu"
        };
        
        exports.help = {
          name: "rol-koruma",
          description: "Rol koruma sistemini açıp kapatırsınız.",
          usage: "rol-koruma"
        }; 
 
        