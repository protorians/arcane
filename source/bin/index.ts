#!/usr/bin/env node

import {dirname, resolve} from "node:path";
import * as fs from "node:fs";
import {
    cli,
    dumpCapabilities,
    mergeCapabilitiesCommands,
    packageInfo,
    parseCapabilityFile,
    serializeArgv,
    Terminal
} from "../library";

const appDir = dirname(dirname(__dirname));
const make = cli();
const argv = serializeArgv(process.argv);
const directory = process.cwd();
const binDir = resolve(appDir, './capabilities');
const pkg = packageInfo();
const dumpFile = resolve(appDir, 'capabilities.config.json');
const dumpFilePath = resolve(appDir, dumpFile);
const binProviderExists = fs.existsSync(dumpFilePath);

try {
    make.name(pkg.displayName)
    make.version(pkg.version || '0.0.1')
    make.description(pkg.description || '')

    make
        .name('Dump capabilities')
        .command('capabilities')
        .description('Dump commands in "bin" directory')
        .option("--dump, -d", "Dump capabilities")
        .action((options) => {
            if (options.D === true) dumpCapabilities(binDir, dumpFile)
        })

    if (!binProviderExists) {
        Terminal.Console.warning('WARNING', 'Run "protorians capabilities --dump"')
        make.parse(argv);
    } else if (binProviderExists) {
        mergeCapabilitiesCommands(make, binDir, directory, parseCapabilityFile(dumpFilePath),)
            .then(cmd => cmd.parse(argv))
            .catch(err => {
                throw new Error(err)
            });
    }

} catch (err) {
    Terminal.Console.error('Air Make Error', err)
    process.exit(1)
}
