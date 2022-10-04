import { Telegraf } from "telegraf";
import { getRandomQuote } from "./api-client";
require('dotenv').config()

function getEnvVar(envVar: string) {
    if (!process.env[envVar]) {
        throw Error(`Env var is missing, var: ${envVar}`)
    }

    return process.env[envVar]!;
}

const bot = new Telegraf(getEnvVar('BOT_TOKEN'));

bot.command("start", (ctx) => ctx.reply(`Привет, ${ctx.message.from.first_name} 🙋‍♂️!`));
bot.command("randomquote", async (ctx) => {
    const data = await getRandomQuote();
    ctx.replyWithHTML(`<b>Anime</b>: ${data.anime}\n<b>Character</b>: ${data.character}\n<b>Quote</b>: <i>${data.quote}</i>`);
})

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

export default bot;