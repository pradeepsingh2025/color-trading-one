import { createContext, useContext, useState } from "react";

export const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

// Optional: wrapper to simplify use
export const UserProvider = ({ children, initialUser }) => {
  const [user, setUser] = useState(initialUser || null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
