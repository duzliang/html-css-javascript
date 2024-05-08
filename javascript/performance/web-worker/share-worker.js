const shareWorker = new SharedWorker('./work.js');

shareWorker.addEventListener('connect', function (evt) {
  console.log('log=>sw connect:', evt);
  let port = evt.ports[0];

  port.addEventListener('message', function (evt) {
    console.log('log=>sw receive msg:', evt);
  });

  port.postMessage('msg from share worker');

  // init connect
  port.start();
});

shareWorker.port.start();
