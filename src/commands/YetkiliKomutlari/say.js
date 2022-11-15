const conf = require("../../configs/sunucuayar.json")
const { red } = require("../../configs/emojis.json")
module.exports = {
  conf: {
    aliases: ["say"],
    name: "say",
    help: "say"
  },

  run: async (client, message, args, embed) => {
    if(!conf.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !conf.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.hasPermission('ADMINISTRATOR')) 
    {
      message.react(red)
      return
    }
    let Tag = conf.tag
    let Tags = conf.tags
    let Tag2 = conf.tags2
    let Tag3 = conf.tags3
    let Tag4 = conf.tags4
    let Tag5 = conf.tags5
    let Tag6 = conf.tags6
    let Tag7 = conf.tags7
    let etiket = conf.etikets

           let tag = message.guild.members.cache.filter((member) => member.user.username.includes(Tag) || member.user.username.includes(Tags) || member.user.username.includes(Tag2)  || member.user.username.includes(Tag3)  ||member.user.username.includes(Tag4)  || member.user.discriminator == etiket);
           let discrim = await message.guild.members.cache.filter(member => member.user.discriminator.includes(etiket)).size;
           let sesli = message.guild.channels.cache.filter(channel => channel.type == "voice").map(channel => channel.members.size).reduce((a, b) => a + b);
           message.channel.send(embed
               .setColor('RANDOM')
               .setDescription(`
               <a:yildiz:1041760793441603604> \`❯\` Şu anda toplam **\`\`${sesli}\`\`** kişi seslide.
               <a:yildiz:1041760793441603604> \`❯\` Sunucuda **\`\`${message.guild.memberCount}\`\`** adet üye var (**${message.guild.members.cache.filter(member => member.presence.status !== "offline").size}** Aktif)
               <a:yildiz:1041760793441603604> \`❯\` Toplamda **\`\`${tag.size}\`\`** kişi tagımızı alarak bizi desteklemiş.
               <a:yildiz:1041760793441603604> \`❯\` Toplamda **\`\`${message.guild.premiumSubscriptionCount}\`\`** adet boost basılmış! ve Sunucu **\`\`${message.guild.premiumTier}\`\`** seviye`)
 )
 
   },
 };