import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [authState, setAuthState] = useState({ isAuth: false, user: null });

  const loginUser = (user) => {
    setAuthState({ isAuth: true, user: user });
  };
  const logoutUser = () => {
    setAuthState({ isAuth: false, token: null });
  };

  let providerState = {
    authState: authState,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  return (
    <AuthContext.Provider value={providerState}>
      {children}
    </AuthContext.Provider>
  );
};
