import { Snowflake } from "discord.js";

interface IBotConfig {
    roles: {
        member: Snowflake;
    };
}

export type BotConfig = IBotConfig;