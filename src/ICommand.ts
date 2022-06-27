import { BaseCommandInteraction, ChatInputApplicationCommandData, Client } from "discord.js";
import { JsonDB } from "node-json-db";

export interface ICommand extends ChatInputApplicationCommandData {
    run: (client: Client, interaction: BaseCommandInteraction, database: JsonDB) => void;
} 