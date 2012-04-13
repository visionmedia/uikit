
/**
 * Expose `Alert`.
 */

exports.Alert = Alert;

/**
 * Return a new `Alert` dialog with the given
 * `title` and `msg`.
 *
 * @param {String} title or msg
 * @param {String} msg
 * @return {Dialog}
 * @api public
 */

exports.alert = function(title, msg){
  switch (arguments.length) {
    case 2:
      return new Alert({ title: title, message: msg });
    case 1:
      return new Alert({ message: title });
  }
};

/**
 * Initialize a new `Alert` dialog.
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

function Alert(options) {
  ui.Dialog.call(this, options);
};

/**
 * Inherit from `Dialog.prototype`.
 */

Alert.prototype = new ui.Dialog;

/**
 * Change "cancel" button `text`.
 *
 * @param {String} text
 * @return {Alert}
 * @api public
 */

Alert.prototype.cancel = function(text){
  var cancel = this.el.find('.cancel');
  cancel.text(text);
  cancel.removeClass('hide');
  return this;
};

/**
 * Change "ok" button `text`.
 *
 * @param {String} text
 * @return {Alert}
 * @api public
 */

Alert.prototype.ok = function(text){
  var ok = this.el.find('.ok');
  ok.text(text);
  ok.removeClass('hide');
  return this;
};

/**
 * Show the confirmation dialog and invoke `fn(ok)`.
 *
 * @param {Function} fn
 * @return {Alert} for chaining
 * @api public
 */

Alert.prototype.show = function(fn){
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

Alert.prototype.render = function(options){
  ui.Dialog.prototype.render.call(this, options);
  var self = this
    , actions = $(html);

  this.el.addClass('alert');
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
