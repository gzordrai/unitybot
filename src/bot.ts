import { Client, Intents } from "discord.js";
import { config } from "dotenv";
import path from "path";

config({ path: path.resolve(__dirname, "../.env") })

const token: string = process.env.TOKEN!;
const client: Client = new Client({
    intents: [
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
});

console.log("Bot is starting...");

client.login(token);