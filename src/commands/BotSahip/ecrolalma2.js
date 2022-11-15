const Discord = require("discord.js");
const conf = require("../../configs/sunucuayar.json");

module.exports = {
  conf: {
    aliases: [],
    name: "ecrolalma2",
    owner: true,
  },

  run: async (client, message, args) => {
     client.api.channels(message.channel.id).messages.post({ data: {"content":`<a:degnek:1041767741339729920>     Merhaba \`* Schwarz\`  Rol seçmek için aşağıdaki gerekli butonlara tıklamanız yeterli olucaktır!\n\n**🏳️‍🌈** Sunucumuzun \`LGBT\` Rolunu Alırsınız\n**💞** Sunucumuzun \`Sevgilim Var\` Rolunu Alırsınız\n**💔** Sunucumuzun \`Sevgilim Yok\` Rolunu Alırsınız\n\n**🤍** Sunucumuzun \`Sevgili Yapmiyorum\` Rolunu Alırsınız\n**🎮** Sunucumuzun \`Doğruluk Çesaretlik\` Rolunu Alırsınız\n**🧛** Sunucumuzun \`Vampir Köylü\` Rolunu Alırsınız\n`,
"components":[{
"type":1,"components":[
                         {"type":2,"style":1,"custom_id":"buttonlgbt","label":"🏳️‍🌈"},
                         {"type":2,"style":4,"custom_id":"buttonsevgilimvar","label":"💞"},
                         {"type":2,"style":2,"custom_id":"buttonsevgilimyok","label":"💔"},
       ]}, {  "type":1,"components":[
                         {"type":2,"style":1,"custom_id":"buttonsevgiliyapmiyorum","label":"🤍"},
                         {"type":2,"style":4,"custom_id":"buttondcuye","label":"🎮"},
                         {"type":2,"style":2,"custom_id":"buttonvkuye","label":"🧛"}

       ]}


]}

 })
  },
};
///"style":1 mavi
///"style":2 gri
///"style":3 yesil
///"style":4 kırmızı
