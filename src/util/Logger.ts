import { appendFile, openSync } from "fs";

export class Logger {
    private path: string;

    public constructor(p: string) {
        this.path = p;
        openSync(this.path, 'w');
    }

    private update(message: string): void {
        appendFile(this.path, `\n[${new Date()}] ${message}`, (err) => {
            if (err) throw err;
        })
    }

    public error(message: string): void {
        this.update(`ERROR: ${message}`);
    }

    public info(message: string): void {
        this.update(`INFO: ${message}`);
    }

    public warn(message: string): void {
        this.update(`WARN: ${message}`);
    }
}