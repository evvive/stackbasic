export enum Status {
    BEGIN,
    NORMAL,
    END
}

export enum Level {
    INFO,
    WARNING,
    ERROR,
    FATAL
}

export class LoggerException {
    public message: string;

    constructor(message: string) {
        this.message = message;

        return;
    }

}

export class Logger {
    private fileName: string;

    public constructor(fileName: string) {
        this.fileName = fileName;

        return;
    }

    private convertLevel(level: Level = Level.INFO): string {
        switch (level) {
            case (Level.INFO):
                return "INFO: ";
            case (Level.WARNING):
                return "WARNING: ";
            case (Level.ERROR):
                return "ERROR: ";
            case (Level.FATAL):
                return "FATAL: ";
            default:
                throw new LoggerException("Invalid level");
        }
    }

    public print(level: Level, s: string, status: Status = Status.NORMAL) {
        switch (status) {
            case (Status.NORMAL):
                console.log(this.fileName + " " + this.convertLevel(level) + s);
        }
    }
}
