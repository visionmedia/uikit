var ui = {};

// dialog component

;(function(exports, html){

/**
 * Active dialog.
 */

var active;

/**
 * Expose `Dialog`.
 */

exports.Dialog = Dialog;

/**
 * Initialize a new `Dialog` dialog.
 *
 * Options:
 *
 *    - `title` dialog title
 *    - `message` a message to display
 *
 * @param {Object} options
 * @api public
 */

function Dialog(options) {
  options = options || {};
  this.template = html;
  this.render(options);
  if (active) active.hide();
  active = this;
};

/**
 * Render with the given `options`.
 *
 * @param {Object} options
 * @api public
 */

Dialog.prototype.render = function(options){
  var el = this.el = $(this.template);
  el.find('h1').text(options.title);
  if (!options.title) el.find('h1').remove();
  el.find('p').text(options.message);
  setTimeout(function(){
    el.removeClass('hide');
  }, 0);
};

/**
 * Show the dialog.
 *
 * @return {Dialog} for chaining
 * @api public
 */

Dialog.prototype.show = function(){
  this.el.appendTo('body');
  this.el.css({ marginLeft: -(this.el.width() / 2) + 'px' });
  return this;
};

/**
 * Hide the dialog with optional delay of `ms`,
 * otherwise the dialog is removed immediately.
 *
 * @return {Number} ms
 * @return {Dialog} for chaining
 * @api public
 */

Dialog.prototype.hide = function(ms){
  var self = this;

  // duration
  if (ms) {
    setTimeout(function(){
      self.hide();
    }, ms);
    return this;
  }

  // hide / remove
  this.el.addClass('hide');
  setTimeout(function(self){
    self.close();
  }, 2000, this);

  return this;
};

/**
 * Hide the dialog without potential animation.
 *
 * @return {Dialog} for chaining
 * @api public
 */

Dialog.prototype.close = function(){
  this.el.remove();
  return this;
};

})(ui, "<div id=\"dialog\" class=\"hide\">\n  <div class=\"content\">\n    <h1>Title</h1>\n    <p>Message</p>\n  </div>\n</div>");
// confirmation component

;(function(exports, html){

/**
 * Expose `Confirmation`.
 */

exports.Confirmation = Confirmation;

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

})(ui, "<div class=\"actions\">\n  <button class=\"cancel\">Cancel</button>\n  <button class=\"ok main\">Ok</button>\n</div>");