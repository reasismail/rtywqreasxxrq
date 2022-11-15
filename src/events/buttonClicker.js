
const rs = require('../configs/settings.json')
const Settings = require('../configs/settings.json')
const Roles = require('../configs/settings.json')

module.exports = async (button) => {

    if(button.id === "cezabutton"){
        await button.reply.think(true)
        let security = Date.now() - button.clicker.member.user.createdTimestamp > 1000 * 60 * 60 * 24 * 15 ? "güvenli" : "şüpheli"
        if(security === "şüpheli") {
          button.reply.edit(`Görünüşe göre hesabın henüz 15 günden fazlasına ulaşamadı. Lütfen **15** Gün sonrasında tekrardan butona basmayı dene.`)
        }else if(security === "güvenli"){
          button.reply.edit(`Tebrikler :tada: :tada: \n Görünüşe göre artık şüpheli sıfatından kurtuluyorsun. Birazdan gelecek olan kayıt kanallarından birine girip Ses-Teyit sonrası kayıt olabilirsin.`);
          button.clicker.member.roles.cache.has(Roles.Register.Booster) ? button.clicker.member.roles.set([Roles.Register.Booster, Roles.Register.UnReg]) : button.clicker.member.roles.set([Roles.Register.UnReg])
          .catch(() => console.log('Yetkim yetmediği için kişiyi kontrol edemedim.'))
        }
      }

}
module.exports.conf = {
  name: "clickButton"
};
