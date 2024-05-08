let shareWorker = new SharedWorker('./share-worker.js');
shareWorker.addEventListener('message', function(evt) {
  console.log('log=>receive share worker message:', evt.data);
});

shareWorker.port.postMessage('hello share worker');
