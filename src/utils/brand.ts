export type Brand<T, B extends string> = T & { __brand: B };

export const brand = <T, B extends string>(value: T, brand: B) =>
  value as Brand<T, typeof brand>;
