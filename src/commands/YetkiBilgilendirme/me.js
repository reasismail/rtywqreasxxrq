const moment = require("moment");
require("moment-duration-format");
const conf = require("../../configs/sunucuayar.json");
const voiceUserParent = require("../../schemas/voiceUserParent");
const messageUser = require("../../schemas/messageUser");
const voiceUser = require("../../schemas/voiceUser");
const cezapuan = require("../../schemas/cezapuan");
const coin = require("../../schemas/coin");
const taggeds = require("../../schemas/taggeds");
const yetkis = require("../../schemas/yetkis");
const ceza = require("../../schemas/ceza");
const toplams = require("../../schemas/toplams");
const inviterSchema = require("../../schemas/inviter");
const {  rewards, miniicon, mesaj2, staff, galp ,Muhabbet ,star , fill, empty, fillStart, emptyEnd, fillEnd, red } = require("../../configs/emojis.json");
const { TeamMember, MessageEmbed } = require("discord.js");
const { MessageButton,MessageActionRow } = require('discord-buttons');

module.exports = {
  conf: {
    aliases: ["ystat"],
    name: "yetkim",
    help: "yetkim"
  },

  run: async (client, message, args, embed) => {
    if(!conf.staffs.some(rol => message.member.roles.cache.has(rol))) return message.react(red)
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    if(!conf.staffs.some(rol => member.roles.cache.has(rol))) return message.react(red)

    const messageData = await messageUser.findOne({ guildID: message.guild.id, userID: member.user.id });
    const voiceData = await voiceUser.findOne({ guildID: message.guild.id, userID: member.user.id });
    const messageWeekly = messageData ? messageData.weeklyStat : 0;
    const messageDaily = messageData ? messageData.dailyStat : 0;
    
    const coinData = await coin.findOne({ guildID: message.guild.id, userID: member.user.id });
    const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });

 

    const maxValue = client.ranks[client.ranks.indexOf(client.ranks.find(x => x.coin >= (coinData ? coinData.coin : 0)))] || client.ranks[client.ranks.length-1];
    const taggedData = await taggeds.findOne({ guildID: message.guild.id, userID: member.user.id });
    const toplamData = await toplams.findOne({ guildID: message.guild.id, userID: member.user.id });
    const yetkiData = await yetkis.findOne({ guildID: message.guild.id, userID: member.user.id });
    const cezaData = await ceza.findOne({ guildID: message.guild.id, userID: member.user.id });


const inviterData = await inviterSchema.findOne({ guildID: message.guild.id, userID: member.user.id });
    const total = inviterData ? inviterData.total : 0;

        const category = async (parentsArray) => {
        const data = await voiceUserParent.find({ guildID: message.guild.id, userID: member.id });
        const voiceUserParentData = data.filter((x) => parentsArray.includes(x.parentID));
        let voiceStat = 0;
        for (var i = 0; i <= voiceUserParentData.length; i++) {
          voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].parentData : 0;
        }
        return moment.duration(voiceStat).format("H [saat], m [dakika]");
      };
      
      let currentRank = client.ranks.filter(x => (coinData ? coinData.coin : 0) >= x.coin);
      currentRank = currentRank[currentRank.length-1];

      const coinStatus = message.member.hasRole(conf.staffs, false) && client.ranks.length > 0 ?
      `${currentRank ?`
      ${currentRank !== client.ranks[client.ranks.length-1] ? `??u an ${Array.isArray(currentRank.role) ? currentRank.role.map(x => `<@&${x}>`).join(", ") : `<@&${currentRank.role}>`} rol??ndesiniz. ${Array.isArray(maxValue.role) ? maxValue.role.length > 1 ? maxValue.role.slice(0, -1).map(x => `<@&${x}>`).join(', ') + ' ve ' + maxValue.role.map(x => `<@&${x}>`).slice(-1) : maxValue.role.map(x => `<@&${x}>`).join("") : `<@&${maxValue.role}>`} rol??ne ula??mak i??in \`${maxValue.coin-coinData.coin}\` puan daha kazanman??z gerekiyor!` : "??u an son yetkidesiniz! Emekleriniz i??in te??ekk??r ederiz. :)"}` : ` 
      ??uan ${message.member.roles.highest} rol??ndesiniz. ${Array.isArray(maxValue.role) ? maxValue.role.length > 1 ? maxValue.role.slice(0, -1).map(x => `<@&${x}>`).join(', ') + ' ve ' + maxValue.role.map(x => `<@&${x}>`).slice(-1) : maxValue.role.map(x => `<@&${x}>`).join("") : `<@&${maxValue.role}>`} rol??ne ula??mak i??in \`${maxValue.coin - (coinData ? coinData.coin : 0)}\`  Puan daha kazanman??z gerekiyor!`}` : ""
      
    var PuanDetaylari = new MessageButton()
    .setLabel("Puan Detaylar??")
    .setID("puan_detaylari")
    .setStyle("green")
    .setEmoji("944333266268340244")

    var GenelPuanDetaylari = new MessageButton()
    .setLabel("Genel Puan Detaylar??")
    .setID("genel_puan_detaylari")
    .setStyle("blurple")
    .setEmoji("944333272408805416")

    var Iptal = new MessageButton()
    .setLabel("??ptal")
    .setID("iptal_button")
    .setStyle("red")
    .setEmoji("944333289852919858")

    const row = new MessageActionRow()
    .addComponents(PuanDetaylari, GenelPuanDetaylari, Iptal)

embed.setDescription(`
${member.toString()}, (${member.roles.highest}) ??yesinin \`${moment(Date.now()).format("LLL")}\` tarihinden  itibaren \`${message.guild.name}\` sunucusunda toplam ses ve mesaj bilgileri a??a????da belirtilmi??tir.
`)

