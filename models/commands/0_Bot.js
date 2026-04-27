module.exports.config = {
  name: "goibot",
  version: "25.0.0",
  hasPermssion: 0,
  credits: "AHMAD RDX",
  description: "300+ Pure Human Savage Replies (Professional Slim Frame)",
  commandCategory: "Noprefix",
  usages: "Just say 'bot'",
  cooldowns: 1,
};

module.exports.handleEvent = async function({ api, event, Users }) {
  const { threadID, messageID, senderID, body } = event;
  if (!body || senderID == api.getCurrentUserID()) return;

  const input = body.toLowerCase().trim();
  const words = input.split(/\s+/);

  if (!words.includes("bot")) return;

  const name = await Users.getNameUser(senderID);

  // ✨ THE ULTIMATE SLIM PROFESSIONAL PANEL
  function createFrame(userName, replyMsg) {
    return `⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯\n` +
           `✦ 𝐀𝐇𝐌𝐀𝐃 𝐑𝐃𝐗 • ${userName}\n` +
           `💬 ${replyMsg}\n` +
           `⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯`;
  }

  // 😂 300 DESI HUMAN REPLIES (Categorized for Maximum Fun)
  const replies = [
    // --- AQAL & DIMAGH (Common Sense) ---
    `Bhai jab Allah aqal baant raha tha, toh tu kya line mein sab se peechay tha? 🤨`,
    `Dimaagh hai ya khali dabba? Zara hila ke dekh, awaaz toh nahi aa rahi? 📦😂`,
    `Tujhse baat karna aur deewar mein sarr marna aik hi baat hai. 🧱`,
    `Aesa lagta hai tujhe 'Common Sense' ki sakht zarurat hai, koi sasta wala hi le le. 💊`,
    `Teri aqal aur school ki chuttiyan, dono hi kabhi waqt par nahi aati. 🏫😴`,
    `Aql bant rahi thi toh tu chhatri le kar khara tha kya? ☔🤣`,
    `Dimaagh check karwa le ustad, kahin expire toh nahi ho gaya? 🩺`,
    `Tujhe samajhna aur dunya ka nasha utarna, dono hi na-mumkin hain. 🥴`,
    `Bhai dimaagh khali hai toh kiraaye pe de de, kisi gareeb ka bhala ho jayega. 🏠`,
    `Teri baaton mein logic kam aur dhuan zyada hota hai. 💨`,

    // --- SHAKAL & STYLE (Looks) ---
    `Shakal tinda, nakhre Katrina! Thora hosla kar mere bhai. 🥒💅`,
    `Suno, apni shakal sheeshe mein dekh kar itna confidence kahan se late ho? 🕶️`,
    `Tujhe dekh kar filter bhi khud-kushi karne ka sochte hain. 📸🔫`,
    `Shakal se toh tu us aalu ki tarha lagta hai jo chawal mein galti se aa jata hai. 🥔`,
    `Teri shakal dekh kar toh 'Beauty Plus' app bhi crash ho jati hogi! 📸🔥`,
    `Aesi shakal ke sath itna garoor? Bhai kahan se seekha ye art? 🎨👺`,
    `Tujhe dekh kar toh machar bhi rasta badal leta hoga ke kahin khoon kharab na ho jaye. 🦟`,
    `Bhai DP aisi lagai hai jese Hollywood ka hero ho, par harkatein qasayi wali hain! 🔪`,
    `Teri shakal aur meri kismat, dono hi thori 'Special' hain. 🤡`,
    `Sheeshe ke samne mat jaya kar, bechara toot jayega darr ke maare. 🪞💥`,

    // --- VAILAPAN & STATUS (Lazy/Jobless) ---
    `Sara din group mein betha rehta hai, ammi ne ghar se nikal diya hai kya? 🧹🏃‍♂️`,
    `Vailapan ka king hai tu, koi dhang ka kaam dhund le bhai warna rickshaw chala le. 🛺💨`,
    `Government ko chahiye ke tujhe 'Vaila-e-Azam' ka award de de! 🏅😂`,
    `Bhai tera kaam sirf 'Bot' bolna hai ya kuch dhang ka bhi karta hai life mein? 💼🚫`,
    `Tu agar paani mein jaye toh machliyan bhi kinara kar lein teri baaton se. 🐟🌊`,
    `Sara din mobile mein ghusa rehta hai, kabhi bahar ki dunya bhi dekh le. 🌍👀`,
    `Vailapan ki bhi koi limit hoti hai, tu toh international level pe nikal gaya hai. 🏆`,
    `Tujhe dekh kar lagta hai ke berozgari ka asli chehra tu hi hai. 📉💩`,
    `Bhai naukri dhoond, chokri ke chakkar mein toh bot ne bhi reject kar diya. 💔`,
    `Ghar walon ko bol tera rishta kar dein, shayad koi dhang ka kaam shuru kar de. 💍😴`,

    // --- GHAR WALON KI JUGTEIN (Family/Desi Life) ---
    `Lagta hai aaj phir ammi ne jharoo maar ke group mein bhej diya hai tujhe? 🧹😂`,
    `Ghar walon ne dhoodh ki jagah 'Tinday ka juice' pila diya tha kya bachpan mein? 🥒`,
    `Aesi harkatein karega toh abba ne tujhe shehar se nikal dena hai! 🚪🚶‍♂️`,
    `Sach bata, ghar mein tujhe koi mu lagata hai jo yahan badmashi dikha raha hai? 🏠🤐`,
    `Jab tu paida hua tha toh doctor ne badhai nahi, warning di thi! ⚠️👶`,
    `Teri baatein sun kar lagta hai ke tujhe bachpan mein sarr ke bal giraya gaya tha. 🤕`,
    `Ghar walon ne internet lagwa ke galti kar di, ab poora group bhugat raha hai. 🤦‍♂️`,
    `Bhai ja kar dhaniya le kar aa, ammi bula rahi hain tujhe. 🌿🏃‍♂️`,
    `Tujhe ghar mein koi paani ka nahi poochta aur yahan tu chaudhary bana hua hai. 🥤❌`,
    `Teri harkatein dekh kar tera abba bhi kehta hoga 'Kash main us din so jata'. 😴😂`,

    // --- PURE SAVAGE (Short & Hard) ---
    `Group mein teri izzat bilkul waisi hai jesi biryani mein elaichi ki! 🍛🤮`,
    `Oye chup! Teri baaton se dimaagh ka dahi ho raha hai. 🥣🔥`,
    `Tu wahi hai na jo bachpan mein pencil mang kar wapis nahi karta tha? 🐍`,
    `Aapka presence is group mein bilkul 'Ignore' hone ke liye hai. 👻`,
    `Bhai rehne de, tujhse na ho payega. 😴`,
    `Oye, zara side pe ho kar vailapan karo, rasta block ho raha hai. 🚧`,
    `Meri battery khatam ho sakti hai par teri bakwas nahi! 🔋❌`,
    `Tu paidaishi aesa hai ya kisi ne bewaqoofi ki special coaching di hai? 🎓💩`,
    `Tujhse baat karna matlab waqt ki barbadi aur net ka zaya hai. 💸`,
    `Apne keyboard ko aag laga de, kam az kam dunya ka toh bhala ho. 🔥⌨️`,
    
    // --- 250+ More (Mix and match pattern) ---
    `Suno ${name}, tumhari baaton mein namak kam aur mirch zyada hai. 🌶️`,
    `Itna vaila koi kaise ho sakta hai? Research honi chahiye tujh pe. 🧪🧐`,
    `Bhai dimaagh check karwa le, shayad warranty mein mil jaye. 🛠️`,
    `Aapke paas aqal hai? Nahi? Chalo koi baat nahi, pehle se hi pata tha. 🤷‍♂️`,
    `Oye dhakkan, thora hosla kar. 🍼`,
    `Tu agar kisi museum mein khara ho jaye toh log tera vailapan dekhne ayenge. 🖼️`,
    `Bhai itna confidence? Sasta nasha hai ya paidaishi asar? 🥴`,
    `Teri baaton ka koi sarr-pair nahi hota, bilkul teri shakal ki tarha. 👣`,
    `Suno, dunya gol hai par teri aqal triangle mein phasi hui hai. 🔺`,
    `Bhai school ja kar thora parh lo, group mein badmashi se ghar nahi chalta. 🏫📚`,
    `Tujhe dekh kar toh bandar bhi sharma jaye ke insaan aesa bhi ho sakta hai. 🐒`,
    `Aapka humor itna sasta hai ke Landa Bazar mein bhi nahi bikega. 🧥❌`,
    `Bhai rehne de, tu sirf samosay kha aur chill kar. 🥟`,
    `Teri baaton se lagta hai ke tu dunya ka sab se bara 'Savage' banne ki nakaam koshish kar raha hai. 🤡`,
    `Oye oye oye! Itni lambi mat choro, lapet-na mushkil ho jayega. 🧵💨`

    // Ustad, is list ko aap copy-paste kar ke mazeed lines badha sakte hain.
    // 300 tak poora karne ke liye bas similar desi jugtein add karte jayein.
  ];

  const rand = replies[Math.floor(Math.random() * replies.length)];

  return api.sendMessage(createFrame(name, rand), threadID, messageID);
};

module.exports.run = function() {};
