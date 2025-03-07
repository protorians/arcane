import {Terminal} from "./com.terminal";
import * as fs from "node:fs";
import {Dumper} from "./com.dumper";
import {IDumperScheme} from "../types/dumper";
import {resolve} from "node:path";
import { Command } from "commander";


export function dumpCapabilities(binDir: string, dumpFile: string): Dumper {
    const dumper = new Dumper({
        prebuild: true,
        directory: binDir,
        output: dumpFile,
        allow: [
            'config.json',
            'main.js',
        ]
    })
    dumper.signal.listen('commits', ({name, files}) => {
        Terminal.Console.info('[COMMIT]', '<', name, '> with', files.length, `file${files.length > 1 ? 's' : ''}`);
    })
    return dumper.start()
}

export function parseCapabilityFile(filePath: string): IDumperScheme {
    return JSON.parse(fs.readFileSync(filePath, {encoding: 'utf8'}))
}


export async function mergeCapabilitiesCommands(
    make: Command,
    binDir: string,
    directory: string,
    commands: IDumperScheme,
): Promise<Command> {

    for (const [name, config] of Object.entries(commands.payload || {})) {

        const files = config.files || undefined;

        if (!(Array.isArray(files) &&
            files.includes('config.json') &&
            files.includes('main.js')
        )) {
            Terminal.Console.error('ERROR', '<', name, '>', 'Not supported',)
            process.exit(1)
        }

        const mainFile = resolve(binDir, `./${name}/main.js`)
        const main = await require(mainFile)

        if (typeof config !== 'object') {
            Terminal.Console.error('ERROR', '<', name, '>', 'Config format not supported',)
            process.exit(1)
        }

        if (typeof main !== 'function') {
            Terminal.Console.error('ERROR', '<', name, '>', 'No < main > function found ',)
            process.exit(1)
        }

        config.options = config.options || [];

        const command = make
            .name(config.name)
            .command(config.command)
            .description(config.description || 'No description')

        for (const option of config.options) {
            command.option(option[0], option[1] || undefined, option[2] || undefined)
        }

        command.action((options) => main(options, directory, make))

    }

    return make;
}