import Stream from 'ember-cli-i18n/utils/stream';

export default function tHelper() {
  var args = Array.prototype.slice.call(arguments);
  var path = args.shift();
  var options = args.pop();

  var view = options.data.view;
  var container = view.container;
  var t = container.lookup('utils:t');
  var application = container.lookup('application:main');

  var stream = new Stream(function() {
    return t(path, args);
  });

  application.localeStream.subscribe(stream.notify, stream);

  return stream;
}
