import { createContext, useState, useEffect } from "react";
import type { Dispatch } from "react";
import { onAuthStateChangedListener } from "../lib/firebase";
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const value: any = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubcribe = onAuthStateChangedListener((user: any) => {
      setCurrentUser(user);
    });

    return unsubcribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
