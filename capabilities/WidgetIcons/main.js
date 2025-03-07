const {Terminal} = require('../../build/library/com.terminal.js');

/**
 *
 * @param {{D:boolean}} options
 * @param {string} directory
 * @returns {Promise<void>}
 */
async function main(options, directory) {

    if (options.D) {

        console.log('UiIcons loaded', directory, options)

    } else {
        Terminal.Console.warning("WARN", "No options were found!.");
    }

}

module.exports = main