/**
 * Created by emyr on 25/07/16.
 */
var Binder = require('./binder/Binder.js');
exports.printMsg = function() {
  console.log("This is a message from the crochet package");
};
exports.createBinder = function(model , element){
  return new Binder(model , element);
}