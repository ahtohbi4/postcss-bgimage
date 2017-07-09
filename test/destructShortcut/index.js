import expect from 'expect';
import postcss from 'postcss';
import { readFile } from 'fs';

import destructShortcut from '../../src/destructShortcut';

describe('Destructor', () => {
    it('should to separate "background-image" property from "background" shortcut', (done) => {
        readFile('./test/destructShortcut/fixtures/source.css', (error, source) => {
            if (error) {
                throw new Error(error);
            }

            postcss([
                postcss.plugin('destruct-shortcut', () => (css) => destructShortcut(css)),
            ])
                .process(source)
                .then(result => {
                    readFile('./test/destructShortcut/fixtures/expected.css', (error, expected) => {
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
