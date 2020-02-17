import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

import packageJSON from './package.json';

export default [
  {
    input: 'src/index.js',
    plugins: [
      babel({
        exclude: 'node_modules/**',
      }),
      commonjs(),
    ],
    output: {
      file: packageJSON.main,
      format: 'cjs',
      preserveModules: false,
      sourcemap: true,
    },
    treeshake: true,
  },
];
