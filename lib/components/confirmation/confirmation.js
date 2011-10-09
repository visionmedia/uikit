
/**
 * Initialize a new `Confirmation` dialog.
 *
 * Options:
 *
 *    - `title` dialog title
 *    - `message` a message to display
 *
 * @param {Object} options
 * @api public
 */

Confirmation = function Confirmation(options) {
  Dialog.call(this, options);
};

/**
 * Inherit from `Dialog.prototype`.
 */

Confirmation.prototype = new Dialog;

/**
 * Show the confirmation dialog and invoke `fn(ok)`.
 *
 * @param {Function} fn
 * @return {Confirmation} for chaining
 * @api public
 */

Confirmation.prototype.show = function(fn){
  Dialog.prototype.show.call(this);
  this.callback = fn;
  return this;
};

/**
 * Render with the given `options`.
 *
 * @param {Object} options
 * @api public
 */

Confirmation.prototype.render = function(options){
  Dialog.prototype.render.call(this, options);
  var self = this
    , actions = $(html);

  this.el.addClass('confirmation');
  this.el.append(actions);

  actions.find('.cancel').click(function(){
    self.callback(false);
    self.hide();
  });

  actions.find('.ok').click(function(){
    self.callback(true);
    self.hide();
  });
};
