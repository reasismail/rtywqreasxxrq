const Discord = require("discord.js");
const messageUser = require("../schemas/messageUser");
const voiceUser = require("../schemas/voiceUser");
const voiceUserParent = require("../schemas/voiceUserParent");
const inviterSchema = require("../schemas/inviter");
const inviteMemberSchema = require("../schemas/inviteMember");
const nameData = require("../schemas/names")
const conf = require("../configs/settings.json")
const ayarlar = require("../configs/sunucuayar.json")
const {miniicon, voice, mesaj2, star} = require("../configs/emojis.json")

const moment = require("moment");
moment.locale("tr");

module.exports = async (button) => {

    const member = button.clicker.member;
    const inviterData = await inviterSchema.findOne({ guildID: conf.guildID, userID: button.clicker.member.id });
    const total = inviterData ? inviterData.total : 0;
    const regular = inviterData ? inviterData.regular : 0;
    const bonus = inviterData ? inviterData.bonus : 0;
    const leave = inviterData ? inviterData.leave : 0;
    const fake = inviterData ? inviterData.fake : 0;
    const invMember = await inviteMemberSchema.find({ guildID: conf.guildID, inviter: button.clicker.member.id });
    const daily = invMember ? button.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24).size : 0;
    const weekly = invMember ? button.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24 * 7).size : 0;
    const tagged = invMember ? button.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && m.user.username.includes(conf.tag) && m.user.discriminator.includes(conf.discrim)).size : 0;

////////////////////////////////////////////////////////////////////////////////////////////

   const data = await nameData.findOne({ guildID: conf.guildID, userID: member.user.id });

////////////////////////////////////////////////////////////////////////////////////////////

 const messageData = await messageUser.findOne({ guildID: conf.guildID, userID: button.clicker.member.id });
 const voiceData = await voiceUser.findOne({ guildID: conf.guildID, userID: button.clicker.member.id });

      const messageWeekly = messageData ? messageData.weeklyStat : 0;
      const voiceWeekly = moment.duration(voiceData ? voiceData.weeklyStat : 0).format("H [saat], m [dakika]");
      const messageDaily = messageData ? messageData.dailyStat : 0;
      const voiceDaily = moment.duration(voiceData ? voiceData.dailyStat : 0).format("H [saat], m [dakika]");

////////////////////////////////////////////////////////////////////////////////////////////

    const category = async (parentsArray) => {
      const data = await voiceUserParent.find({ guildID: conf.guildID, userID: member.id });
      const voiceUserParentData = data.filter((x) => parentsArray.includes(x.parentID));
      let voiceStat = 0;
      for (var i = 0; i <= voiceUserParentData.length; i++) {
        voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].parentData : 0;
      }
      return moment.duration(voiceStat).format("H [saat], m [dakika] s [saniye]");
    };

////////////////////////////////////////////////////////////////////////////////////////////

if(button.id === "I")
{
await button.reply.think(true)
await button.reply.edit(`Sunucuya Kat??lma Tarihiniz :  \`${moment(button.clicker.member.joinedAt).format('D/MMMM/YYYY')}\``)
}

if(button.id === "II")
{
await button.reply.think(true)
await button.reply.edit(`??zerinde Bulunan Rollerin Listesi ;
        
${(button.clicker.member.roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(' ') ? button.clicker.member.roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(', ') : 'Hi?? yok.')}`)
}

if(button.id === "III")
{
await button.reply.think(true)
await button.reply.edit(`Hesab??n??z??n A????l???? Tarihi :  \`${moment(button.clicker.member.user.createdAt).format("LLL")}\``)
}

if(button.id === "IV")
{
await button.reply.think(true)
await button.reply.edit(`
${button.clicker.member.toString()}, ??yesinin \`${moment(Date.now() + (1000*60*60*3)).format("LLL")}\` tarihinden  itibaren \`${button.guild.name}\` sunucusunda toplam invite bilgileri a??a????da belirtilmi??tir.
Toplam **${regular}** davet.

${miniicon} \`(${total} ger??ek, ${bonus} bonus, ${leave} ayr??lm????, ${fake} fake)\`
      
${miniicon} \`G??nl??k: ${daily}, Haftal??k: ${weekly}, Tagl??: ${tagged}\`
`)
}

if(button.id === "V")
{
await button.reply.think(true)
await member.roles.set(ayarlar.unregRoles);
await button.reply.edit(`${button.clicker.member.toString()} ??yesi ba??ar??yla kay??ts??za at??ld??!`)
}

if(button.id === "VI")
{
await button.reply.think(true)
await button.reply.edit(`
${miniicon} Sesli kanallardaki ??ye say??s?? : \`${(button.guild.members.cache.filter((x) => x.voice.channel).size)}\`
${miniicon} Sunucudaki toplam ??ye say??s?? : \`${(button.guild.memberCount)}\`
${miniicon} Sunucunun olu??turulma tarihi: \`${moment(button.guild.createdAt).locale("tr").format("LLL")}\`
${miniicon} Sunucu destek numaras?? : \`${(button.guild.id)}\`
`)
}

if(button.id === "VII")
{
await button.reply.think(true)
const ambed = new Discord.MessageEmbed()
.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 2048 }))
.setTitle(`${member.user.username} ??yesinin isim bilgileri;`)
.setDescription(data ? data.names.splice(0, 10).map((x, i) => `\`${i + 1}.\` \`${x.name}\` (${x.rol}) , (<@${x.yetkili}>) , **[**\`${moment(x.date).format("LLL")}\`**]**`).join("\n") : "Bu kullan??c??ya ait isim ge??mi??i bulunmuyor!")         
await button.reply.edit(ambed,true)
}

if(button.id === "VIII")
{
await button.reply.think(true)
await button.reply.edit(`
${button.clicker.member.toString()}, ??yesinin \`${moment(Date.now() + (1000*60*60*3)).format("LLL")}\` tarihinden  itibaren \`${button.guild.name}\` sunucusunda toplam mesaj bilgileri a??a????da belirtilmi??tir.

${star} **Mesaj ??statisti??i**
${miniicon} Toplam: \`${messageData ? messageData.topStat : 0}\`

${miniicon} Haftal??k Mesaj: \`${Number(messageWeekly).toLocaleString()} mesaj\`
${miniicon} G??nl??k Mesaj: \`${Number(messageDaily).toLocaleString()} mesaj\`
`)
}

if(button.id === "IX")
{
await button.reply.think(true)
await button.reply.edit(`
${button.clicker.member.toString()}, ??yesinin \`${moment(Date.now() + (1000*60*60*3)).format("LLL")}\` tarihinden  itibaren \`${button.guild.name}\` sunucusunda toplam ses bilgileri a??a????da belirtilmi??tir.

${star} **Sesli Sohbet ??statisti??i**
${miniicon} Toplam: \`${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika] s [saniye]")}\`

${miniicon} Haftal??k Ses: \`${voiceWeekly}\`
${miniicon} G??nl??k Ses: \`${voiceDaily}\`
`,true);
}

}
module.exports.conf = {
  name: "clickButton"
};
