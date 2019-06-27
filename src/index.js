import postcss from 'postcss';

import cutter from './cutter';
import cutterInvertor from './cutterInvertor';

/**
 * @param {string} mode
 *
 * @returns {void}
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
 * @param {object} options - Plugin options.
 *
 * @returns {void}
 */
export default postcss.plugin('postcss-bgimage', (options) => {
  if (!options) {
    throw new Error('Required params was not passed.');
  }

  const { mode } = options;

  return (css) => getProcessor(mode)(css);
});
