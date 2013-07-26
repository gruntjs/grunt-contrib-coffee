(function() {
  var X, Y, Z,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Z = (function() {
    function Z(foo) {
      this.foo = foo;
    }

    return Z;

  })();

  Y = (function(_super) {
    __extends(Y, _super);

    function Y(foo, bar) {
      this.foo = foo;
      this.bar = bar;
    }

    Y.prototype.doSomething = function() {
      return console.log(this.foo);
    };

    return Y;

  })(Z);

  X = (function(_super) {
    __extends(X, _super);

    function X(foo, bar, lol) {
      this.foo = foo;
      this.bar = bar;
      this.lol = lol;
    }

    return X;

  })(Y);

}).call(this);
