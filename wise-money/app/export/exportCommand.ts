import { Command } from "./command";
import { ExportReceiver } from "./receiver";


export class ExportCommand implements Command {
    private receiver: ExportReceiver;
    private data: any[];

    constructor(receiver: ExportReceiver, data: any[]) {
        this.receiver = receiver;
        this.data = data;
    }

    async execute(): Promise<void> {
        await this.receiver.exportToXLSX(this.data);
    }
}
