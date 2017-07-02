const postcss = require('postcss');

const cutter = require('./cutter');
const cutterInvertor = require('./cutterInvertor');

/**
 * @param  {string} mode
 * @return {void}
 */
function getProcessor(mode) {
    switch (mode) {
        case 'cutter':
            return cutter;

        case 'cutterInvertor':
            return cutterInvertor;

        default:
            throw new Error(`Unknow mode for postcss-bgimage: ${mode}`);
    }
}

/**
 * @param  {object} options - plugin options
 * @return {void}
 */
module.exports = postcss.plugin('postcss-bgimage', (options) => {
    if (!options) {
        throw new Error('Required params was not passed.');
    }

    const mode = options.mode;

    return (css) => getProcessor(mode)(css);
});
