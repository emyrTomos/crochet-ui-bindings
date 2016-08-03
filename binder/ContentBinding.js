/**
 * Created by emyr on 25/07/16.
 */
var Binding = require('./_Binding');
ContentBinding.prototype = Object.create(Binding.prototype);

function ContentBinding(element,model,scope){
  Binding.apply(this,arguments);
}
ContentBinding.prototype.updateBinding = function(value){
  this.element.textContent = value;
}

module.exports = ContentBinding;