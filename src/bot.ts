import { Telegraf, Context } from "telegraf";
import { getRandomQuote } from "./api-client";
require('dotenv').config()

function getEnvVar(envVar: string) {
    if (!process.env[envVar]) {
        throw Error(`Env var is missing, var: ${envVar}`)
    }

    return process.env[envVar]!;
}

const bot = new Telegraf(getEnvVar('BOT_TOKEN'));

bot.command("start", (ctx) => ctx.reply(`Привет, ${ctx.message.from.first_name} 🙋‍♂️!\n
Это команды которые ты можешь использовать:\n
/start - чтобы начать диалог со мной 🤖\n
/randomquote - чтобы получить рандомную реч с рандомного аниме🌌\n`));
bot.command("randomquote", async (ctx) => {
    await sendRandomQuote(ctx, ctx.chat.id)
})

bot.action('more-quotes', async (ctx) => {
    await ctx.editMessageReplyMarkup(undefined);
    await ctx.deleteMessage();

    if (!ctx.chat?.id) {
        return await ctx.sendMessage("Can't find your chat id 😭")
    }
    try {
        await sendRandomQuote(ctx, ctx.chat.id)
    } catch (e) {
        console.error(e)
        await ctx.sendMessage("Can't retrieve random quote, seems API is broken 😭")
    }
})

bot.action('stop-quotes', async (ctx) => {
    await ctx.editMessageReplyMarkup(undefined);
    await ctx.deleteMessage();

    if (!ctx.chat?.id) {
        return await ctx.sendMessage("Can't find your chat id 😭")
    }
    await ctx.sendMessage("Gotcha 👌! Have a nice day my pretty human 😘")
})

async function sendRandomQuote(ctx: Context, chatId: string | number) {
    const data = await getRandomQuote();
    await ctx.replyWithHTML(`<b>Anime</b>: ${data.anime}\n<b>Character</b>: ${data.character}\n<b>Quote</b>: <i>${data.quote}</i>`);
    await ctx.telegram.sendMessage(chatId, 'Want more? 😎', {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Yasss 🙏', callback_data: 'more-quotes' },
                    { text: "I got my dopamine dose 😊", callback_data: 'stop-quotes' }
                ]
            ]
        }
    })
}

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

export default bot;