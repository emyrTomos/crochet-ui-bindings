/**
 * Created by emyr on 27/07/16.
 */
var InputBinding = require('./InputBinding');
SelectBinding.prototype = Object.create(InputBinding.prototype);
function SelectBinding(){
  InputBinding.apply(this,arguments);
  this.multi = this.element.multiple;
};
SelectBinding.prototype.updateBinding = function(value){
  if(this.multi){
    for(var i=0; i<this.element.options.length;i++){
      if(value.indexOf(this.element.options[i].value)<0){
        this.element.options[i].selected = false;
      }else{
        this.element.options[i].selected = true;
      }
    }
  }else{
    this.element.querySelector('[value="'+value+'"]').selected = true;
  }
}

SelectBinding.prototype.modify = function(evt){
  var value;
  if(this.multi){
    value = [];
    for(var i=0; i<evt.target.options.length; i++){
      if(evt.target.options[i].selected){
        value.push(evt.target.options[i].value);
      }
    }
  }else{
    value = evt.target.value;
  }
  this.setModelField(value);
  this.broadcast();
}
module.exports = SelectBinding;