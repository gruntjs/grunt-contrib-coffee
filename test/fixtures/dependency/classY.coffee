#_require classZ

class Y extends Z
    
    constructor: (@foo, @bar) ->

    doSomething: () -> console.log(@foo)