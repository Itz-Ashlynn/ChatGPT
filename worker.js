// Made by https://t.me/Ashlynn_Repository
const TOKEN = "7370426549:AAGmmLjFeBcJ-QA3w7z_824hzTzn0HbuJik"; // Get it from @BotFather https://core.telegram.org/bots#6-botfather
const CHAT_ID = -1002096709659; // Integer, Chat ID of your Telegram chat. If you don't want to verify, set to null
// Made by https://t.me/Ashlynn_Repository
const WEBHOOK = "/endpoint";
const SECRET = "WEBHOOK_SECRET";
// Made by https://t.me/Ashlynn_Repository
class AIUncensored {
  constructor() {
    this.url = "https://doanything.ai/api/chat";
    this.headers = {
      "Content-Type": "application/json",
      "Accept": "*/*",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
      "Origin": "https://doanything.ai",
      "Sec-Fetch-Site": "same-origin",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Dest": "empty",
      "Accept-Language": "en-US,en;q=0.9"
    };
  }
// Made by https://t.me/Ashlynn_Repository
  async fetchResponse(query) {
    const payload = {
      model: {
        id: "gpt-3.5-turbo-0613",
        name: "GPT-3.5",
        maxLength: 12000,
        tokenLimit: 4000
      },
      messages: [{ role: "user", content: query, pluginId: null }],
      prompt: "You are a smart, responsive AI assistant, designed to deliver clear, relevant, and efficient responses to support users' needs across a range of tasks.",
      temperature: 0.7
    };
// Made by https://t.me/Ashlynn_Repository
    try {
      const response = await fetch(this.url, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(payload)
      });
// Made by https://t.me/Ashlynn_Repository
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
// Made by https://t.me/Ashlynn_Repository
      const responseText = await response.text();
      try {
        const jsonResponse = JSON.parse(responseText);
        return jsonResponse.text || "Received response but no message returned";
      } catch {
        return responseText;
      }
// Made by https://t.me/Ashlynn_Repository
    } catch (error) {
      console.error('Error fetching AI response:', error);
      return "Error fetching AI response: " + error.message;
    }
  }
}
// Made by https://t.me/Ashlynn_Repository
addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (url.pathname === WEBHOOK) {
    event.respondWith(handleWebhook(event));
  } else if (url.pathname === "/registerWebhook") {
    event.respondWith(registerWebhook(event, url, WEBHOOK, SECRET));
  } else if (url.pathname === "/unRegisterWebhook") {
    event.respondWith(unRegisterWebhook(event));
  } else {
    event.respondWith(new Response(null, { status: 404 }));
  }
});
// Made by https://t.me/Ashlynn_Repository
function handleWebhook(event) {
  if (event.request.headers.get("X-Telegram-Bot-Api-Secret-Token") !== SECRET) {
    return new Response("Unauthorized", { status: 403 });
  }

  const handler = async function () {
    const update = await event.request.json();
    await onUpdate(update);
  };
  event.waitUntil(handler());
  return new Response("Ok");
}

