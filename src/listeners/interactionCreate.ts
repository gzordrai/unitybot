import { CommandInteraction, Client, Interaction, ButtonInteraction, Role, GuildMemberRoleManager } from "discord.js";
import { JsonDB } from "node-json-db";
import { commands } from "../commands";
import { ICommand } from "../ICommand";

export default (client: Client, database: JsonDB): void => {
    client.on("interactionCreate", async (interaction: Interaction) => {

        if(!(await database.exists(`/${interaction.user.id}`)))
            database.push(`/${interaction.user.id}`, { role: false, presentation: false }, true);

        if (interaction.isCommand())
            await handleSlashCommand(client, interaction, database);
        else if (interaction.isButton())
            await handleButton(client, interaction, database);

        if((await database.getData(`/${interaction.user.id}/role`)) === true && (await database.getData(`/${interaction.user.id}/presentation`)) === true) {
            if(interaction.inCachedGuild()) {
                const role: Role = interaction.guild.roles.cache.get(process.env.MEMBER_ROLE_ID!)!;

                interaction.member.roles.add(role);
            }
        }
    })
}

const handleSlashCommand = async (client: Client, interaction: CommandInteraction, database: JsonDB): Promise<void> => {
    const slashCommand: ICommand | undefined = commands.find((c: ICommand) => c.name === interaction.commandName);

    if (!slashCommand)
        interaction.followUp({ content: "An error has occurred" });
    else {
        await interaction.deferReply();
        slashCommand.run(client, interaction, database);
    }
}

const handleButton = async (client: Client, interaction: ButtonInteraction, database: JsonDB): Promise<void> => {
    let message: string = "-";

    await interaction.deferReply({ ephemeral: true })

    if(interaction.inCachedGuild()) {
        const role: Role = interaction.guild.roles.cache.get(interaction.customId)!;
        const userRoles: GuildMemberRoleManager = interaction.member.roles;

        message = `Le rôle ${role.name}`;

        if(!userRoles.cache.get(role.id)) {
            userRoles.add(role);
            message += " a été ajouté avec succès !";
        } else {
            userRoles.remove(role);
            message += " a été supprimé avec succès !";
        }

        database.push(`/${interaction.user.id}/role`, true, true);
    }

    await interaction.editReply({ content: message });
}