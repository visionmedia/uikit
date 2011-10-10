
/**
 * Expose `Emitter`.
 */

exports.Emitter = Emitter;

/**
 * Initialize a new `Emitter`.
 * 
 * @api public
 */

function Emitter() {
  this.callbacks = {};
};

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter} for chaining
 */

Emitter.prototype.on = function(event, fn){
  (this.callbacks[event] = this.callbacks[event] || [])
    .push(fn);
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter} for chaining
 */

Emitter.prototype.emit = function(event){
  var args = [].slice.call(arguments, 1)
    , callbacks = this.callbacks[event];

  if (callbacks) {
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args)
    }
  }

  return this;
};
