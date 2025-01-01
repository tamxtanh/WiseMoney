import { Command } from "./command";

export class CommandInvoker {
    private commands: Command[] = [];

    addCommand(command: Command) {
        this.commands.push(command);
    }

    async executeCommands() {
        for (const command of this.commands) {
            await command.execute();
        }
        this.commands = [];
    }
}
