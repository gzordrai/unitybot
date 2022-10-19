import { ApplicationCommandType, CommandInteraction, Client, CommandInteractionOption, CacheType, ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import { JsonDB } from "node-json-db";
import { ICommand } from "../ICommand";

export const test: ICommand = {
    name: "presentation",
    description: "votre présentation aux membres du discord",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "metier_etudes",
            description: "Votre metier et/ou vos études",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "a_propos",
            description: "Une petite presentation de vous",
            type: ApplicationCommandOptionType.String,
            required: true,
            min_length: 30
        },
        {
            name: "xp_unity",
            description: "Votre experience sur unity",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "but",
            description: "Votre but sur le discord",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    run: async (client: Client, interaction: CommandInteraction, database: JsonDB) => {
        const data: readonly CommandInteractionOption<CacheType>[] = interaction.options.data;

        const embed = new EmbedBuilder()
            .setColor("Blue")
            .setTitle(`Présentation de ${interaction.user.username}`)
            .addFields(
                { name : "Métier et études:", value: `${data[0].value}`},
                { name : "Qui êtes vous:", value: `${data[1].value}`},
                { name : "XP Unity :", value: `${data[2].value}`},
                { name : "But sur le discord :", value: `${data[3].value}`}
            );

        database.push(`/${interaction.user.id}/presentation`, true, true);

        await interaction.followUp({
            ephemeral: true,
            embeds: [embed]
        });
    }
}