
/**
 * Expose `Overlay`.
 */

exports.Overlay = Overlay;

/**
 * Return a new `Overlay` with the given `options`.
 *
 * @param {Object} options
 * @return {Overlay}
 * @api public
 */

exports.overlay = function(options){
  return new Overlay(options);
};

/**
 * Initialize a new `Overlay`.
 *
 * @param {Object} options
 * @api public
 */

function Overlay(options) {
  var self = this;
  options = options || {};
  this.el = $(html);
  this.el.appendTo('body');
  if (options.closable) {
    this.el.click(function(){
      self.hide();
    });
  }
}

/**
 * Show the overlay.
 *
 * @return {Overlay} for chaining
 * @api public
 */

Overlay.prototype.show = function(){
  this.el.removeClass('hide');
  return this;
};

/**
 * Hide the overlay.
 *
 * @return {Overlay} for chaining
 * @api public
 */

Overlay.prototype.hide = function(){
  this.el.addClass('hide');
  return this;
};
