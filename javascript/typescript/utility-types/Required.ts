/** Required<Type> */

interface Props {
  a?: string;
  b?: number;
}

/** all Type's properties are required, opposite of Partial */
const obj1: Props = { a: 'duke' };
const obj2: Required<Props> = { a: 'duke' }; // wrong
const obj3: Required<Props> = { a: 'duke', b: 7 }; // right
