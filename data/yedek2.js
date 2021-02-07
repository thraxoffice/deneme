const Discord = require("discord.js");
const client = new Discord.Client();
const DBL = require("dblapi.js");
const dbl = new DBL("DBL TOKEN", client);
exports.run = (client, message, args) => {
  dbl.hasVoted(message.author.id).then(voted => {
    if (!voted) {
      message.channel.send(
        `Bu komutu kullanabilmek için bota DBL üzerinden oy vermen gerekiyor. Eğer oy verdiyseniz 1-2 dakika beklemeniz gerekmektedir. Oy Linki: https://top.gg/bot/${client.user.id}/vote`
      );
    } else {
      //KOMUT
    }
  });
};