.addFields(
{ name: "__**Toplam Ses**__",  value: `
\`\`\`fix
${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}
\`\`\`
`, inline: true },
{ name: "__**Toplam Mesaj**__",  value: `
\`\`\`fix
${messageData ? messageData.topStat : 0} mesaj
\`\`\`
`, inline: true },
{ name:"__**Toplam Kay??t**__",  value: `
\`\`\`fix
${toplamData ? `${toplamData.toplams.length} ki??i`: "Veri bulunmuyor."} 
\`\`\`
`, inline: true },
)
  
.addFields(
{ name: "__**Toplam Davet**__", value: `
\`\`\`fix
${inviterData ? `${total} regular`: "Veri bulunmuyor."} 
\`\`\`
`, inline: true },
{ name: "__**Toplam Tagl??**__", value: `
\`\`\`fix
${taggedData ? `${taggedData.taggeds.length} ki??i`: "Veri bulunmuyor."} 
\`\`\`
`, inline: true },
{ name: "__**Toplam Yetkili**__", value: `
\`\`\`fix
${yetkiData ? `${yetkiData.yetkis.length} ki??i` : "Veri bulunmuyor."}
\`\`\`
`, inline: true }
)
  
  
  embed.addField(`${star} **Sesli Sohbet ??statisti??i**`, `
  ${miniicon} Toplam: \`${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}\`
  ${miniicon} Public Odalar: \`${await category(conf.publicParents)}\`
  ${miniicon} Secret Odalar: \`${await category(conf.privateParents)}\`
  ${miniicon} Alone Odalar: \`${await category(conf.aloneParents)}\`
  ${miniicon} Y??netim Yetkili Odalar??: \`${await category(conf.funParents)}\`
  ${miniicon} Kay??t Odalar??: \`${await category(conf.registerParents)}\`
   `, false);
  
  
  embed.addField(`${star} **Mesaj ??statisti??i**`, `
  ${miniicon} Toplam: \`${messageData ? messageData.topStat : 0}\`
  ${miniicon} Haftal??k Mesaj: \`${Number(messageWeekly).toLocaleString()} mesaj\`
  ${miniicon} G??nl??k Mesaj: \`${Number(messageDaily).toLocaleString()} mesaj\`
   `, false);

   

    let msg = await message.channel.send(embed, { components: [row] });
    var filter = (button) => button.clicker.user.id === message.author.id;
   
    let collector = await msg.createButtonCollector(filter, { time: 99999999 })
    collector.on("collect", async (button) => {
      if(button.id === "puan_detaylari") {
        await button.reply.defer()
      const puan = new MessageEmbed()
      .setDescription(`
      ${member.toString()}, (${member.roles.highest}) ??yesinin \`${moment(Date.now()).format("LLL")}\` tarihinden  itibaren \`${message.guild.name}\` sunucusunda puanlama tablosu a??a????da belirtilmi??tir.
      `) 
      
       .addField(`${star} **Ceza Kullan??m??**`, `\`\`\`diff
- (Ban: ${cezaData ? cezaData.BanAmount : 0} - Mute: ${cezaData ? cezaData.MuteAmount : 0} - Ses Mute: ${cezaData ? cezaData.VoiceMuteAmount : 0} - Jail: ${cezaData ? cezaData.JailAmount : 0})\`\`\`
`)

      .addField(`${star} **Puan Durumu:**`, `
      Puan??n??z: \`${coinData ? Math.floor(coinData.coin) : 0}\`, Gereken Puan: \`${maxValue.coin}\`
      ${progressBar(coinData ? coinData.coin : 0, maxValue.coin, 9)} \`${coinData ? coinData.coin : 0} / ${maxValue.coin}\`
       `, false)
      
      .addField(`${star} **Puan Detaylar??:**`, `
      ${miniicon} Kay??tlar: \`${toplamData ? toplamData.toplams.length : 0} (Puan Etkisi: +${toplamData ? toplamData.toplams.length*5.5 : 0})\`
      ${miniicon} Tagl??lar: \`${taggedData ? taggedData.taggeds.length : 0} (Puan Etkisi: +${taggedData ? taggedData.taggeds.length*25 : 0})\`
      ${miniicon} Davetler: \`${total} (Puan Etkisi: +${total*15})\`
      ${miniicon} Yetkililer: \`${yetkiData ? yetkiData.yetkis.length : 0} ki??i (Puan Etkisi: +${yetkiData ? yetkiData.yetkis.length*30 : 0})\`
      ${miniicon} Chat Puan: \`${messageData ? messageData.topStat : 0} mesaj (Puan Etkisi: +${messageData ? messageData.topStat*2 : 0})\`
      ${miniicon} Sesli Puan: \`${moment.duration(voiceData ? voiceData.topStat : 0).format("h")} saat (Puan Etkisi: +${moment.duration(voiceData ? voiceData.topStat : 0).format("h")*240})\`
       `, false)
      
      .addField(`${star} **Yetki Durumu:**`, `
      ${coinStatus}
       `, false);  

msg.edit({
  embed : puan,
  components : row
})
      
      }

  if(button.id === "genel_puan_detaylari") {
    await button.reply.defer()
    const ceza = new MessageEmbed()
    .setDescription(`
    ${member.toString()}, (${member.roles.highest}) ??yesinin \`${moment(Date.now()).format("LLL")}\` tarihinden itibaren \`${message.guild.name}\` sunucusunda genel puanlama tablosu a??a????da belirtilmi??tir.
`) 
.addField(`${star} **Puan Detaylar??:**`, `
${miniicon} Kay??t: (\`Puan Etkisi: +${toplamData ? toplamData.toplams.length*5.5 : 0}\`)
${miniicon} Tagl??: (\`Puan Etkisi: +${taggedData ? taggedData.taggeds.length*25 : 0}\`)
${miniicon} Davet: (\`Puan Etkisi: +${total*15}\`)
${miniicon} Yetkili: (\`Puan Etkisi: +${yetkiData ? yetkiData.yetkis.length*30 : 0}\`)
${miniicon} Toplam Ses: (\`Puan Etkisi: +${moment.duration(voiceData ? voiceData.topStat : 0).format("h")*240}\`)
${miniicon} Toplam Mesaj: (\`Puan Etkisi: +${messageData ? messageData.topStat*2 : 0}\`)
${miniicon} Toplam Ald??????n Cezalar : ${cezapuanData ? cezapuanData.cezapuan.length : 0} (\`Toplam ${cezaData ? cezaData.ceza.length : 0}\`)
 `, false)

.addField(`${star} **Net Puanlama Bilgisi**`, `
${miniicon} Kay??t i??lemi yaparak, \`+5.5\` puan kazan??rs??n.
${miniicon} Tagl?? ??ye belirleyerek, \`+25\` puan kazan??rs??n??z.
${miniicon} ??nsanlar?? davet ederek, \`+15\` puan kazan??rs??n.
${miniicon} ??nsanlar?? yetkili yaparak, \`+30\` puan kazan??rs??n.
${miniicon} Seste kalarak, ortalama olarak \`+4\` puan kazan??rs??n??z.
${miniicon} Yaz?? yazarak, ortalama olarak, \`+2\` puan kazan??rs??n??z.
 `, false)

.addField(`${star} **Puan Durumu:**`, `
Puan??n??z: \`${coinData ? Math.floor(coinData.coin) : 0}\`, Gereken Puan: \`${maxValue.coin}\`
${progressBar(coinData ? coinData.coin : 0, maxValue.coin, 9)} \`${coinData ? coinData.coin : 0} / ${maxValue.coin}\`
 `, false)

.addField(`${star} **Yetki Durumu:**`, `
${coinStatus}
 `, false)

msg.edit({
  embed: ceza,
  components : row
})  
    }

      if(button.id === "iptal_button") {
        await button.reply.defer()
        const iptal = new MessageEmbed()
        .setDescription(`
${member.toString()}, (${member.roles.highest}) ??yesinin \`${moment(Date.now()).format("LLL")}\` tarihinden  itibaren \`${message.guild.name}\` sunucusunda toplam ses ve mesaj bilgileri a??a????da belirtilmi??tir.
`)

.addFields(
{ name: "__**Toplam Ses**__",  value: `
\`\`\`fix
${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}
\`\`\`
`, inline: true },
{ name: "__**Toplam Mesaj**__",  value: `
\`\`\`fix
${messageData ? messageData.topStat : 0} mesaj
\`\`\`
`, inline: true },
{ name:"__**Toplam Kay??t**__",  value: `
\`\`\`fix
 ${toplamData ? `${toplamData.toplams.length} ki??i`: "Veri bulunmuyor."} 
\`\`\`
`, inline: true },
)
  
.addFields(
{ name: "__**Toplam Davet**__", value: `
\`\`\`fix
${inviterData ? `${total} regular`: "Veri bulunmuyor."} 
\`\`\`
`, inline: true },
{ name: "__**Toplam Tagl??**__", value: `
\`\`\`fix
${taggedData ? `${taggedData.taggeds.length} ki??i`: "Veri bulunmuyor."} 
\`\`\`
`, inline: true },
{ name: "__**Toplam Yetkili**__", value: `
\`\`\`fix
${yetkiData ? `${yetkiData.yetkis.length} ki??i` : "Veri bulunmuyor."}
\`\`\`
`, inline: true }
)
  
  
  iptal.addField(`${star} **Sesli Sohbet ??statisti??i**`, `
  ${miniicon} Toplam: \`${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}\`
  ${miniicon} Public Odalar: \`${await category(conf.publicParents)}\`
  ${miniicon} Secret Odalar: \`${await category(conf.privateParents)}\`
  ${miniicon} Alone Odalar: \`${await category(conf.aloneParents)}\`
  ${miniicon} Y??netim Yetkili Odalar??: \`${await category(conf.funParents)}\`
  ${miniicon} Kay??t Odalar??: \`${await category(conf.registerParents)}\`
   `, false);
  
  
   iptal.addField(`${star} **Mesaj ??statisti??i**`, `
  ${miniicon} Toplam: \`${messageData ? messageData.topStat : 0}\`
  ${miniicon} Haftal??k Mesaj: \`${Number(messageWeekly).toLocaleString()} mesaj\`
  ${miniicon} G??nl??k Mesaj: \`${Number(messageDaily).toLocaleString()} mesaj\`
   `, false);

    msg.edit({
      embed: iptal,
      components : row
    })
        
        }

  })
  }
};

function progressBar(value, maxValue, size) {
const progress = Math.round(size * ((value / maxValue) > 1 ? 1 : (value / maxValue)));
const emptyProgress = size - progress > 0 ? size - progress : 0;

const progressText = fill.repeat(progress);
const emptyProgressText = empty.repeat(emptyProgress);

return emptyProgress > 0 ? fillStart+progressText+emptyProgressText+emptyEnd : fillStart+progressText+emptyProgressText+fillEnd;
};
