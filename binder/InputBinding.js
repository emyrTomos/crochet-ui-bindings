/**
 * Created by emyr on 25/07/16.
 */
var Binding = require('./_Binding');
InputBinding.prototype = Object.create(Binding.prototype);

function InputBinding(element,model,scope){
  Binding.apply(this,arguments);
}
InputBinding.prototype.updateBinding = function(){
  try {
    var value = this.getModelField();
  }catch(e){
    alert(e.message);
    return;
  }
  this.element.value = value;
}
InputBinding.prototype.bindModifications = function(){
  this.element.addEventListener('change',this.modify.bind(this));
}
InputBinding.prototype.modify = function(evt){
  console.log(evt , this.element);
  var value = this.element.value;
  this.setModelField(value);
  this.broadcast();
}

module.exports = InputBinding;