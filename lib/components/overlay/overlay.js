
exports.Overlay = Overlay;

exports.overlay = function(options){
  return new Overlay(options);
};

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

Overlay.prototype.show = function(){
  this.el.removeClass('hide');
  return this;
};

Overlay.prototype.hide = function(){
  this.el.addClass('hide');
  return this;
};
