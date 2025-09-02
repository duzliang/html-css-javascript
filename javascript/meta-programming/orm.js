// 假设你有通用的校验函数
function validate(obj, key, value) {
  // 复杂的校验逻辑，例如从装饰器或配置中读取规则
  console.log(`正在校验属性 ${key} 的值: ${value}`);
  if (key === 'name' && (typeof value !== 'string' || value.trim() === '')) {
    throw new Error('名称必须是非空字符串！');
  }
  return true;
}

const handler = {
  set(target, key, value, receiver) {
    if (validate(target, key, value)) {
      return Reflect.set(target, key, value, receiver);
    }
  }
};

class User {}
const proxyUser = new Proxy(new User(), handler);

try {
  proxyUser.name = 'John Doe'; // 正常
  proxyUser.age = 30; // 正常
  proxyUser.name = ''; // 抛出错误
} catch (e) {
  console.error(e.message);
}