export default class RawKataData {
  constructor(loadRemoteFile, url) {
    this.loadRemoteFile = loadRemoteFile;
    this.url = url;
  }
  load(onError, onSuccess) {
    this.loadRemoteFile('', (err, data) => {
      if (err) {
        onError(err);
      } else {
        let parsed;
        try {
          parsed = JSON.parse(data);
        } catch (e) {
          onError();
          return;
        }
        if (!('groups' in parsed)) {
          onError();
        } else {
          onSuccess(parsed);
        }
      }
    });
  }
}
