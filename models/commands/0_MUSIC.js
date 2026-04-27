const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');
const yts = require('yt-search');

module.exports.config = {
    name: "music",
    version: "20.1.0",
    hasPermssion: 0,
    credits: "Ahmad RDX",
    description: "RDX Style Array Frames Music with Gifted API",
    commandCategory: "media",
    usages: "[song name]",
    cooldowns: 15
};

module.exports.run = async function ({ api, event, args }) {
    const { threadID, messageID } = event;
    const query = args.join(" ");
    if (!query) return api.sendMessage("『 𝗔𝗛𝗠𝗔𝗗 𝗥𝗗𝗫 』→ Gaana likho ustad!", threadID, messageID);

    // --- AAPKE PREMIUM FRAMES ---
    const frames = [
        "[░░░░░░░░░░] 𝟭𝟬%",
        "[▓▓▓░░░░░░░] 𝟯𝟬%",
        "[▓▓▓▓▓▓░░░░] 𝟲𝟬%",
        "[▓▓▓▓▓▓▓▓░░] 𝟴𝟬%",
        "[▓▓▓▓▓▓▓▓▓▓] 𝟭𝟬𝟬%"
    ];

    const header = "┏━━━━━━━ ✵ ━━━━━━━┓\n       𝗥𝗗𝗫 𝗠𝗨𝗦𝗜𝗖 𝗣𝗥𝗘𝗠𝗜𝗨𝗠\n┗━━━━━━━ ✵ ━━━━━━━┛";
    const footer = "⚡ 𝗔𝗵𝗺𝗮𝗱 𝗔𝗹𝗶 𝗦𝗮𝗳𝗱𝗮𝗿";

    const load = await api.sendMessage(`${header}\n━━━━━━━━━━━━━━━━━━━\n${frames[0]}\n🔍 𝗦𝗘𝗔𝗥𝗖𝗛𝗜𝗡𝗚...\n━━━━━━━━━━━━━━━━━━━\n${footer}`, threadID);

    try {
        const searchResults = await yts(query);
        const video = searchResults.videos[0];
        if (!video) return api.editMessage("❌ Not Found!", load.messageID);

        await api.editMessage(`${header}\n━━━━━━━━━━━━━━━━━━━\n${frames[1]}\n🎯 𝗙𝗢𝗨𝗡𝗗: ${video.title}\n━━━━━━━━━━━━━━━━━━━\n${footer}`, load.messageID);

        // 🛠️ NAYI API YAHAN LAGAYI GAYI HAI
        const res = await axios.get(`https://api.giftedtech.co.ke/api/download/savetubemp3?apikey=gifted&url=${encodeURIComponent(video.url)}`);
        
        // 🔗 Naye JSON structure ke mutabiq link extract karna
        if (!res.data || !res.data.success || !res.data.result.download_url) {
            throw new Error("API failed to provide a valid download link.");
        }
        const audioUrl = res.data.result.download_url;

        await api.editMessage(`${header}\n━━━━━━━━━━━━━━━━━━━\n${frames[2]}\n📥 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗜𝗡𝗚: Audio file...\n━━━━━━━━━━━━━━━━━━━\n${footer}`, load.messageID);

        const cacheDir = path.join(__dirname, "cache");
        await fs.ensureDir(cacheDir);
        const audioPath = path.join(cacheDir, `${Date.now()}.mp3`);
        
        const audioRes = await axios.get(audioUrl, { responseType: 'arraybuffer' });
        fs.writeFileSync(audioPath, Buffer.from(audioRes.data));

        await api.editMessage(`${header}\n━━━━━━━━━━━━━━━━━━━\n${frames[3]}\n🛠️ 𝗣𝗥𝗢𝗖𝗘𝗦𝗦𝗜𝗡𝗚: Optimization...\n━━━━━━━━━━━━━━━━━━━\n${footer}`, load.messageID);

        await api.sendMessage({
            body: `┏━━━━━━━ ✵ ━━━━━━━┓\n       𝗠𝗨𝗦𝗜𝗖 𝗗𝗘𝗟𝗜𝗩𝗘𝗥𝗘𝗗\n┗━━━━━━━ ✵ ━━━━━━━┛\n━━━━━━━━━━━━━━━━━━━\n🎵 **𝗧𝗶𝘁𝗹𝗲:** ${video.title}\n⏱️ **𝗧𝗶𝗺𝗲:** ${video.timestamp}\n━━━━━━━━━━━━━━━━━━━\n⚡ 𝗔𝗵𝗺𝗮𝗱 𝗔𝗹𝗶 𝗦𝗮𝗳𝗱𝗮𝗿`,
            attachment: fs.createReadStream(audioPath)
        }, threadID, () => {
            fs.unlinkSync(audioPath);
            api.unsendMessage(load.messageID);
        }, messageID);

    } catch (e) {
        console.error("RDX MUSIC ERROR:", e);
        api.unsendMessage(load.messageID);
        return api.sendMessage("❌ Error: API Busy ya Link expired!", threadID, messageID);
    }
};
