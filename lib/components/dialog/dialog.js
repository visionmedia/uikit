
/**
 * Active dialog.
 */

var active;

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

Dialog = function Dialog(options) {
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
