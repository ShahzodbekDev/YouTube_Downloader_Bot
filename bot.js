const Telegram = require("node-telegram-bot-api");
const fs = require("fs");
const ytdl = require("ytdl-core");



const bot = new Telegram("6242502171:AAEQyHZ0yU5yWvn7yJXDIUE6TlNn412BIUs", {
  polling: true,
});




bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const full_name = msg.from.first_name;
  const user_name = msg.from.username;

  if (msg.text === "/start") {
    bot.sendMessage(
      chatId,
      `Assalomu alaykum <b>${full_name}</b> botga xush kelibsiz!\nBotga biror bir YouTube link tashlang. Men sizga videosini yuklab beraman.`,
      {
        parse_mode: "HTML",
      }
    );

  } else if (ytdl.validateURL(msg.text)) {
    async function botSendVideo(){


      try {
        let info = await ytdl.getInfo(msg.text);
        let title = info.videoDetails.keywords[0];

    
        ytdl(msg.text).pipe(fs.createWriteStream(`videos/${title}.mp4`));

          setTimeout(async () => {

            const video = fs.createReadStream()(`videos/${title}.mp4`);

            await bot.sendVideo(chatId, video, {
              caption: `<b>${title}</b>`,
              parse_mode: "HTML",
            });
        }, 5000)
      
      } catch (error) {
        console.log(error);
      }
    }

    botSendVideo();


    


     

  }
});

