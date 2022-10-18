import { Client, GatewayIntentBits, Partials  } from "discord.js";
import { config } from "dotenv";
import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";
import path from "path";
import interactionCreate from "./listeners/interactionCreate";
import ready from "./listeners/ready";

config({ path: path.resolve(__dirname, "../.env") })

const token: string = process.env.TOKEN!;
const client: Client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
    ],
    partials: [
        Partials.Channel,
    ]
});
const database: JsonDB = new JsonDB(new Config(path.resolve(__dirname, "../data/database.json"), true, false, '/'));

console.log("Bot is starting...");

ready(client);
interactionCreate(client, database);

client.login(token);