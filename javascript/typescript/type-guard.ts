/**
 * instanceof
 * typeof
 * in
 */
class Foo {
  foo() {
    return 'foo';
  }
}

class Bar {
  bar() {
    return 'bar';
  }
}

function doSomething(args: Foo | Bar) {
  if (args instanceof Foo) {
    console.log(args.foo());
    console.log(args.bar()); // error
  }
  if (args instanceof Bar) {
    console.log(args.bar());
  }
}
