/** 类型声明空间, 声明用来做类型注解的内容 */
class Foo { }
interface Bar { }
type Bas = {}

const foo = Foo; // 只有类同时提供了变量Foo到类型声明空间和变量声明空间
const bar = Bar; // interface and type only to variable namespace
const bas = Base;
