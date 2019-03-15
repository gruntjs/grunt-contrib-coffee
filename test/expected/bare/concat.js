var HelloWorld;

HelloWorld = (function() {
  class HelloWorld {};

  HelloWorld.test = 'test';

  return HelloWorld;

}).call(this);

console.log('hi');

// Begin function declaration.
var sayHello;

sayHello = function() {
  // Print a greeting.
  return console.log('hi');
};
