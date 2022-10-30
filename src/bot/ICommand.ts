import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { ExtendedClient } from "./ExtendedClient";

export interface ICommand {
    data: SlashCommandBuilder;
    execute: (client: ExtendedClient, interaction: CommandInteraction) => Promise<void>;
}