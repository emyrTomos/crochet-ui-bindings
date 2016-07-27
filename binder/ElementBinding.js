/**
 * Created by emyr on 25/07/16.
 */
var Binding = require('./_Binding');
ElementBinding.prototype = Object.create(Binding.prototype);

function ElementBinding(element,model,scope){
  Binding.apply(this,arguments);
}
ElementBinding.prototype.updateBinding = function(){
  var boundTo = this.element.getAttribute('binding');
  try {
    var value = this.getModelField(boundTo);
  }catch(e){
    alert(e.message);
    return;
  }
  this.element.textContent = value;
}

module.exports = ElementBinding;