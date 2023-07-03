import { GatewayIntentBits } from "discord.js";
import { config } from "dotenv";
import path from "path";
import { ExtendedClient } from "./bot";

config({ path: path.join(__dirname, "../.env") });

const client: ExtendedClient = new ExtendedClient({
    intents: [
        GatewayIntentBits.Guilds
    ],
    partials: []
});

(async () => {
    await client.loadCommands();
    await client.loadEvents();

    client.login(process.env.TOKEN);
})()