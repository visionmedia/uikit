
exports.Overlay = Overlay;

function Overlay(options) {
  options = options || {};
  this.el = $(html);
  this.el.appendTo('body');
}

Overlay.prototype.show = function(){
  this.el.removeClass('hide');
  return this;
};

Overlay.prototype.hide = function(){
  this.el.addClass('hide');
  return this;
};
