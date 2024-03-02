/**
 * indexes
 * 索引签名
 * An index signature parameter type must be 'string', 'number', 'symbol', or a template literal type.
 */
type Obj = {
  [index: string | number]: any;
}

let obj: Obj = {
  name: 'duke',
  1: 'home',
  5: 'school',
};
