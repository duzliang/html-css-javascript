// ============== 1. Reflect基础用法对比 ==============

const obj = {
	name: "测试对象",
	getValue() {
		return this.name;
	},
};

console.log("=== Reflect vs 传统方法对比 ===");

// 传统方法 vs Reflect方法
console.log("传统方式:", obj.name);
console.log("Reflect方式:", Reflect.get(obj, "name"));

// 设置属性
obj.age = 25; // 传统方式
Reflect.set(obj, "city", "北京"); // Reflect方式

// 检查属性存在
console.log("传统方式:", "name" in obj);
console.log("Reflect方式:", Reflect.has(obj, "name"));

// 删除属性
delete obj.age; // 传统方式
Reflect.deleteProperty(obj, "city"); // Reflect方式

console.log("最终对象:", obj);

// ============== 2. Reflect.apply - 函数调用 ==============

console.log("\n=== Reflect.apply 示例 ===");

function greet(greeting, punctuation = "!") {
	return `${greeting}, 我是 ${this.name}${punctuation}`;
}

const person = { name: "小明" };

// 传统方式
console.log("传统方式:", greet.call(person, "你好"));

// Reflect方式
console.log("Reflect方式:", Reflect.apply(greet, person, ["你好", "!!!"]));

// 更安全的函数调用（避免函数被篡改）
const originalApply = Function.prototype.apply;
Function.prototype.apply = function () {
	console.log("apply方法被篡改了！");
	return "被篡改的结果";
};

console.log("被篡改后的call:", greet.call(person, "哈喽"));
console.log("Reflect不受影响:", Reflect.apply(greet, person, ["哈喽"]));

// 恢复原始方法
Function.prototype.apply = originalApply;

// ============== 3. Reflect.construct - 构造函数调用 ==============

console.log("\n=== Reflect.construct 示例 ===");

class Animal {
	constructor(name, type) {
		this.name = name;
		this.type = type;
	}

	speak() {
		return `${this.name}是一只${this.type}`;
	}
}

// 传统方式
const animal1 = new Animal("旺财", "狗");
console.log("传统方式:", animal1.speak());

// Reflect方式
const animal2 = Reflect.construct(Animal, ["咪咪", "猫"]);
console.log("Reflect方式:", animal2.speak());

// 指定不同的原型
class Pet extends Animal {
	constructor(name, type, owner) {
		super(name, type);
		this.owner = owner;
	}
}

// 使用Animal构造函数，但创建Pet实例
const pet = Reflect.construct(Animal, ["小白", "兔子"], Pet);
console.log("混合构造:", pet instanceof Pet, pet instanceof Animal);

// ============== 4. Reflect与Proxy配合使用 ==============

console.log("\n=== Reflect与Proxy配合示例 ===");

const data = {
	_private: "私有数据",
	public: "公共数据",
};

const secureProxy = new Proxy(data, {
	get(target, property, receiver) {
		if (property.startsWith("_")) {
			throw new Error(`不能访问私有属性: ${property}`);
		}

		// 使用Reflect执行默认行为
		return Reflect.get(target, property, receiver);
	},

	set(target, property, value, receiver) {
		if (property.startsWith("_")) {
			throw new Error(`不能设置私有属性: ${property}`);
		}

		console.log(`设置属性 ${property} = ${value}`);
		return Reflect.set(target, property, value, receiver);
	},

	has(target, property) {
		if (property.startsWith("_")) {
			return false; // 隐藏私有属性
		}
		return Reflect.has(target, property);
	},

	ownKeys(target) {
		// 只返回非私有属性
		return Reflect.ownKeys(target).filter((key) => !key.startsWith("_"));
	},
});

console.log("公共属性:", secureProxy.public);
console.log("属性检查:", "public" in secureProxy);
console.log("属性检查:", "_private" in secureProxy);
console.log("所有键:", Object.keys(secureProxy));

try {
	console.log(secureProxy._private);
} catch (error) {
	console.log("访问私有属性错误:", error.message);
}

