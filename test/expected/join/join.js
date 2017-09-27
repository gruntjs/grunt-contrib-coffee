(function() {
  var HelloWorld;

  HelloWorld = (function() {
    class HelloWorld {};

    HelloWorld.test = 'test';

    return HelloWorld;

  })();

  console.log('hi');

}).call(this);
