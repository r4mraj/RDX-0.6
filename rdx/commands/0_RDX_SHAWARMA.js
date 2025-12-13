const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: 'shawarma',
    aliases: ['sw'],
    description: 'Random shawarma image',
    credits: 'SARDAR RDX',
    usage: 'shawarma',
    category: 'Fun',
    prefix: true
  },

  async run({ api, event, send }) {
    const { threadID, messageID } = event;
    
    const links = [
      "https://i.imgur.com/ATBylrF.jpeg",
      "https://i.imgur.com/pTZM9Ta.jpeg",
      "https://i.imgur.com/e4lY4b3.jpeg",
      "https://i.imgur.com/K2nkoSc.jpeg"
    ];

    api.setMessageReaction("🤤", messageID, () => {}, true);

    try {
      const cacheDir = path.join(__dirname, "cache");
      if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });
      
      const selectedLink = links[Math.floor(Math.random() * links.length)];
      const filePath = path.join(cacheDir, `shawarma_${Date.now()}.jpg`);
      
      const response = await axios.get(selectedLink, { responseType: 'arraybuffer' });
      fs.writeFileSync(filePath, response.data);
      
      await send.reply({
        body: "𝗔𝗖𝗛𝗔 𝗚 𝗟𝗚𝗧𝗔 𝗕𝗛𝗢𝗢𝗞 𝗟𝗚 𝗚𝗔𝗘𝗬 𝗛𝗬 𝗝𝗡𝗔𝗕 𝗞𝗢 𝗗𝗘𝗧𝗔 𝗛𝗨 𝗦𝗛𝗔𝗪𝗔𝗥𝗠𝗔 🌯",
        attachment: fs.createReadStream(filePath)
      });
      
      setTimeout(() => { try { fs.unlinkSync(filePath); } catch {} }, 5000);
    } catch (error) {
      console.error("Shawarma error:", error);
      return send.reply("Failed to get shawarma image.");
    }
  }
};
