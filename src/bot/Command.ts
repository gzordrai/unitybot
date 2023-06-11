import { ChatInputCommandInteraction, CommandInteraction, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from "discord.js";

export interface Command {
    data: SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> | SlashCommandSubcommandsOnlyBuilder;
    ephemeral: boolean;
    modal: boolean;
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}