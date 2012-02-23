
/**
 * Expose `Confirmation`.
 */

exports.Confirmation = Confirmation;

/**
 * Return a new `Confirmation` dialog with the given 
 * `title` and `msg`.
 *
 * @param {String} title or msg
 * @param {String} msg
 * @return {Dialog}
 * @api public
 */

exports.confirm = function(title, msg){
  switch (arguments.length) {
    case 2:
      return new Confirmation({ title: title, message: msg });
    case 1:
      return new Confirmation({ message: title });
  }
};

/**
 * Initialize a new `Confirmation` dialog.
 *
 * Options:
 *
 *    - `title` dialog title
 *    - `message` a message to display
 *
 * Emits:
 *
 *    - `cancel` the user pressed cancel or closed the dialog
 *    - `ok` the user clicked ok
 *    - `show` when visible
 *    - `hide` when hidden
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
 * Change "cancel" button `text`.
 *
 * @param {String} text
 * @return {Confirmation}
 * @api public
 */

Confirmation.prototype.cancel = function(text){
  this.el.find('.cancel').text(text);
  return this;
};

/**
 * Change "ok" button `text`.
 *
 * @param {String} text
 * @return {Confirmation}
 * @api public
 */

Confirmation.prototype.ok = function(text){
  this.el.find('.ok').text(text);
  return this;
};

/**
 * Show the confirmation dialog and invoke `fn(ok)`.
 *
 * @param {Function} fn
 * @return {Confirmation} for chaining
 * @api public
 */

Confirmation.prototype.show = function(fn){
  ui.Dialog.prototype.show.call(this);
  this.el.find('.ok').focus();
  this.callback = fn || function(){};
  return this;
};

/**
 * Render with the given `options`.
 *
 * Emits "cancel" event.
 * Emits "ok" event.
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

  this.on('close', function(){
    self.emit('cancel');
    self.callback(false);
  });

  actions.find('.cancel').click(function(e){
    e.preventDefault();
    self.emit('cancel');
    self.callback(false);
    self.hide();
  });

  actions.find('.ok').click(function(e){
    e.preventDefault();
    self.emit('ok');
    self.callback(true);
    self.hide();
  });
};
