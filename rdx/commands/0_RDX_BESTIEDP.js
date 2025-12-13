const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: 'bestiedp',
    aliases: ['friendsdp', 'bffdp'],
    description: 'Random bestie/friends DP photos',
    credits: 'SARDAR RDX',
    usage: 'bestiedp',
    category: 'Profile',
    prefix: true
  },

  async run({ api, event, send }) {
    const { threadID, messageID } = event;
    
    const links = [
      "https://i.imgur.com/8hXcECM.jpg","https://i.imgur.com/NjphF0h.jpg","https://i.imgur.com/EASfhma.jpg",
      "https://i.imgur.com/yNk3exJ.jpg","https://i.imgur.com/BdK6B9z.jpg","https://i.imgur.com/V5BqbAY.jpg",
      "https://i.imgur.com/G1Lq3lz.jpg","https://i.imgur.com/YyvzVNj.jpg","https://i.imgur.com/wxwxPdH.jpg",
      "https://i.imgur.com/RyjvCQa.jpg","https://i.imgur.com/zRxQYeE.jpg","https://i.imgur.com/kAQlHXb.jpg",
      "https://i.imgur.com/RfpAG5G.jpg","https://i.imgur.com/SsSN3pq.jpg","https://i.imgur.com/kSfiHkX.jpg",
      "https://i.imgur.com/UFDKTO4.jpg","https://i.imgur.com/atG5oPm.jpg","https://i.imgur.com/uan61PD.jpg"
    ];

    try {
      const cacheDir = path.join(__dirname, "cache");
      if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });
      
      const selectedLink = links[Math.floor(Math.random() * links.length)];
      const filePath = path.join(cacheDir, `bestiedp_${Date.now()}.jpg`);
      
      const response = await axios.get(selectedLink, { responseType: 'arraybuffer' });
      fs.writeFileSync(filePath, response.data);
      
      await send.reply({
        body: `┏━━━━━┓\n     ꧁𝐙𝐚𝐢𝐧𝐢-𝐉𝐮𝐭𝐭꧂\n✧══•❁😛❁•══✧\n┗━━━━━┛\n\n♥️ Bestie DP`,
        attachment: fs.createReadStream(filePath)
      });
      
      setTimeout(() => { try { fs.unlinkSync(filePath); } catch {} }, 5000);
    } catch (error) {
      console.error("BestieDP error:", error);
      return send.reply("Failed to get bestie DP.");
    }
  }
};
