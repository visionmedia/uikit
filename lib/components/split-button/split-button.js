
/**
 * Expose `SplitButton`.
 */

exports.SplitButton = SplitButton;

/**
 * Initialize a new `SplitButton`
 * with an optional `label`.
 *
 * @param {String} label
 * @api public
 */

function SplitButton(label) {
  ui.Emitter.call(this);
  this.el = $(html);
  this.events();
  this.render({ label: label });
  this.state = 'hidden';
}

/**
 * Inherit from `Emitter.prototype`.
 */

SplitButton.prototype = new ui.Emitter;

/**
 * Register event handlers.
 *
 * @api private
 */

SplitButton.prototype.events = function(){
  var self = this
    , el = this.el;

  el.find('.button').click(function(e){
    e.preventDefault();
    self.emit('click', e);
  });

  el.find('.toggle').click(function(e){
    e.preventDefault();
    self.toggle();
  });
};

/**
 * Toggle the drop-down contents.
 *
 * @return {SplitButton}
 * @api public
 */

SplitButton.prototype.toggle = function(){
  return 'hidden' == this.state
    ? this.show()
    : this.hide();
};

/**
 * Show the drop-down contents.
 *
 * @return {SplitButton}
 * @api public
 */

SplitButton.prototype.show = function(){
  this.state = 'visible';
  this.emit('show');
  this.el.addClass('show');
  return this;
};

/**
 * Hide the drop-down contents.
 *
 * @return {SplitButton}
 * @api public
 */

SplitButton.prototype.hide = function(){
  this.state = 'hidden';
  this.emit('hide');
  this.el.removeClass('show');
  return this;
};

/**
 * Render the split-button with the given `options`.
 *
 * @param {Object} options
 * @return {SplitButton}
 * @api private
 */

SplitButton.prototype.render = function(options){
  var options = options || {}
    , button = this.el.find('.button')
    , label = options.label;

  if ('string' == label) button.text(label);
  else button.text('').append(label);
  return this;
};
