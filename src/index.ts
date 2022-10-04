import bot from "./bot";

try {
    bot.launch();
    console.log('Started bot...')
} catch (e) {
    global.console.error(e);
    process.exit(1);
}