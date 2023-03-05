/** Extract<Type, Union> */

// extracting from `Type` all union members that are assignable to Union
type E0 = Extract<'a' | 'b' | 'c', 'a' | 'f'>; // a
type E1 = Extract<string | number | (() => void), Function>; // () => void
