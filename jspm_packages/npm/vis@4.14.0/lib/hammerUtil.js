/* */ 
var Hammer = require('./module/hammer');
exports.onTouch = function(hammer, callback) {
  callback.inputHandler = function(event) {
    if (event.isFirst) {
      callback(event);
    }
  };
  hammer.on('hammer.input', callback.inputHandler);
};
exports.onRelease = function(hammer, callback) {
  callback.inputHandler = function(event) {
    if (event.isFinal) {
      callback(event);
    }
  };
  return hammer.on('hammer.input', callback.inputHandler);
};
exports.offTouch = function(hammer, callback) {
  hammer.off('hammer.input', callback.inputHandler);
};
exports.offRelease = exports.offTouch;
