import { Snowflake } from "discord.js";

interface IBotConfig {
    roles: {
        artist: Snowflake;
        developper: Snowflake;
        hobbyist: Snowflake;
        member: Snowflake;
        musician: Snowflake;
        student: Snowflake;
    };
}

export type BotConfig = IBotConfig;