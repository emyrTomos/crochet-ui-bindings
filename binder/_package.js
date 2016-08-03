/**
 * Created by emyr on 27/07/16.
 */
var CompositeBinder = require('./CompositeBinder');
var ContentBinding = require('./ContentBinding');
var InputBinding = require('./InputBinding');
var FieldsetBinding = require('./FieldsetBinding');
exports.createBinder = function(model , element){
  return new CompositeBinder(model , element);
};
exports.createFieldsetBinding = function(model , element , scope){
  var name = element.getAttribute('crochet-binding');
  var type = element.getAttribute('crochet-type') || "input";
  var binding = new FieldsetBinding(model , element , name , type , scope);
  binding.bindUpdates();
  binding.bindModifications();
  return binding;
};
exports.createInputBinding = function(model , element , scope){
  var name = element.getAttribute('crochet-binding');
  var type = element.getAttribute('crochet-type') || "input";
  var binding = new InputBinding(model , element , name , type , scope);
  binding.bindUpdates();
  binding.bindModifications();
  return binding;
};
exports.createContentBinding = function(model , element , scope , action){
  var type = element.getAttribute('crochet-type') || "label";
  var name = element.getAttribute('crochet-binding');
  var binding = new ContentBinding(model , element , name , type , scope);
  if(action && type === "action"){
    binding.setAction(action);
  }
  binding.bindUpdates();
  return binding;
};
exports.getBindableElements = function(_treetop){
}