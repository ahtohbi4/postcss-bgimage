var fs = require('fs');
// var path = require('path');

var expect = require('expect');

var postcss = require('postcss');
var bgImage = require('..');

describe('cutter mode', function () {
    it('should remove all background with url()', function() {
        var src = fs.readFileSync('test/fixtures/cutter.before.css');
        var dist = fs.readFileSync('test/fixtures/cutter.after.css');

        var output = postcss()
            .use(bgImage({
                mode: 'cutter'
            }))
            .process(src)
            .css;

        expect(output).toEqual(dist.toString());
    });
});

describe('cutterInvertor mode', function () {
    it('should remove all props except background with url()', function() {
        var src = fs.readFileSync('test/fixtures/cutterInvertor.before.css');
        var dist = fs.readFileSync('test/fixtures/cutterInvertor.after.css');

        var output = postcss()
            .use(bgImage({
                mode: 'cutterInvertor'
            }))
            .process(src)
            .css;

        expect(output).toEqual(dist.toString());
    });
});
