/**
 * Created by emyr on 25/07/16.
 */
var Binding = require('./_Binding');
ContentBinding.prototype = Object.create(Binding.prototype);

function ContentBinding(element,model,scope){
  Binding.apply(this,arguments);
}
ContentBinding.prototype.updateBinding = function(){
  var boundTo = this.element.getAttribute('crochet-binding');
  try {
    var value = this.getModelField(boundTo);
  }catch(e){
    alert(e.message);
    return;
  }
  console.log("value is ", value , this.element , this.model);
  this.element.textContent = value;
}

module.exports = ContentBinding;