const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: 'samosa',
    aliases: ['sm'],
    description: 'Random samosa image',
    credits: 'SARDAR RDX',
    usage: 'samosa',
    category: 'Fun',
    prefix: true
  },

  async run({ api, event, send }) {
    const { threadID, messageID } = event;
    
    const links = [
      "https://i.postimg.cc/BQkc59ym/a89aa57e7b91c725708482abed87c1cf.jpg",
      "https://i.postimg.cc/6QwZz9hf/d2e19e4f86ed65d1c53731226a8a25a7.jpg",
      "https://i.postimg.cc/Vk9rJxcr/120edd3b880f0753962a56f7b5c01d1d.jpg",
      "https://i.postimg.cc/QVGCtb4J/b0fabd4c29ac8e499b64dc2990b2c78a.jpg",
      "https://i.postimg.cc/YS9WTdJv/7c1e0f89d45343a1cf764ce8ac8a10a8.jpg",
      "https://i.postimg.cc/zvnbT6Rc/018944cacf0bd71083fb8786897aaf2f.jpg",
      "https://i.postimg.cc/3J1W7gjm/9b139719f15cf31bc88352e81c0985c8.jpg",
      "https://i.postimg.cc/vB5HK9H1/84fa279dc94301c9bb6d627eb6d612e4.jpg"
    ];

    api.setMessageReaction("🤤", messageID, () => {}, true);

    try {
      const cacheDir = path.join(__dirname, "cache");
      if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });
      
      const selectedLink = links[Math.floor(Math.random() * links.length)];
      const filePath = path.join(cacheDir, `samosa_${Date.now()}.jpg`);
      
      const response = await axios.get(selectedLink, { responseType: 'arraybuffer' });
      fs.writeFileSync(filePath, response.data);
      
      await send.reply({
        body: "𝗔𝗖𝗛𝗔 𝗚 𝗟𝗚𝗧𝗔 𝗕𝗛𝗢𝗢𝗞 𝗟𝗚 𝗚𝗔𝗘𝗬 𝗛𝗬 𝗝𝗡𝗔𝗕 𝗞𝗢 𝗗𝗘𝗧𝗔 𝗛𝗨 𝗦𝗔𝗠𝗢𝗦𝗔 🥟",
        attachment: fs.createReadStream(filePath)
      });
      
      setTimeout(() => { try { fs.unlinkSync(filePath); } catch {} }, 5000);
    } catch (error) {
      console.error("Samosa error:", error);
      return send.reply("Failed to get samosa image.");
    }
  }
};
