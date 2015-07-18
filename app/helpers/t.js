import Stream from 'ember-cli-i18n/utils/stream';

export default function tHelper(params, hash, options, env) {
  var view = env.data.view;
  var path = params.shift();

  var container = view.container;
  var t = container.lookup('utils:t');
  var application = container.lookup('application:main');

  var cache = "";
  var stream = new Stream(function() {
    return cache;
  });

  var update = function() {
    var tRes = t(path, params);
    if(typeof(tRes) === 'string') {
      cache = tRes;
      stream.notify();
    } else if(typeof(tRes) === 'undefined') {
      cache = '';
      stream.notify();
    } else if(typeof(tRes) === 'object' && typeof(tRes.then) === 'function') {
      tRes.then(function(val) {
        cache = val;
        stream.notify();
      });
    } else {
      throw 'unexpected type returned from t util';
    }
  };
  update();

  // bind any arguments that are Streams
  for (var i = 0, l = params.length; i < l; i++) {
    var param = params[i];
    if(param && param.isStream){
      param.subscribe(update, this);
    };
  }

  application.localeStream.subscribe(update, this);

  if (path.isStream) {
    path.subscribe(update, this);
  }

  return stream;
}
