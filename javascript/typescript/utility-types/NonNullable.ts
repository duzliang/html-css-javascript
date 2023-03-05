/** NonNullable<Type> */

/** excluding null and undefinded from Type */
type N0 = NonNullable<string | number | undefined>;

type N1 = NonNullable<string[] | null | undefined>;
