const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: 'cpldp',
    aliases: ['coupledp', 'cdp'],
    description: 'Random couple DP photos',
    credits: 'SARDAR RDX',
    usage: 'cpldp',
    category: 'Profile',
    prefix: true
  },

  async run({ api, event, send }) {
    const { threadID, messageID } = event;
    
    const links = [
      "https://i.imgur.com/g7woYNY.jpg","https://i.imgur.com/0jDiNmQ.jpg","https://i.imgur.com/3OX7sWP.jpg",
      "https://i.imgur.com/IthNc1C.jpg","https://i.imgur.com/1RoN4la.jpg","https://i.imgur.com/vcfIO27.jpg",
      "https://i.imgur.com/8yWRoMe.jpg","https://i.imgur.com/nku8dTF.jpg","https://i.imgur.com/V32qQb0.jpg",
      "https://i.imgur.com/lkem5Gd.jpg","https://i.imgur.com/QIpV0AY.jpg","https://i.imgur.com/zdnDEtm.jpg",
      "https://i.imgur.com/w7eKGSy.jpg","https://i.imgur.com/ONCJm5B.jpg","https://i.imgur.com/oQavLMr.jpg",
      "https://i.imgur.com/MuBToNp.jpg","https://i.imgur.com/JrMY7j8.jpg","https://i.imgur.com/MauPoyi.jpg"
    ];

    try {
      const cacheDir = path.join(__dirname, "cache");
      if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });
      
      const selectedLink = links[Math.floor(Math.random() * links.length)];
      const filePath = path.join(cacheDir, `cpldp_${Date.now()}.jpg`);
      
      const response = await axios.get(selectedLink, { responseType: 'arraybuffer' });
      fs.writeFileSync(filePath, response.data);
      
      await send.reply({
        body: `┏━━━━━┓\n     ꧁𝐑𝐃𝐗꧂\n✧══•❁😛❁•══✧\n┗━━━━━┛\n\n♥️ Couple DP`,
        attachment: fs.createReadStream(filePath)
      });
      
      setTimeout(() => { try { fs.unlinkSync(filePath); } catch {} }, 5000);
    } catch (error) {
      console.error("CoupleDP error:", error);
      return send.reply("Failed to get couple DP.");
    }
  }
};