async function onUpdate(update) {
  if ("message" in update) {
    const message = update.message;
    if (!message.text) {
      await sendMarkdown(message.chat.id, "Sorry, I can only process text messages. Please send text instead of media, stickers, or other message types.");
      return;
    }

    await onMessage(message);
  }
}
// Made by https://t.me/Ashlynn_Repository
async function onMessage(message) {
  if (CHAT_ID && message.chat.id !== CHAT_ID) return false;
// Made by https://t.me/Ashlynn_Repository
  const text = message.text.trim();
// Made by https://t.me/Ashlynn_Repository
  if (text === "/start") {
    return sendStartMessage(message.chat.id);
  } else if (text === "/about") {
    return sendHelpMessage(message.chat.id);
  } else {
    await sendTyping(message.chat.id);
    try {
      const ai = new AIUncensored();
      const aiResponse = await ai.fetchResponse(text);
      return sendMarkdown(message.chat.id, aiResponse);
    } catch (error) {
      return sendMarkdown(message.chat.id, "Error fetching AI response: " + error.message);
    }
  }
}
async function sendStartMessage(chatId) {
  const videoUrl = "https://file-stream.darkhacker7301.workers.dev/?file=MzA2OTMxOTgxMzI2MzkwOTAwLzEwNDczMTM0NA"; // Replace with actual video URL
  const caption = "→ I ᴀᴍ CʜᴀᴛGPT X, I'm Devloped to answer your Question Made by @ITZ_IND_CODER In India 🇮🇳\n\n🌎Wʜᴀᴛ ɪs Nᴇᴡ?\n→ Hᴀᴠᴇ ᴀ ғʀᴇᴇ ᴄʜᴀᴛ ɢᴘᴛ ʙᴏᴛ  sᴇʀᴠɪᴄᴇ ᴀᴛ ᴛʜᴇ ᴍᴏᴍᴇɴᴛ sᴏ ʏᴏᴜ ᴄᴀɴ ᴀsᴋ ᴀɴʏ ǫᴜᴇsᴛɪᴏɴs ʏᴏᴜ ᴡᴀɴᴛ.";

  await fetch(apiUrl("sendVideo"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      video: videoUrl,
      caption: caption,
      parse_mode: "HTML"
    })  
  });
}
// Made by https://t.me/Ashlynn_Repository
async function sendHelpMessage(chatId) {
  const helpMessage = `
╔════❰ Cʜᴀᴛɢᴘᴛ X ❱═❍
║╭━━━━━━━━━━━━━━━➣
║┣⪼🤖ᴍʏ ɴᴀᴍᴇ  : Cʜᴀᴛɢᴘᴛ 
║┣⪼👦ᴅᴇᴠᴇʟᴏᴘᴇʀ: [INDIAN CODER ⚡](https://telegram.me/@ITZ_IND_CODER)
║┣⪼❣️ᴜᴘᴅᴀᴛᴇ   : [INDIAN CODERS 🔰](https://telegram.me/THE_IND_CODERS)
║┣⪼🗣️ʟᴀɴɢᴜᴀɢᴇ : [JS 💻](https://nodejs.org/en)
║┣⪼🧠ʜᴏsᴛᴇᴅ   : [ᴄʟᴏᴜᴅғʟᴀʀᴇ⚡](https://dash.cloudflare.com/)
║┣⪼📚ᴜᴘᴅᴀᴛᴇᴅ  : 3-Nov-2024
║┣⪼🗒️ᴠᴇʀsɪᴏɴ  : v1.01.1
║╰━━━━━━━━━━━━━━━➣ 
╚══════════════════❍
  `;

  await sendMarkdown(chatId, helpMessage);
}
// Made by https://t.me/Ashlynn_Repository
async function sendPlainText(chatId, text) {
  return (
    await fetch(
      apiUrl("sendMessage", {
        chat_id: chatId,
        text,
      })
    )
  ).json();
}
// Made by https://t.me/Ashlynn_Repository
async function sendMarkdown(chatId, text) {
  return (
    await fetch(
      apiUrl("sendMessage", {
        chat_id: chatId,
        text,
        parse_mode: "markdown",
      })
    )
  ).json();
}
// Made by https://t.me/Ashlynn_Repository
async function sendTyping(chatId) {
  return (
    await fetch(
      apiUrl("sendChatAction", {
        chat_id: chatId,
        action: "typing",
      })
    )
  ).json();
}
// Made by https://t.me/Ashlynn_Repository
async function registerWebhook(event, requestUrl, suffix, secret) {
  const webhookUrl = `${requestUrl.protocol}//${requestUrl.hostname}${suffix}`;
  const r = await (
    await fetch(apiUrl("setWebhook", { url: webhookUrl, secret_token: secret }))
  ).json();
  return new Response("ok" in r && r.ok ? "Ok" : JSON.stringify(r, null, 2));
}
// Made by https://t.me/Ashlynn_Repository
async function unRegisterWebhook(event) {
  const r = await (await fetch(apiUrl("setWebhook", { url: "" }))).json();
  return new Response("ok" in r && r.ok ? "Ok" : JSON.stringify(r, null, 2));
}
// Made by https://t.me/Ashlynn_Repository
function apiUrl(methodName, params = null) {
  let query = "";
  if (params) {
    query = "?" + new URLSearchParams(params).toString();
  }
  return `https://api.telegram.org/bot${TOKEN}/${methodName}${query}`;
}
