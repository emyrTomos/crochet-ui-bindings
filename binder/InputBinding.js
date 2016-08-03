/**
 * Created by emyr on 25/07/16.
 */
var Binding = require('./_Binding');
InputBinding.prototype = Object.create(Binding.prototype);

function InputBinding(){
  Binding.apply(this,arguments);
}
InputBinding.prototype.updateBinding = function(value){
  this.element.value = value;
}
InputBinding.prototype.bindModifications = function(){
  this.element.addEventListener('change',this.modify.bind(this));
}
InputBinding.prototype.modify = function(evt){
  var value = this.element.value;
  this.setModelField(value);
  this.broadcast();
}

module.exports = InputBinding;