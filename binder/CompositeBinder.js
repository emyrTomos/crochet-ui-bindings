/**
 * Created by emyr on 25/07/16.
 */
var ContentBinding = require('./ContentBinding');
var InputBinding = require('./InputBinding');
var FieldsetBinding = require('./FieldsetBinding');
var SelectBinding = require('./SelectBinding');
function Binder(_model , _view , _scope){
  var scope = _view.getElement();// || document.body;
  var model = _model;
  var view = _view;
  var bindings = [];
  var element = view.getElement();
  var getInputElements = function(_element){
    return _element.querySelectorAll('[crochet-binding][crochet-type="input"]');
  };
  var getContentElements = function(_element){
    return _element.getElementsByTagName('[crochet-binding][crochet-type="label"]');
  }

  var contentElements = getContentElements(element);
  for(var i=0; i<contentElements.length; i++){
    var binding = new ContentBinding(model , contentElements.item(i),scope);
    binding.bindUpdates();
    bindings.push(binding);
  }
  var inputElements = getInputElements(element);
  for(var i=0; i<inputElements.length; i++){
    var binding;
    var element = inputElements.item(i);
    var name = element.getAttribute('crochet-binding');
    var type = element.getAttribute('crochet-type') || "input";
    if(element.tagName.toUpperCase() === 'FIELDSET'){
      binding = new FieldsetBinding(model,element,name,type,scope);
    }else if(element.tagName.toUpperCase() === 'SELECT'){
      binding = new SelectBinding(model,element,name,type,scope);
    }else{
      binding = new InputBinding(model,element,name,type,scope);
    }
    binding.bindUpdates();
    binding.bindModifications();
    bindings.push(binding);
  }
}
module.exports = Binder;