// ============== 5. 属性描述符操作 ==============

console.log("\n=== 属性描述符示例 ===");

const testObj = {};

// 定义属性
Reflect.defineProperty(testObj, "readOnly", {
	value: "只读属性",
	writable: false,
	enumerable: true,
	configurable: false,
});

Reflect.defineProperty(testObj, "hidden", {
	value: "隐藏属性",
	writable: true,
	enumerable: false,
	configurable: true,
});

// 获取属性描述符
console.log(
	"readOnly描述符:",
	Reflect.getOwnPropertyDescriptor(testObj, "readOnly"),
);
console.log(
	"hidden描述符:",
	Reflect.getOwnPropertyDescriptor(testObj, "hidden"),
);

// 遍历属性
console.log("可枚举属性:", Object.keys(testObj));
console.log("所有属性:", Reflect.ownKeys(testObj));

// ============== 6. 高级元编程模式 ===== =============

console.log("\n=== 高级元编程模式 ===");

// 创建一个支持链式调用的查询构建器
class QueryBuilder {
	constructor(table) {
		this.table = table;
		this.conditions = [];
		this.orderBy = null;
		this.limitNum = null;

		return new Proxy(this, {
			get(target, property, receiver) {
				// 检查是否是已存在的方法
				if (property in target) {
					const value = Reflect.get(target, property, receiver);
					// 如果是方法，绑定this并返回
					if (typeof value === "function") {
						return value.bind(target);
					}
					return value;
				}

				// 动态创建where条件方法
				if (property.startsWith("where")) {
					const field = property.substring(5).toLowerCase();
					return function (value) {
						this.conditions.push(`${field} = '${value}'`);
						return this; // 支持链式调用
					};
				}

				return Reflect.get(target, property, receiver);
			},
		});
	}

	where(field, value) {
		this.conditions.push(`${field} = '${value}'`);
		return this;
	}

	orderByField(field, direction = "ASC") {
		this.orderBy = `${field} ${direction}`;
		return this;
	}

	limit(num) {
		this.limitNum = num;
		return this;
	}

	toSQL() {
		let sql = `SELECT * FROM ${this.table}`;

		if (this.conditions.length > 0) {
			sql += ` WHERE ${this.conditions.join(" AND ")}`;
		}

		if (this.orderBy) {
			sql += ` ORDER BY ${this.orderBy}`;
		}

		if (this.limitNum) {
			sql += ` LIMIT ${this.limitNum}`;
		}

		return sql + ";";
	}
}

// 使用查询构建器
const query = new QueryBuilder("users")
	.whereName("张三") // 动态方法
	.whereAge("25") // 动态方法
	.where("status", "active")
	.orderByField("created_at", "DESC")
	.limit(10);

console.log("生成的SQL:", query.toSQL());

// ============== 7. 深度代理（递归代理） ==============

console.log("\n=== 深度代理示例 ===");

function createDeepProxy(target, handler) {
	const proxyCache = new WeakMap();

	function makeProxy(obj) {
		if (proxyCache.has(obj)) {
			return proxyCache.get(obj);
		}

		const proxy = new Proxy(obj, {
			get(target, property, receiver) {
				console.log(`🔍 访问: ${property}`);
				const value = Reflect.get(target, property, receiver);

				// 如果值是对象，也对其进行代理
				if (value !== null && typeof value === "object") {
					return makeProxy(value);
				}

				return value;
			},

			set(target, property, value, receiver) {
				console.log(`📝 设置: ${property} = ${value}`);
				return Reflect.set(target, property, value, receiver);
			},
		});

		proxyCache.set(obj, proxy);
		return proxy;
	}

	return makeProxy(target);
}

const deepData = createDeepProxy({
	user: {
		profile: {
			name: "深层用户",
			settings: {
				theme: "dark",
			},
		},
	},
});

// 深层访问和修改都会被拦截
console.log(deepData.user.profile.name);
deepData.user.profile.settings.theme = "light";
