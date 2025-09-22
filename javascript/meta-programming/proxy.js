const target = {
	name: "张三",
	age: 18,
	sex: "男",
};

const handler = {
	get(target, property, receiver) {
		console.log("访问属性", property);
		return target[property];
	},
	set(target, property, value, receiver) {
		console.log("设置属性", property, value);
		target[property] = value;
		return true;
	},
};

const proxy = new Proxy(target, handler);

// console.log(proxy.name);
// proxy.name = "李四";
// console.log(proxy.name);

// 数据校验

class User {
	constructor(name, email) {
		return new Proxy(this, {
			set(target, property, value, receiver) {
				if (property === "email") {
					const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
					if (!emailRegex.test(value)) {
						throw new Error("Email is invalid");
					}
				}

				if (property === "name") {
					if (!value) {
						throw new Error("Name is required");
					}
				}

				if (property === "age") {
					if (typeof value !== "number" || value < 0 || value > 150) {
						throw new Error(
							"Age is invalid: age must be a number between 0 and 150",
						);
					}
				}
			},
		});
	}
}

const user = new User();
user.name = "张三";
user.email = "abc@gmail.com";
user.age = 18;

try {
	user.age = -1;
} catch (error) {
	console.log("validate error:", error);
}
