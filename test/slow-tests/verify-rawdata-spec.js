import assert from 'assert';
import {Loader} from '../../src/_external-deps/Loader.js';

describe('file contains valid data', function() {
  const location = 'http://katas.tddbin.com/katas/es6/language';

  it('file contains valid data', function(done) {
    const jsonfile = '__grouped__.json';
    const jsonurl = `${location}/${jsonfile}`;

    Loader.loadRemoteFile(jsonurl, function(err, result) {
      assert.equal(null, err);
      assert.equal(result.substr(0, 15), '{\n  "groups": {');
      done();
    })
  });

});
