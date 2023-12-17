/**
 * Module
 */
var ModuleManger = (function Manager() {
  var modules = {};

  function define(name, deps, impl) {
    for (var i = 0; i < deps.length; i++) {
      deps[i] = modules[deps[i]];
    }

    modules[name] = impl.apply(impl, deps);
  }

  function get(name) {
    return modules[name];
  }

  return {
    define: define,
    get: get,
  };
})();

ModuleManger.define('bar', [], function() {
  function hello(who) {
    return 'Let me introduction:' + who;
  }
  return {
    hello: hello,
  };
});

ModuleManger.define('foo', ['bar'], function(bar) {
  var hungery = 'duke';
  function awesome() {
    console.log('log=>', bar.hello(hungery).toUpperCase())
  }
  return {
    awesome: awesome
  }
})

var bar = ModuleManger.get('bar');
var foo = ModuleManger.get('foo');
console.log('log=>', bar.hello('duke'));
foo.awesome();