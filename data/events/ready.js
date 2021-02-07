const chalk = require("chalk");
const moment = require("moment");
const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
var prefix = ayarlar.prefix;

module.exports = client => {
  setInterval(function() {}, 300);
  var msgArray = ["YouTube/LedoWT f!yardım  f!davet", "Hizmetinizdeyim!"];

  setInterval(() => {
    var rastgeleOyun = Math.floor(Math.random() * msgArray.length);
    client.user.setActivity(`${msgArray[rastgeleOyun]}`, {
      type: "STREAMING",
      url: "https://www.twitch.tv/ledowt"
    });
  }, 115000);
  console.log(`Guard hp Bot Giriş Yaptı.`);
};
