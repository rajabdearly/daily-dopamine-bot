import { Telegraf } from "telegraf";
require('dotenv').config()

function getEnvVar(envVar: string) {
    if (!process.env[envVar]) {
        throw Error(`Env var is missing, var: ${envVar}`)
    }

    return process.env[envVar]!;
}

const bot = new Telegraf(getEnvVar('BOT_TOKEN'));

bot.command("start", (ctx) => ctx.reply(`Привет, ${ctx.message.from.first_name} 🙋‍♂️!`));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

export default bot;