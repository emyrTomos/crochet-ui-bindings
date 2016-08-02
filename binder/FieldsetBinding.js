/**
 * Created by emyr on 27/07/16.
 */
var InputBinding = require('./InputBinding');
FieldsetBinding.prototype = Object.create(InputBinding.prototype);
function FieldsetBinding(element,model,scope){
  InputBinding.apply(this,arguments);
};
FieldsetBinding.prototype.updateBinding = function(){
  try {
    var value = this.getModelField();
  }catch(e){
    alert(e.message);
    return;
  }
  this.element.querySelector('[value="'+value+'"]').checked = true;
}
FieldsetBinding.prototype.modify = function(evt){
  var value = evt.originalTarget.value;
  console.log(this.element.querySelector('input:checked') , evt.originalTarget);
  this.setModelField(value);
  this.broadcast();
}

module.exports = FieldsetBinding;