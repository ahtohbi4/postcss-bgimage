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

describe('Unit test', () => testUnits.forEach(
    ({
        alias,
        cutter,
        cutterInvertor,
        source
    }) => describe(`"${alias}"`, () => {
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
));
