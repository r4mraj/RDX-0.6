const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: 'girldp',
    aliases: ['girlpic', 'gdp'],
    description: 'Random girl DP photos',
    credits: 'SARDAR RDX',
    usage: 'girldp',
    category: 'Profile',
    prefix: true
  },

  async run({ api, event, send }) {
    const { threadID, messageID } = event;
    
    const links = [
      "https://i.imgur.com/GWvWrOU.jpg","https://i.imgur.com/HlsXDDh.jpg","https://i.imgur.com/IAK2mhm.jpg",
      "https://i.imgur.com/EXsKLRr.jpg","https://i.imgur.com/48lKPK9.jpg","https://i.imgur.com/ylJhQiH.jpg",
      "https://i.imgur.com/aGalyKj.jpg","https://i.imgur.com/EE8hhkl.jpg","https://i.imgur.com/fz4sU7e.jpg",
      "https://i.imgur.com/ucHzYiJ.jpg","https://i.imgur.com/LX1iD04.jpg","https://i.imgur.com/Vr0x1nz.jpg",
      "https://i.imgur.com/voUwxl9.jpg","https://i.imgur.com/8aJed5B.jpg","https://i.imgur.com/GCoJji2.jpg",
      "https://i.imgur.com/3YzAYEm.jpg","https://i.imgur.com/g5o6cgR.jpg","https://i.imgur.com/mojVpEc.jpg",
      "https://i.imgur.com/DWYoD7c.jpg","https://i.imgur.com/kCpgGjm.jpg","https://i.imgur.com/1ndfYuz.jpg",
      "https://i.imgur.com/nzh5pjU.jpg","https://i.imgur.com/Jcdlar4.jpg","https://i.imgur.com/3SFW45P.jpg"
    ];

    try {
      const cacheDir = path.join(__dirname, "cache");
      if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });
      
      const selectedLink = links[Math.floor(Math.random() * links.length)];
      const filePath = path.join(cacheDir, `girldp_${Date.now()}.jpg`);
      
      const response = await axios.get(selectedLink, { responseType: 'arraybuffer' });
      fs.writeFileSync(filePath, response.data);
      
      await send.reply({
        body: `┏━━━━━┓\n     ꧁𝐑𝐃𝐗꧂\n✧══•❁😛❁•══✧\n┗━━━━━┛\n\n♥️ Girl DP`,
        attachment: fs.createReadStream(filePath)
      });
      
      setTimeout(() => { try { fs.unlinkSync(filePath); } catch {} }, 5000);
    } catch (error) {
      console.error("GirlDP error:", error);
      return send.reply("Failed to get girl DP.");
    }
  }
};
