
exports.Overlay = Overlay;

function Overlay() {
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
