
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
 *   - * menu item events are emitted when clicked
 *
 * @api public
 */

function Menu() {
  ui.Emitter.call(this);
  this.items = {};
  this.el = $(html).hide().appendTo('body');
  this.el.hover(this.deselect.bind(this));
  $('html').click(this.hide.bind(this));
  this.on('show', this.bindKeyboardEvents.bind(this));
  this.on('hide', this.unbindKeyboardEvents.bind(this));
};

/**
 * Inherit from `Emitter.prototype`.
 */

Menu.prototype = new ui.Emitter;

/**
 * Deselect selected menu items.
 *
 * @api private
 */

Menu.prototype.deselect = function(){
  this.el.find('.selected').removeClass('selected');
};

/**
 * Bind keyboard events.
 *
 * @api private
 */

Menu.prototype.bindKeyboardEvents = function(){
  $(document).bind('keydown.menu', this.onkeydown.bind(this));
  return this;
};

/**
 * Unbind keyboard events.
 *
 * @api private
 */

Menu.prototype.unbindKeyboardEvents = function(){
  $(document).unbind('keydown.menu');
  return this;
};

/**
 * Handle keydown events.
 *
 * @api private
 */

Menu.prototype.onkeydown = function(e){
  switch (e.keyCode) {
    // up
    case 38:
      e.preventDefault();
      this.move('prev');
      break;
    // down
    case 40:
      e.preventDefault();
      this.move('next');
      break;
  }
};

/**
 * Focus on the next menu item in `direction`.
 * 
 * @param {String} direction "prev" or "next"
 * @api public
 */

Menu.prototype.move = function(direction){
  var prev = this.el.find('.selected').eq(0);

  var next = prev.length
    ? prev[direction]()
    : this.el.find('li:first-child');

  if (next.length) {
    prev.removeClass('selected');
    next.addClass('selected');
    next.find('a').focus();
  }
};

/**
 * Add menu item with the given `text` and optional callback `fn`.
 *
 * When the item is clicked `fn()` will be invoked
 * and the `Menu` is immediately closed. When clicked
 * an event of the name `text` is emitted regardless of
 * the callback function being present.
 *
 * @param {String} text
 * @param {Function} fn
 * @return {Menu}
 * @api public
 */

Menu.prototype.add = function(text, fn){
  var self = this
    , el = $('<li><a href="#">' + text + '</a></li>')
    .addClass(slug(text))
    .appendTo(this.el)
    .click(function(e){
      e.preventDefault();
      e.stopPropagation();
      self.hide();
      self.emit(text);
      fn && fn();
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
