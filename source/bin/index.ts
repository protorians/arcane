#!/usr/bin/env node

import {dirname, resolve} from "node:path";
import * as fs from "node:fs";
import {spawnSync} from "node:child_process";
import {
    ThreadManager,
    ThreadRunes,
    GithubDownloader,
    ThreadDirectory,
    ThreadConfig,
    Terminal,
    IRuneScheme, ThreadProgress, ThreadString, ThreadEnum, IRuneConfig, IRunePayloads
} from "@protorians/thread-core";


const appDir = dirname(dirname(__dirname));
const make = ThreadManager.create();
const argv = ThreadManager.serializeArgv(process.argv);
const clientDir = process.cwd();
const runesDir = resolve(appDir, './runes');
const cachesDir = resolve(appDir, './.caches');
const pkg = ThreadManager.packageInfo(appDir);
const runesConfigFile = resolve(appDir, "runes.config.json");
const runesConfigExists = fs.existsSync(runesConfigFile);

try {

    make.name(pkg.displayName || pkg.name);
    make.version(pkg.version || '0.0.1')
    make.description(pkg.description || '')

    make
        .name('Craft:Runes')
        .command('craft:runes')
        .description('Crafting available runes installed')
        .option("--silent, -s", "Disable logging",)
        .action((options) => {
            ThreadRunes.dump(runesDir, runesConfigFile, options.S || false)
        })

    make
        .name('Add:Rune')
        .command('add:rune')
        .description('Add rune')
        .argument("<string>", "Github repository name (owner/repository or owner/repository@version)")
        .action(async (rune: string) => {
            const slug = ThreadString.slugify(rune)
            const repository = new GithubDownloader.RepositoryDownloader(
                rune,
                ThreadDirectory.initialize(`${cachesDir}/runes`) || runesDir,
                runesDir
            );
            repository.downloader.info(false);

            /**
             * Download and extract
             */
            const downloaded = await repository.process()
                .catch(e => {
                    Terminal.Display.error("ERR", e)
                    return undefined;
                });

            if (typeof downloaded !== 'object' || typeof downloaded?.basename === 'undefined') {
                Terminal.Display.success('ERR', `Installation failed`)
            }

            const from = `${runesDir}/${downloaded?.basename}`
            const to = (`${runesDir}/${slug}`)

            if (fs.statSync(from).isDirectory()) {
                if (fs.existsSync(to)) {
                    fs.rmSync(to, {recursive: true, force: true})
                }
                fs.renameSync(from, to)
            }

            const spinner = await ThreadProgress.createSpinner(`Crafting ${rune}...`);
            spinner.start()
            spinner.color = 'cyan'

            setTimeout(() => {
                /**
                 * Validate here
                 */
                const runeConfigFile = `${to}/${ThreadEnum.Rune.CONFIG_FILE}`
                if (!fs.existsSync(runeConfigFile)) {
                    Terminal.Display.error('ERR', `No rune config ${rune} exists`, runeConfigFile)
                    return;
                }

                const runeConfig = new ThreadConfig.Loader<IRuneConfig>(runeConfigFile)
                if (!runeConfig.exists) {
                    Terminal.Display.error('ERR', `No rune config ${rune} exists`, runeConfigFile)
                    return;
                }

                runeConfig.update('slug', slug)
                runeConfig.save()

                /**
                 * Crafting
                 */
                setTimeout(() => {
                    spinner.stop()
                    spawnSync('arcane', ['craft:runes', '--silent'], {stdio: 'inherit'})
                    Terminal.Display.success('DONE', `${rune} rune installed with success!`)
                }, 2025)
            }, 60)

        })


    make
        .name('Remove:Rune')
        .command('remove:rune')
        .description('Remove rune')
        .argument("<string>", "Github repository name (owner/repository or owner/repository@version)")
        .action(async (name) => {

            const slug = ThreadString.slugify(name)
            const config = new ThreadConfig.Loader<IRuneScheme>(runesConfigFile)
            const runes = config.get('payload')

            const spinner = await ThreadProgress.createSpinner(`Removing ${name}...`);
            spinner.start()
            spinner.color = 'red'

            try {
                if (typeof runes === 'object') {
                    const payload: IRunePayloads = {}

                    spinner.text = 'Clear config'
                    Object.entries(runes)
                        .forEach(([key, value]) => {
                            if (key.trim() !== slug && config.schematic) {
                                payload[key] = value
                            }
                        })

                    spinner.text = 'Clear directory'
                    config
                        .update('payload', payload)
                        .save()

                    const to = (`${runesDir}/${slug}`)
                    if (fs.existsSync(to) && fs.statSync(to).isDirectory())
                        fs.rmSync(to, {recursive: true, force: true})

                    spinner.stop()
                    Terminal.Display.success("DONE", name, `uninstalled with success!`);
                    return;
                }

                Terminal.Display.error("ERR", name, 'Not a rune');

            } catch (e) {
                spinner.stop()
                Terminal.Display.error("ERR", e);
            }
        })


    if (!runesConfigExists) {
        Terminal.Display.warning('WARNING', 'No runes configuration found, \n\t\tPlease run "arcane craft:runes"')
        make.parse(argv);
    } else if (runesConfigExists) {
        try {
            const cmd = ThreadRunes.merge(make, runesDir, clientDir, ThreadRunes.read(runesConfigFile),)
            cmd.parse(argv)
        } catch (e) {
            Terminal.Display.error("ERR", e);
        }

    }

} catch (err) {
    Terminal.Display.error('Error', err)
    process.exit(1)
}
