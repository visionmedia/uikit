
/**
 * Expose `Card`.
 */

exports.Card = Card;

/**
 * Create a new `Card`.
 *
 * @param {Mixed} front
 * @param {Mixed} back
 * @return {Card}
 * @api public
 */

exports.card = function(front, back){
  return new Card(front, back);
};

/**
 * Initialize a new `Card` with content
 * for face `front` and `back`.
 *
 * Emits "flip" event.
 *
 * @param {Mixed} front
 * @param {Mixed} back
 * @api public
 */

function Card(front, back) {
  ui.Emitter.call(this);
  this._front = front || $('<p>front</p>');
  this._back = back  || $('<p>back</p>');
  this.template = html;
  this.render();
};

/**
 * Inherit from `Emitter.prototype`.
 */

Card.prototype = new ui.Emitter;

/**
 * Set front face `val`.
 *
 * @param {Mixed} val
 * @return {Card}
 * @api public
 */

Card.prototype.front = function(val){
  this._front = val;
  this.render();
  return this;
};

/**
 * Set back face `val`.
 *
 * @param {Mixed} val
 * @return {Card}
 * @api public
 */

Card.prototype.back = function(val){
  this._back = val;
  this.render();
  return this;
};

/**
 * Flip the card.
 *
 * @return {Card} for chaining
 * @api public
 */

Card.prototype.flip = function(){
  this.emit('flip');
  this.el.toggleClass('flipped');
  return this;
};

/**
 * Set the effect to `type`.
 *
 * @param {String} type
 * @return {Dialog} for chaining
 * @api public
 */

Card.prototype.effect = function(type){
  this.el.addClass(type);
  return this;
};

/**
 * Render with the given `options`.
 *
 * @param {Object} options
 * @api public
 */

Card.prototype.render = function(options){
  var self = this
    , el = this.el = $(this.template);
  el.find('.front').empty().append(this._front.el || $(this._front));
  el.find('.back').empty().append(this._back.el || $(this._back));
  el.click(function(){
    self.flip();
  });
};