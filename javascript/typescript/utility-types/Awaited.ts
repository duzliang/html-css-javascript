/** Awaited<Type> */

type A = Awaited<Promise<string>>;

type B = Awaited<Promise<Promise<number>>>;

type C = Awaited<boolean | Promise<number>>;
