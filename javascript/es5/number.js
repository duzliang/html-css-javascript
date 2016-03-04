// 被0整除返回无穷大
2 / 0 = Infinity;
-2 / 0 = -Infinity;

// 3.1.3 非数字和任何值都不相等，包括自身
var str = 'is nan';
var nan == Number(str);
nan == NaN // false
nan != NaN // true

isNaN(nan) // true

-0 == 0 // true

.3 - .2 != .2 - .1 // true