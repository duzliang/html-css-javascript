/**
 * 类型移动
 */

// 复制类型
class FlowType {}

const SubType = FlowType;

let st: SubType; // error

namespace importTest {
  export class FlowType {}
}

import SubType2 = importTest.FlowType;
let st2: SubType2; // ok
