const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');
const yts = require('yt-search');

module.exports.config = {
    name: "video",
    version: "20.1.0",
    hasPermssion: 0,
    credits: "Ahmad RDX",
    description: "RDX Style Array Frames Video with Gifted API (360p)",
    commandCategory: "media",
    usages: "[video title]",
    cooldowns: 30
};

module.exports.run = async function ({ api, event, args }) {
    const { threadID, messageID } = event;
    const query = args.join(" ");
    if (!query) return api.sendMessage("『 𝗔𝗛𝗠𝗔𝗗 𝗥𝗗𝗫 』→ Title do ustad!", threadID, messageID);

    const frames = [
        "[░░░░░░░░░░] 𝟭𝟬%",
        "[▓▓▓░░░░░░░] 𝟯𝟬%",
        "[▓▓▓▓▓▓░░░░] 𝟲𝟬%",
        "[▓▓▓▓▓▓▓▓░░] 𝟴𝟬%",
        "[▓▓▓▓▓▓▓▓▓▓] 𝟭𝟬𝟬%"
    ];

    const header = "┏━━━━━━━ ✵ ━━━━━━━┓\n       𝗥𝗗𝗫 𝗩𝗜𝗗𝗘𝗢 𝗣𝗥𝗘𝗠𝗜𝗨𝗠\n┗━━━━━━━ ✵ ━━━━━━━┛";
    const footer = "⚡ 𝗔𝗵𝗺𝗮𝗱 𝗔𝗹𝗶 𝗦𝗮𝗳𝗱𝗮𝗿";

    const load = await api.sendMessage(`${header}\n━━━━━━━━━━━━━━━━━━━\n${frames[0]}\n🔍 𝗔𝗡𝗔𝗟𝗬𝗭𝗜𝗡𝗚: ${query}\n━━━━━━━━━━━━━━━━━━━\n${footer}`, threadID);

    try {
        const searchResults = await yts(query);
        const video = searchResults.videos[0];
        if (!video) return api.editMessage("❌ Not Found!", load.messageID);

        await api.editMessage(`${header}\n━━━━━━━━━━━━━━━━━━━\n${frames[1]}\n🎬 𝗩𝗜𝗗𝗘𝗢: ${video.title}\n━━━━━━━━━━━━━━━━━━━\n${footer}`, load.messageID);

        // 🛠️ NAYI API YAHAN LAGAYI GAYI HAI (Quality 360 set kar di hai)
        const apiUrl = `https://api.giftedtech.co.ke/api/download/savetubemp4?apikey=gifted&quality=360&url=${encodeURIComponent(video.url)}`;
        const res = await axios.get(apiUrl);

        // 🔗 Naye JSON structure ke mutabiq link extract karna
        if (!res.data || !res.data.success || !res.data.result.download_url) {
            throw new Error("API failed to provide a valid download link.");
        }
        const videoUrl = res.data.result.download_url;

        await api.editMessage(`${header}\n━━━━━━━━━━━━━━━━━━━\n${frames[2]}\n📥 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗜𝗡𝗚: 360p Quality...\n━━━━━━━━━━━━━━━━━━━\n${footer}`, load.messageID);

        const cacheDir = path.join(__dirname, "cache");
        await fs.ensureDir(cacheDir);
        const videoPath = path.join(cacheDir, `${Date.now()}.mp4`);
        
        const videoRes = await axios.get(videoUrl, { responseType: 'arraybuffer' });
        fs.writeFileSync(videoPath, Buffer.from(videoRes.data));

        await api.editMessage(`${header}\n━━━━━━━━━━━━━━━━━━━\n${frames[3]}\n🚀 𝗦𝗧𝗔𝗧𝗨𝗦: Final Uploading...\n━━━━━━━━━━━━━━━━━━━\n${footer}`, load.messageID);

        await api.sendMessage({
            body: `┏━━━━━━━ ✵ ━━━━━━━┓\n       𝗩𝗜𝗗𝗘𝗢 𝗗𝗘𝗟𝗜𝗩𝗘𝗥𝗘𝗗\n┗━━━━━━━ ✵ ━━━━━━━┛\n━━━━━━━━━━━━━━━━━━━\n🎬 **𝗧𝗶𝘁𝗹𝗲:** ${video.title}\n📺 **𝗖𝗵𝗮𝗻𝗻𝗲𝗹:** ${video.author.name}\n⚙️ **𝗤𝘂𝗮𝗹𝗶𝘁𝘆:** 360p\n━━━━━━━━━━━━━━━━━━━\n⚡ 𝗔𝗵𝗺𝗮𝗱 𝗔𝗹𝗶 𝗦𝗮𝗳𝗱𝗮𝗿`,
            attachment: fs.createReadStream(videoPath)
        }, threadID, () => {
            fs.unlinkSync(videoPath);
            api.unsendMessage(load.messageID);
        }, messageID);

    } catch (e) {
        console.error("RDX VIDEO ERROR:", e);
        api.unsendMessage(load.messageID);
        return api.sendMessage("❌ Error: API Busy ya Video limit se bari hai!", threadID, messageID);
    }
};
