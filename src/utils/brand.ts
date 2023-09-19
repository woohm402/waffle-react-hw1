export type Brand<T, B extends string> = T & { __brand: B };

// as 를 남발하지 않기 위해 brand 함수를 두고 재사용한다
export const brand = <T, B extends string>(value: T, brand: B) =>
  value as Brand<T, typeof brand>;
