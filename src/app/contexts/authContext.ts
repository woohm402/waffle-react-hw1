import { createContext } from 'react';

import { type User } from '../../entities/user';

export const authContext = createContext<{ myInfo: User } | null>(null);
