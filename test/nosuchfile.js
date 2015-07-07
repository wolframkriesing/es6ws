import assert from 'assert';
import {Loader} from '../src/Loader.js';

describe('file contains valid data', function() {
  const location = 'http://katas.tddbin.com/katas/es6/language';

  it('file contains valid data', function(done) {
    const jsonfile = '__grouped__.json';
    const jsonurl = `${location}/${jsonfile}`;

    Loader.loadRemoteFile(jsonurl, function(err, result) {
      assert.equal(null, err);
      assert.equal('groups' in result, true);
      done();
    })
  });

  it('file contains invalid data', function(done) {
    const jsonfile = '__all__.json';
    const jsonurl = `${location}/${jsonfile}`;

    Loader.loadRemoteFile(jsonurl, function(err, result) {
      assert.equal(null, err);
      assert.equal('groups' in result, false);
      done();
    })
  });

});
