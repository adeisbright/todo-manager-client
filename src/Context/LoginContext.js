import { useContext, createContext } from "react";

export const LoginContext = createContext();

export const useLoginContext = () => useContext(LoginContext);
