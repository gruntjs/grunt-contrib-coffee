define "myModule", (require, exports, module) ->
  class HelloWorld
    @test: 'test'
  console.log('hi')
  return exports