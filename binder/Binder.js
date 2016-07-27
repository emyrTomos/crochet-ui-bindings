/**
 * Created by emyr on 25/07/16.
 */
var ElementBinding = require('./ElementBinding');
var AttributeBinding = require('./AttributeBinding');
function Binder(_model , _view , _scope){
  var scope = _scope || window;
  var model = _model;
  var view = _view;
  var bindings = [];
  var element = view.getElement();
  var getCrochetAttributes = function(_element){
    return _element.querySelectorAll('[crochet-binding]');
  };
  var getCrochetElements = function(_element){
    return _element.getElementsByTagName('content');
  }

  var bindableElements = getCrochetElements(element);
  for(var i=0; i<bindableElements.length; i++){
    var binding = new ElementBinding(bindableElements.item(i),model,scope);
    binding.bindUpdates();
    bindings.push(binding);
  }
  var bindableElementsByAttribute = getCrochetAttributes(element);
  for(var i=0; i<bindableElementsByAttribute.length; i++){
    var binding = new AttributeBinding(bindableElementsByAttribute.item(i),model,scope);
    binding.bindUpdates();//binds updates from other elements bound to the same model
    binding.bindModifications();//listens for modifications to the element and issues a change event
    bindings.push(binding);
  }
}
module.exports = Binder;