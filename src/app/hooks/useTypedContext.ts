import { type Context, useContext } from 'react';

export const useTypedContext = <T>(context: Context<T | null>) => {
  const contextValue = useContext(context);
  if (contextValue === null) throw new Error();
  return contextValue;
};
