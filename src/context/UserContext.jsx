import { createContext, useContext, useState } from "react";

export const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

// Optional: wrapper to simplify use
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const refreshUserBalance = async () => {
    try {
      fetch("http://localhost:3001/api/user/wallet/balance", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      }).then(async (res) => {
        const { data } = await res.json();
        console.log(data.balance);
        if (res.ok) {
          const updatedUser = {
            ...user,
            wallet: { ...user.wallet, balance: data.balance },
          };
          setUser(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }
      });
    } catch (error) {
      console.error("Failed to refresh wallet balance", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, refreshUserBalance }}>
      {children}
    </UserContext.Provider>
  );
};
