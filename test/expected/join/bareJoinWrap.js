define(function(require, exports, module) {
  var HelloWorld;
  HelloWorld = (function() {
    function HelloWorld() {}

    HelloWorld.test = 'test';

    return HelloWorld;

  })();
  console.log('hi');
  return exports;
});
