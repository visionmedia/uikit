
/**
 * Expose `Confirmation`.
 */

exports.Confirmation = Confirmation;

/**
 * Return a new `Confirmation` dialog with the given 
 * `title` and `msg`.
 *
 * @param {String} title
 * @param {String} msg
 * @return {Dialog}
 * @api public
 */

exports.confirm = function(title, msg){
  return new Confirmation({ title: title, message: msg });
};

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

function Confirmation(options) {
  ui.Dialog.call(this, options);
};

/**
 * Inherit from `Dialog.prototype`.
 */

Confirmation.prototype = new ui.Dialog;

/**
 * Show the confirmation dialog and invoke `fn(ok)`.
 *
 * @param {Function} fn
 * @return {Confirmation} for chaining
 * @api public
 */

Confirmation.prototype.show = function(fn){
  ui.Dialog.prototype.show.call(this);
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
  ui.Dialog.prototype.render.call(this, options);
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
