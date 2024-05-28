import { config } from "dotenv";
import path from "path";

config({ path: path.resolve(__dirname, "../../.env")});

if (!process.env.DISCORD_TOKEN)
    throw new Error("No token provided");

if (!process.env.API_KEY)
    throw new Error("No API key provided");

export const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
export const API_KEY = process.env.API_KEY;