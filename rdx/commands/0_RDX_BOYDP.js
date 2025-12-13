const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: 'boydp',
    aliases: ['boypic', 'bdp'],
    description: 'Random boy DP photos',
    credits: 'SARDAR RDX',
    usage: 'boydp',
    category: 'Profile',
    prefix: true
  },

  async run({ api, event, send }) {
    const { threadID, messageID } = event;
    
    const links = [
      "https://i.imgur.com/h9kE3Ic.jpeg","https://i.imgur.com/nNJr9Dt.jpeg","https://i.imgur.com/wFSzYnF.jpeg",
      "https://i.imgur.com/zJ1HFs8.jpeg","https://i.imgur.com/wsv4mWY.jpeg","https://i.imgur.com/r3UTDwz.jpeg",
      "https://i.imgur.com/ZCYaMfF.jpeg","https://i.imgur.com/hSQWcAM.jpeg","https://i.imgur.com/ovX6lfA.jpeg",
      "https://i.imgur.com/RgfrYpM.jpeg","https://i.imgur.com/DfvFLov.jpeg","https://i.imgur.com/GPwbrDj.jpeg",
      "https://i.imgur.com/jSifYwo.jpeg","https://i.imgur.com/Chc5pLl.jpeg","https://i.imgur.com/HbznJXK.jpeg",
      "https://i.imgur.com/OLKdt61.jpeg","https://i.imgur.com/tDNqmML.jpeg","https://i.imgur.com/yUwx4o4.jpeg",
      "https://i.imgur.com/e4xWHUv.jpeg","https://i.imgur.com/q6LfLx0.jpeg","https://i.imgur.com/eoKKdzI.jpeg"
    ];

    try {
      const cacheDir = path.join(__dirname, "cache");
      if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });
      
      const selectedLink = links[Math.floor(Math.random() * links.length)];
      const filePath = path.join(cacheDir, `boydp_${Date.now()}.jpg`);
      
      const response = await axios.get(selectedLink, { responseType: 'arraybuffer' });
      fs.writeFileSync(filePath, response.data);
      
      await send.reply({
        body: `┏━━━━━┓\n     ꧁𝐑𝐃𝐗꧂\n✧══•❁😛❁•══✧\n┗━━━━━┛\n\n♥️ Boy DP`,
        attachment: fs.createReadStream(filePath)
      });
      
      setTimeout(() => { try { fs.unlinkSync(filePath); } catch {} }, 5000);
    } catch (error) {
      console.error("BoyDP error:", error);
      return send.reply("Failed to get boy DP.");
    }
  }
};
