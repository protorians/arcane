import {resolve, relative, dirname} from "node:path";
import * as fs from "node:fs";
import {Terminal} from "./com.terminal";
import {
    ICapabilityConfig,
    IDumper,
    IDumperConfig,
    IDumperPayload,
    IDumperPayloads,
    IDumperScheme,
    IDumperSignalMap
} from "../types/dumper";
import {ISignalStack, Signal} from "@protorians/core";
import {readFileSync} from "node:fs";

export class Dumper implements IDumper {

    _entries: IDumperPayloads = {}

    signal: ISignalStack<IDumperSignalMap>


    constructor(
        public readonly config: IDumperConfig
    ) {
        this.signal = new Signal.Stack;
    }

    get entries() {
        return this._entries;
    }

    commit(name: string, file: string): IDumperPayload {
        const filepath = resolve(this.config.directory, `./${name}`)
        const data = {name, file};

        let config: ICapabilityConfig = (typeof this._entries[name] !== "object")
            ? JSON.parse(readFileSync(`${filepath}/config.json`).toString())
            : this._entries[name]

        config.files = config.files || [];
        config.files.push(file)

        this._entries[name] = config;
        this.signal.dispatch('commit', {instance: this, data});
        return data;
    }

    commits(name: string, files: string[]): this {
        this.signal.dispatch('commits', {instance: this, name, files});
        return this;
    }


    prepare() {

        if (!fs.statSync(this.config.directory).isDirectory()) {
            fs.mkdirSync(this.config.directory, {recursive: true});
        }

        if (fs.existsSync(this.config.output) && fs.statSync(this.config.output).isFile()) {
            fs.unlinkSync(this.config.output)
        }

        this._entries = {}

        return this;
    }

    start() {

        this.prepare();

        const scanned = fs.readdirSync(this.config.directory, {recursive: false})

        for (const cmdName of scanned) {
            const filepath = resolve(this.config.directory, `./${cmdName}`)

            if (!fs.statSync(filepath).isDirectory()) continue;

            const payload: string[] = fs.readdirSync(filepath, {recursive: false})
                .map((file) =>
                    (this.config.allow?.some(allow => allow instanceof RegExp ? allow.test(file) : allow === file))
                        ? file : null
                )
                .filter(file => typeof file === 'string')
                .map(file => {
                    this.commit(`${cmdName}`, file)
                    return file;
                })

            if (payload.length) this.commits(`${cmdName}`, payload);

        }

        this.save()
        Terminal.Console.success("TASK", "Complete")

        return this;
    }

    save() {
        try {
            const dir: string = dirname(this.config.output);

            const scheme: IDumperScheme = {
                meta: {
                    ...this.config,
                    timestamp: new Date().getTime(),
                    directory: relative(process.cwd(), this.config.directory),
                    output: relative(process.cwd(), this.config.output),
                },
                payload: this._entries,
            }

            if (!fs.existsSync(dir)) fs.mkdirSync(dir);
            fs.writeFileSync(this.config.output, JSON.stringify(scheme, null, 2));

            Terminal.Console.info('[TASK]', 'Save completed');
        } catch (e) {
            Terminal.Console.error('[ERROR]', e);
        }
    }

}