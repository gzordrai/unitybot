import { AzuriaClient } from "azuria";
import { format, transports } from "winston";
import { GatewayIntentBits } from "discord.js";
import { API_KEY, BotConfig, DISCORD_TOKEN } from "./config";

const client: AzuriaClient<BotConfig> = new AzuriaClient(
    {
        apiKey: API_KEY,
        baseDir: __dirname,
        intents: [
            GatewayIntentBits.Guilds,
        ],
        partials: [],
        loggerOptions: {
            format: format.combine(
                format.timestamp(),
                format.json()
            ),
            transports: [
                new transports.File({ filename: "combined.log" }),
                new transports.Console()
            ]
        }
    }
);

client.start(DISCORD_TOKEN);