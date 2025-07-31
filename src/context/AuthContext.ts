import { createContext } from 'react';

type AuthContextType = {
    isUserAuthenticated: boolean;
    setIsUserAuthenticated: (isAuthenticated: boolean) => void;

}

export const AuthContext = createContext<AuthContextType>({
    isUserAuthenticated: false,
    setIsUserAuthenticated: () => {}
});