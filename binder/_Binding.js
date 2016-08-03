/**
 * Created by emyr on 25/07/16.
 */
function Binding(_model , _element , _binding , _type , _scope){
  this.scope = _scope || document.body;
  this.type = _type;
  this.model = _model;
  this.element = _element;
  this.binding = _binding;
}
Binding.prototype.bindUpdates = function(){
  this.scope.addEventListener('crochet:update:'+this.binding,this.updateListener.bind(this),true);
  this.scope.addEventListener('crochet:modelChange',this.changeModel.bind(this));
  this.scope.addEventListener('crochet:modelRefresh',this.refreshModel.bind(this));
}
Binding.prototype.changeModel = function(evt){
  if(evt.detail.model === this.model || evt.detail.previousModel === this.model){
    this.updateBinding();
  }
}
Binding.prototype.refreshModel = function(evt){
  if(evt.detail.model === this.model){
    this.updateBinding();
  }
}
Binding.prototype.updateListener = function(evt){
  if(evt.detail.model !== this.model || evt.detail.binding !== this.binding || evt.detail.originElement === this.element){
    return;
  }
  var value = this.getModelField();
  if(this.type === "action" && this.action){
    this.action.call(this.element , value);
  }else{
    this.updateBinding(value);
  }
};
Binding.prototype.setAction = function(_action){
  this.action = _action;
}
Binding.prototype.getModelField = function(){
  var field = "get" + this.binding.charAt(0).toUpperCase() + this.binding.slice(1);
  var candidate = this.model[field];
  if(typeof candidate === 'function'){
    return candidate();
  }else if(typeof candidate === 'undefined'){
    candidate = this.model[this.binding];
    if(typeof candidate === 'undefined'){
      throw "No field called "+ this.binding + " or "+ field + " found";
    }else{
      return candidate;
    }
  }
};
Binding.prototype.setModelField = function(_value){
  var value = _value;
  var field = "set" + this.binding.charAt(0).toUpperCase() + this.binding.slice(1);
  var candidate = this.model[field];
  if(typeof candidate === 'function'){
    candidate(value);
  }else if(this.model[this.binding]){
    this.model[this.binding] = value;
  }else{
    throw "No field called "+ this.binding + " or "+ field + " found";
  }
};
Binding.prototype.broadcast = function(){
  var detail = {model:this.model,binding:this.binding,originElement:this.element};
  var event = new CustomEvent('crochet:update:'+this.binding,{detail:detail});
  this.scope.dispatchEvent(event);
}

module.exports = Binding;