import expect from 'expect';
import postcss from 'postcss';
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

import bgImage from '../src/';

const FIXTURES_DIR = './test/fixtures';

const PATTERN_SOURCE = /([^/]+)\.source\.css$/;
const SUFFIX_CUTTER_RESULT = '.cutter';
const SUFFIX_CUTTER_INVERTOR_RESULT = '.cutterInvertor';

const testUnits = readdirSync(FIXTURES_DIR)
    .filter((filename) => PATTERN_SOURCE.test(filename))
    .map((filename) => {
        const alias = filename.match(PATTERN_SOURCE)[1];

        return {
            alias,
            cutter: readFileSync(join(FIXTURES_DIR, `${alias}${SUFFIX_CUTTER_RESULT}.css`)),
            cutterInvertor: readFileSync(join(FIXTURES_DIR, `${alias}${SUFFIX_CUTTER_INVERTOR_RESULT}.css`)),
            source: readFileSync(join(FIXTURES_DIR, filename)),
        };
    });

describe('Plugin "postcss-bgimage" in case', () => testUnits.forEach(
    (unit) => {
        const { alias, cutter, cutterInvertor, source } = unit;
        const unitName = alias.replace('_', ' ');

        describe(unitName, () => {
            it('in "cutter" mode', () => {
                const output = postcss()
                    .use(bgImage({
                        mode: 'cutter',
                    }))
                    .process(source)
                    .css;

                expect(output).toEqual(cutter.toString());
            });

            it('in "cutterInvertor" mode', () => {
                const output = postcss()
                    .use(bgImage({
                        mode: 'cutterInvertor',
                    }))
                    .process(source)
                    .css;

                expect(output).toEqual(cutterInvertor.toString());
            });
        })
    }
));

describe('Throws an error', () => {
    it('when mode is not defined', () => {
        expect(() => {
            const result = postcss()
                .use(bgImage())
                .process('a { color: blue }')
                .css;
        }).toThrow(Error);
    });

    it('when is defined unknown mode', () => {
        expect(() => {
            const result = postcss()
                .use(bgImage({
                    mode: 'undefined',
                }))
                .process('a { color: blue }')
                .css;
        }).toThrow(Error);
    });
});
