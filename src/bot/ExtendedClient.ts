import { Client, Collection } from "discord.js";
import { Database } from "../database/Database";
import { Logger } from "../util";
import { ICommand } from "./ICommand";

export class ExtendedClient extends Client {
    public commands: Collection<string, ICommand> = new Collection<string, ICommand>;
    public database: Database = new Database("../../data/database.json");
    public logger: Logger = new Logger("../log/UnityBot.log");
}