var fs = require('fs');

var expect = require('expect');

var postcss = require('postcss');
var bgImage = require('..');

var SRC = fs.readFileSync('test/fixtures/_.src.css');

describe('cutter mode', function () {
    it('should remove all background with url()', function() {
        var dist = fs.readFileSync('test/fixtures/cutter.dest.css');

        var output = postcss()
            .use(bgImage({
                mode: 'cutter'
            }))
            .process(SRC)
            .css;

        expect(output).toEqual(dist.toString());
    });
});

describe('cutterInvertor mode', function () {
    it('should remove all props except background with url()', function() {
        var dist = fs.readFileSync('test/fixtures/cutterInvertor.dest.css');

        var output = postcss()
            .use(bgImage({
                mode: 'cutterInvertor'
            }))
            .process(SRC)
            .css;

        expect(output).toEqual(dist.toString());
    });
});
