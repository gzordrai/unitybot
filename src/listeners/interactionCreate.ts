import { CommandInteraction, Client, Interaction, ButtonInteraction, Role, GuildMemberRoleManager } from "discord.js";
import { JsonDB } from "node-json-db";
import { commands } from "../commands";
import { ICommand } from "../ICommand";

export default (client: Client, database: JsonDB): void => {
    client.on("interactionCreate", async (interaction: Interaction) => {
        if (interaction.isCommand())
            await handleSlashCommand(client, interaction, database);
        else if (interaction.isButton())
            await handleButton(client, interaction, database);
    })
}

const handleSlashCommand = async (client: Client, interaction: CommandInteraction, database: JsonDB): Promise<void> => {
    const slashCommand: ICommand | undefined = commands.find((c: ICommand) => c.name === interaction.commandName);

    if (!slashCommand) {
        interaction.followUp({ content: "An error has occurred" });
        return;
    }

    await interaction.deferReply();
    slashCommand.run(client, interaction, database);
}

const handleButton = async (client: Client, interaction: ButtonInteraction, database: JsonDB): Promise<void> => {
    let message: string = "";

    if(interaction.inCachedGuild()) {
        const role: Role = interaction.guild.roles.cache.get(interaction.customId)!;
        const userRoles: GuildMemberRoleManager = interaction.member.roles;

        message += `Le rôle ${role.name}`;

        if(!userRoles.cache.get(role.id)) {
            interaction.member.roles.add(role);
            message += " a été ajouté avec succès !";
        } else {
            interaction.member.roles.remove(role);
            message += " a été supprimé avec succès !";
        }

        if(!(await database.exists(`/${interaction.user.id}`)))
            database.push(`/${interaction.user.id}`, { role: true, presentation: false }, true);
        else
            database.push(`/${interaction.user.id}/role`, true, true);
    }

    await interaction.reply({ content: message, ephemeral: true });
}