import { Logger, Level } from "./logger";

const log: Logger = new Logger("StackBasic");

log.print(Level.INFO, "Logger started");
