// has or not has property
type AllOrNone<T> = Required<T> | Partial<Record<keyof T, undefined>>;

interface Name {
  firstName: string;
  lastName: string;
}

type MyComponentProps = AllOrNone<Name>;

export type MyComponentProps2 = {
  firstName?: string;
  lastName?: string;
} | {
  firstName: string;
  lastName: string;
}

// test
const test: MyComponentProps2 = {
  firstName: 'test',
  lastName: 'test',
};
const test2: MyComponentProps2 = {
  lastName: 'test',
};
