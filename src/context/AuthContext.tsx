import { createContext, useState } from 'react';

interface AuthContextType {
  user: string | null;
  login: (username: string, password: string) => boolean;
  logout: () => boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => false,
  logout: () => false,
});

const MOCK_USERS = [{ username: "admin", password: "admin" }];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ?? null;
  });

  const login = (username: string, password: string): boolean => {
    const userFound = MOCK_USERS.find(
      (user) => user.username === username && user.password === password,
    );

    if (userFound) {
      setUser(userFound.username);
      localStorage.setItem("user", userFound.username);

      return true;
    }

    return false;
  };

  const logout = (): boolean => {
    setUser(null);
    localStorage.clear();

    return true;
  };

  return (
    <AuthContext.Provider value={{user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
