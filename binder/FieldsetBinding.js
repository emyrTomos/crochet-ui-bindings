/**
 * Created by emyr on 27/07/16.
 */
var InputBinding = require('./InputBinding');
FieldsetBinding.prototype = Object.create(InputBinding.prototype);
function FieldsetBinding(){
  InputBinding.apply(this,arguments);
  this.multi = false;
  if(this.element.elements[0].type === "checkbox"){
    this.multi = true;
  }
};
FieldsetBinding.prototype.updateBinding = function(value){
  if(this.multi){
    for(var i=0; i<this.element.elements.length;i++){
      if(value.indexOf(this.element.elements[i].value)<0){
        this.element.elements[i].checked = false;
      }else{
        this.element.elements[i].checked = true;
      }
    }
  }else{
    this.element.querySelector('[value="'+value+'"]').checked = true;
  }
}
FieldsetBinding.prototype.modify = function(evt){
  var value;
  if(this.multi){
    value = [];
    for(var i=0; i<this.element.elements.length; i++){
      if(this.element.elements[i].checked){
        value.push(this.element.elements[i].value);
      }
    }
  }else{
    value = evt.target.value;
  }
  this.setModelField(value);
  this.broadcast();
}
module.exports = FieldsetBinding;