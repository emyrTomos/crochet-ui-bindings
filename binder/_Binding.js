/**
 * Created by emyr on 25/07/16.
 */
function Binding(_element , _model , _scope){
  this.scope = _scope;
  this.model = _model;
  this.element = _element;
}
Binding.prototype.bindUpdates = function(){
  this.scope.addEventListener('crochet:update',function(evt){
    if(evt.detail.model !== this.model || evt.detail.originElement === this.element){
      return;
    }
    console.log(evt , evt.detail.originElement,evt.detail.model , this.model , this.element);
    this.updateBinding();
  });
}
Binding.prototype.getModelField = function(_field){
  var field = "get" + _field.charAtIndex(0).toUpperCase() + _field.slice(1);
  console.log(field);
  var candidate = this.model[field];
  if(typeof candidate === 'function'){
    return candidate();
  }else if(typeof candidate === 'undefined'){
    candidate = this.model[_field];
    if(typeof candidate === 'undefined'){
      throw "No field called "+_field + " or "+ field + " found";
    }else{
      return candidate;
    }
  }
}
Binding.prototype.setModelField = function(_field , _value){
  var value = _value;
  var field = "set" + _field.charAtIndex(0).toUpperCase() + _field.slice(1);
  console.log(field);
  var candidate = this.model[field];
  if(typeof candidate === 'function'){
    candidate(value);
  }else if(this.model[_field]){
    this.model[_field] = value;
  }else{
    throw "No field called "+_field + " or "+ field + " found";
  }
}
Binding.prototype.broadcast = function(_binding){
  console.log("In a binding ", this);
  var detail = {model:this.model,binding:_binding,originElement:this.element};
  var event = new CustomEvent('crochet:update',{detail:detail});
}

module.exports = Binding;