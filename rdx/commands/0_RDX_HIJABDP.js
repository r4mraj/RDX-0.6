const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: 'hijabdp',
    aliases: ['hijab', 'hdp'],
    description: 'Random hijab DP photos',
    credits: 'SARDAR RDX',
    usage: 'hijabdp',
    category: 'Profile',
    prefix: true
  },

  async run({ api, event, send }) {
    const { threadID, messageID } = event;
    
    const links = [
      "https://i.imgur.com/tPvqrVH.jpg","https://i.imgur.com/1M123yS.jpg","https://i.imgur.com/okpdmFt.jpg",
      "https://i.imgur.com/VY08K5y.jpg","https://i.imgur.com/An91n1s.jpg","https://i.imgur.com/ENb9RAp.jpg",
      "https://i.imgur.com/aAUBos2.jpg","https://i.imgur.com/GZRyD6t.jpg","https://i.imgur.com/aVOY30b.jpg",
      "https://i.imgur.com/lh0EtJx.jpg","https://i.imgur.com/qajIAts.jpg","https://i.imgur.com/IiOJVjq.jpg",
      "https://i.imgur.com/W8M7aML.jpg","https://i.imgur.com/EPgAZYe.jpg","https://i.imgur.com/bSVVkv4.jpg",
      "https://i.imgur.com/pKqztui.jpg","https://i.imgur.com/p2Jhu2W.jpg","https://i.imgur.com/a0VKSjy.jpg"
    ];

    try {
      const cacheDir = path.join(__dirname, "cache");
      if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });
      
      const selectedLink = links[Math.floor(Math.random() * links.length)];
      const filePath = path.join(cacheDir, `hijabdp_${Date.now()}.jpg`);
      
      const response = await axios.get(selectedLink, { responseType: 'arraybuffer' });
      fs.writeFileSync(filePath, response.data);
      
      await send.reply({
        body: `┏━━━━━┓\n     ꧁𝐑𝐃𝐗꧂\n✧══•❁😛❁•══✧\n┗━━━━━┛\n\n♥️ Hijab DP`,
        attachment: fs.createReadStream(filePath)
      });
      
      setTimeout(() => { try { fs.unlinkSync(filePath); } catch {} }, 5000);
    } catch (error) {
      console.error("HijabDP error:", error);
      return send.reply("Failed to get hijab DP.");
    }
  }
};
