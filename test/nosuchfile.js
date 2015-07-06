import assert from 'assert';
import {loadRemoteFile} from '../src/loadRemoteFile';

describe('file contains valid data', function() {
  it('file contains valid data', function(done) {
    // arrange
    const jsonurl = 'http://katas.tddbin.com/katas/es6/language/__grouped__.json';

    // act

    //assert
    loadRemoteFile(jsonurl, function(err, result) {
      assert.equal(null, err);
      assert.equal('groups' in result, true);
      done();
    })
  });

  it('file contains invalid data', function(done) {
    // arrange
    const jsonurl = 'http://katas.tddbin.com/katas/es6/language/__all__.json';

    // act

    //assert
    loadRemoteFile(jsonurl, function(err, result) {
      assert.equal(null, err);
      assert.equal('groups' in result, false);
      done();
    })
  });

});
