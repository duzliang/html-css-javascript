/** Parameters<Type> 从一个函数类型Type的参数中使用的类型构建一个元组类型 */

declare function f1(arg: { a: number; b: string }): void;

type P0 = Parameters<() => string>;

type P1 = Parameters<(s: string) => void>;

type P2 = Parameters<<T>(arg: T) => T>;

type P3 = Parameters<typeof f1>;

type P4 = Parameters<any>;

type P5 = Parameters<never>;

type P6 = Parameters<string>;

type P7 = Parameters<Function>;
