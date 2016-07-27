/**
 * Created by emyr on 25/07/16.
 */
var Binding = require('./_Binding');
console.log("Binding " , Binding);
AttributeBinding.prototype = Object.create(Binding.prototype);

function AttributeBinding(element,model,scope){
  Binding.apply(this,arguments);
}
AttributeBinding.prototype.updateBinding = function(){
  var boundTo = this.element.getAttribute('crochet-binding');
  try {
    var value = this.getModelField(boundTo);
  }catch(e){
    alert(e.message);
    return;
  }
  if(this.element.hasAttribute('crochet-field')){
    this.element[this.element.getAttribute('crochet-field')] = value;
  }
  if(this.element.hasAttribute('crochet-class')){
    this.element.classList.add(value);
  }
}
AttributeBinding.prototype.bindModifications = function(){
  this.element.addEventListener('change',this.modify.bind(this));
}
AttributeBinding.prototype.modify = function(_value){
  var boundTo = this.element.getAttribute('crochet-binding');
  var value = this.element.value;
  this.setModelField(boundTo , value);
  this.broadcast(boundTo);
}

module.exports = AttributeBinding;