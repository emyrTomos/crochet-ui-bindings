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
exports.createFieldsetBinding = function(model , element){
  var binding = new FieldsetBinding(model , element);
  binding.bindUpdates();
  binding.bindModifications();
  return binding;
};
exports.createInputBinding = function(model , element){
  var binding = new InputBinding(model , element);
  binding.bindUpdates();
  binding.bindModifications();
  return binding;
};
exports.createContentBinding = function(model , element){
  var binding = new ContentBinding(model , element);
  binding.bindUpdates();
  return binding;
};
exports.getBindableElements = function(_treetop){
  console.log(_treetop.querySelectorAll('[crochet-binding]:not(component *[crochet-binding])'));
  console.log(_treetop.querySelectorAll('component[crochet-binding]'));
  console.log(_treetop.querySelectorAll('content[crochet-binding]'));
}