
/**
 * Expose `Menu`.
 */

exports.Menu = Menu;

/**
 * Create a new `Menu`.
 *
 * @return {Menu}
 * @api public
 */

exports.menu = function(){
  return new Menu;
};

/**
 * Initialize a new `Menu`.
 *
 * Emits:
 *
 *   - "show" when shown
 *   - "hide" when hidden
 *   - "remove" with the item name when an item is removed
 *
 * @api public
 */

function Menu() {
  var self = this;
  ui.Emitter.call(this);
  this.items = {};
  this.el = $(html).appendTo('body');
  $('html').click(function(){ self.hide(); });
};

/**
 * Inherit from `Emitter.prototype`.
 */

Menu.prototype = new ui.Emitter;

/**
 * Add menu item with the given `text` and callback `fn`.
 *
 * When the item is clicked `fn()` will be invoked
 * and the `Menu` is immediately closed. 
 *
 * @param {String} text
 * @param {Function} fn
 * @return {Menu}
 * @api public
 */

Menu.prototype.add = function(text, fn){
  if (1 == arguments.length) return this.items[text];
  var self = this
    , el = $('<li><a href="#">' + text + '</a></li>')
    .addClass(slug(text))
    .appendTo(this.el)
    .click(function(e){
      e.preventDefault();
      e.stopPropagation();
      self.hide();
      fn();
    });

  this.items[text] = el;
  return this;
};

/**
 * Remove menu item with the given `text`.
 *
 * @param {String} text
 * @return {Menu}
 * @api public
 */

Menu.prototype.remove = function(text){
  var item = this.items[text];
  if (!item) throw new Error('no menu item named "' + text + '"');
  this.emit('remove', text);
  item.remove();
  delete this.items[text];
  return this;
};

/**
 * Check if this menu has an item with the given `text`.
 *
 * @param {String} text
 * @return {Boolean}
 * @api public
 */

Menu.prototype.has = function(text){
  return !! this.items[text];
};

/**
 * Move context menu to `(x, y)`.
 *
 * @param {Number} x
 * @param {Number} y
 * @return {Menu}
 * @api public
 */

Menu.prototype.moveTo = function(x, y){
  this.el.css({
    top: y,
    left: x
  });
  return this;
};

/**
 * Show the menu.
 *
 * @return {Menu}
 * @api public
 */

Menu.prototype.show = function(){
  this.emit('show');
  this.el.show();
  return this;
};

/**
 * Hide the menu.
 *
 * @return {Menu}
 * @api public
 */

Menu.prototype.hide = function(){
  this.emit('hide');
  this.el.hide();
  return this;
};

/**
 * Generate a slug from `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

function slug(str) {
  return str
    .toLowerCase()
    .replace(/ +/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}
