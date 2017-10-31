(function() {
  var HelloWorld;

  HelloWorld = (function() {
    class HelloWorld {};

    HelloWorld.test = 'test';

    return HelloWorld;

  })();

}).call(this);

(function() {
  console.log('hi');

}).call(this);

(function() {
  // Begin function declaration.
  var sayHello;

  sayHello = function() {
    // Print a greeting.
    return console.log('hi');
  };

}).call(this);
