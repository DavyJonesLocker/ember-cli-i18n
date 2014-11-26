import Ember from 'ember';
import Stream from 'ember-cli-i18n/utils/stream';

// _SimpleHandlebarsView in 1.9 and _SimpleBoundView in 1.10
var SimpleBoundView = Ember._SimpleHandlebarsView || Ember._SimpleBoundView;

export default function tHelper() {
  var args = Array.prototype.slice.call(arguments);
  var path = args.shift();
  var options = args.pop();

  var view = options.data.view;
  var container = view.container;
  var t = container.lookup('utils:t');
  var application = container.lookup('application:main');
  var types = options.types;

  // parse input params and streamify
  for (var i = 0, l = args.length; i < l; i++) {
    // (starting at 1 because we popped path off already
    if (types[i + 1] === 'ID') {
      args[i] = view.getStream(args[i]);
    }
  }

  // convert path into a stream
  if (types[0] === 'ID') {
    path = view.getStream(path);
  }

  var stream = new Stream(function() {
    return t(path, args);
  });
  var childView = new SimpleBoundView(stream, options.escaped);

  stream.subscribe(view._wrapAsScheduled(function(){
    Ember.run.scheduleOnce('render', childView, 'rerender');
  }));

  application.localeStream.subscribe(stream.notify, stream);

  if (path.isStream) {
    path.subscribe(stream.notify, stream);
  }

  view.appendChild(childView);
}
