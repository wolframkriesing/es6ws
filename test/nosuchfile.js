import assert from 'assert';
import sinon from 'sinon';
import RawKataData from '../src/rawkata.js';

assert.calledWith = sinon.assert.calledWith;
assert.notCalled = sinon.assert.notCalled;
assert.calledOnce = sinon.assert.calledOnce;

const irrelevantError = () => {};

var noop = () => {};
describe('raw kata data', function() {

  it('loaded data are as expected', function() {
    var validObj = {groups: {}};
    const validRawData = JSON.stringify(validObj);
    function onSuccess(groupedKatas) {
      assert.deepEqual(groupedKatas, validObj);
    }
    const loaderStub = (url, onLoaded) => {
      onLoaded(null, validRawData);
    };
    new RawKataData(loaderStub, 'irrelevant url').load(noop, onSuccess);
  });
  
  describe('on error, call error callback and the error passed', function() {

    describe('with errors', function() {
      const error = new Error('');
      function load(onError, onSuccess=noop) {
        const loaderStub = (url, onLoaded) => {
          onLoaded(error, '');
        };
        new RawKataData(loaderStub, 'irrelevant url').load(onError, onSuccess);
      }
      it('calls onError once with the right parameter', function() {
        let onError = sinon.stub();
        load(onError);
        assert.calledWith(onError, error);
      });
      it('does NOT call onSuccess', function() {
        let onSuccess = sinon.stub();
        load(noop, onSuccess);
        assert.notCalled(onSuccess);
      });
    });
    
    describe('for invalid data', function() {
      function load(onError, onSuccess=noop) {
        const invalidData = JSON.stringify({propertyGroupsMissing: {}});
        const loaderStub = (url, onLoaded) => {
            onLoaded(null, invalidData);
          };
        new RawKataData(loaderStub, 'irrelevant url').load(onError, onSuccess);
      }
      it('calls onError', function() {
        let onError = sinon.stub();
        load(onError);
        assert.calledOnce(onError);
      });
      it('does NOT call onSuccess', function() {
        let onSuccess = sinon.stub();
        load(noop, onSuccess);
        assert.notCalled(onSuccess);
      });
    });

    describe('JSON parse fails', function() {
      function load(onError, onSuccess=noop) {
        const loaderStub = (url, onLoaded) => {
          onLoaded(null, 'invalid JSON');
        };
        new RawKataData(loaderStub, 'irrelevant url').load(onError);
      }
      it('call onError', function() {
        let onError = sinon.stub();
        load(onError);
        assert.calledOnce(onError);
      });
      it('does NOT call onSuccess', function() {
        let onSuccess = sinon.stub();
        load(noop, onSuccess);
        assert.notCalled(onSuccess);
      });
    });
    
  });
  
  
  
  //xit('contains `groups` key', function() {
  //  const rawData = JSON.stringify({groups: ''});
  //  const loadRemoteFile = (url, onLoaded) => {
  //    onLoaded(null, rawData);
  //  };
  //  
  //  //const rawData = new RawData(loadRemoteFile);
  //  //rawData.loadKataGroupsFromUrl('', irrelevantError, (kataGroups) => {
  //  //  assert.equal(Array.isArray(kataGroups));
  //  //});
  //  //
  //  //loadRemoteFile('', (err, kataGroups) => {
  //  //})
  //});
  //
  //xit('file contains invalid data', function(done) {
  //  const jsonfile = '__all__.json';
  //  const jsonurl = `${location}/${jsonfile}`;
  //
  //  Loader.loadRemoteFile(jsonurl, function(err, result) {
  //    assert.equal(null, err);
  //    assert.equal('groups' in result, false);
  //    done();
  //  })
  //});
  //
});
