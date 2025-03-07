import {readFileSync} from "node:fs";
import {resolve} from "node:path";
import {Command} from "commander";
import {IPackage} from "../types/package";

let cliInstance: Command | undefined;

export function serializeArgv(argv: string | string[]): string[] {
    return typeof argv === "string" ? [argv] : argv;
}

export function packageInfo(): IPackage {
    return JSON.parse(`${readFileSync(`${resolve(process.cwd(), './package.json')}`)}`)
}

export function cli(): Command {
    cliInstance = cliInstance instanceof Command ? cliInstance : new Command();
    return cliInstance;
}
