/**
 * 类型断言
 * TypeScript 允许你覆盖它的推断，并且能以你任何你想要的方式分析它，这种机制被称为「类型断言」。
 * TypeScript 类型断言用来告诉编译器你比它更了解这个类型，并且它不应该再发出错误。
 */
const foo = {};
foo.bar = 123;
foo.bas = 'hello';

// convert to 
interface Foo {
  bar: number;
  bas: string;
}

const foo1 = {} as Foo;
foo1.bar = 123;
foo1.bas = 'hello';

/**
 * as foo vs <foo>
 * 在 JSX 中使用 <foo> 的断言语法时，这会与 JSX 的语法存在歧义
 * 所以建议使用as foo语法
 */
let fooOriginal: any;
let barOriginal = <string>fooOriginal; // string
