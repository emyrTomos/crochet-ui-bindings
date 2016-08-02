/**
 * Created by emyr on 25/07/16.
 */
var ContentBinding = require('./ContentBinding');
var InputBinding = require('./InputBinding');
var FieldsetBinding = require('./FieldsetBinding');
function Binder(_model , _view , _scope){
  var scope = _scope || document.body;
  var model = _model;
  var view = _view;
  var bindings = [];
  var element = view.getElement();
  var getInputElements = function(_element){
    return _element.querySelectorAll('[crochet-binding][input]');
  };
  var getContentElements = function(_element){
    return _element.getElementsByTagName('[crochet-binding][label]');
  }

  var contentElements = getContentElements(element);
  for(var i=0; i<contentElements.length; i++){
    var binding = new ContentBinding(contentElements.item(i),model,scope);
    binding.bindUpdates();
    bindings.push(binding);
  }
  var inputElements = getInputElements(element);
  for(var i=0; i<inputElements.length; i++){
    var binding;
    if(inputElements.item(i).tagName.toUpperCase() === 'FIELDSET'){
      binding = new FieldsetBinding(inputElements.item(i),model,scope);
    }else if(inputElements.item(i).tagName.toUpperCase() === 'SELECT'){
      //need to make one of these
      //binding = new SelectBinding(inputElements.item(i),model,scope);
    }else{
      binding = new InputBinding(inputElements.item(i),model,scope);
    }
    binding.bindUpdates();
    binding.bindModifications();
    bindings.push(binding);
  }
}
module.exports = Binder;