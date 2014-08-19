(function() {
  var HelloWorld;

  HelloWorld = (function() {
    function HelloWorld() {}

    HelloWorld.check = 'check';

    return HelloWorld;

  })();

}).call(this);

(function() {
  console.log('hello');

}).call(this);
