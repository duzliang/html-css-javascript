/**
 * 类型移动
 */

// 1.复制类型
class FlowType {}

const SubType = FlowType;

let st: SubType; // error

namespace importTest {
  export class FlowType {}
}

import SubType2 = importTest.FlowType;
let st2: SubType2; // ok

// 2.捕获变量类型
let vt = 18;
let subVt: typeof vt; // number
subVt = 12;
subVt = '20';

// 3.捕获类成员的类型
class People {
  name: string;
}

declare let Tom: People;
let tn: typeof Tom.name;

// 4.捕获字符串类型
const hw = 'hello world';
let subHw: typeof hw;

subHw = 'hello world';
subHw = 'other'; // 只能是 hello world

// 5.捕获键的名称
const colors = {
  red: 'red',
  blue: 'blue',
};

type Colors = keyof typeof colors; // 'red' | 'blue'