import expect from 'expect';
import postcss from 'postcss';
import { readFile } from 'fs';

import destructShorthand from '../../src/destructShorthand';

describe('module destructShorthand', () => {
    it('should to separate "background-image" property from "background" shorthand', (done) => {
        readFile('./test/destructShorthand/fixtures/source.css', (error, source) => {
            if (error) {
                throw new Error(error);
            }

            postcss([
                postcss.plugin('destruct-shorthand', () => (css) => destructShorthand(css)),
            ])
                .process(source)
                .then(result => {
                    readFile('./test/destructShorthand/fixtures/expected.css', (error, expected) => {
                        if (error) {
                            throw new Error(error);
                        }

                        expect(result.css)
                            .toEqual(expected.toString());

                        done();
                    })
                });
        });
    });
});
