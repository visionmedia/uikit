
/**
 * Expose `ContextMenu`.
 */

exports.ContextMenu = ContextMenu;

/**
 * Create a new `ContextMenu`.
 *
 * @return {ContextMenu}
 * @api public
 */

exports.menu = function(){
  return new ContextMenu;
};

/**
 * Initialize a new `ContextMenu` with content
 * for face `front` and `back`.
 *
 * Emits "flip" event.
 *
 * @param {Mixed} front
 * @param {Mixed} back
 * @api public
 */

function ContextMenu(front, back) {
  var self = this;
  ui.Emitter.call(this);
  this.items = {};
  this.el = $(html).appendTo('body');
  $('html').click(function(){
    self.hide();
  });
};

/**
 * Inherit from `Emitter.prototype`.
 */

ContextMenu.prototype = new ui.Emitter;

/**
 * Add menu item with the given `text` and callback `fn`.
 *
 * When the item is clicked `fn()` will be invoked
 * and the `ContextMenu` is immediately closed. 
 *
 * @param {String} text
 * @param {Function} fn
 * @return {ContextMenu}
 * @api public
 */

ContextMenu.prototype.add = function(text, fn){
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
 * @return {ContextMenu}
 * @api public
 */

ContextMenu.prototype.remove = function(text){
  var item = this.items[text];
  if (!item) throw new Error('no menu item named "' + text + '"');
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

ContextMenu.prototype.has = function(text){
  return !! this.items[text];
};

/**
 * Move context menu to `(x, y)`.
 *
 * @param {Number} x
 * @param {Number} y
 * @return {ContextMenu}
 * @api public
 */

ContextMenu.prototype.moveTo = function(x, y){
  this.el.css({
    top: y,
    left: x
  });
  return this;
};

/**
 * Show the menu.
 *
 * @return {ContextMenu}
 * @api public
 */

ContextMenu.prototype.show = function(){
  this.emit('show');
  this.el.show();
  return this;
};

/**
 * Hide the menu.
 *
 * @return {ContextMenu}
 * @api public
 */

ContextMenu.prototype.hide = function(){
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
