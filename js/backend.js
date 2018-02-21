'use strict';

(function () {

  window.load = function (method, url, onSuccess, onError, boundary, body) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s

    xhr.open(method, url);
    if (method === 'POST') {
      xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
      xhr.send(body);
    } else {
      xhr.send();
    }
  };

})();
