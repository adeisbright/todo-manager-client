import { useContext, createContext } from "react";

export const TodoContext = createContext();

export const useTodoContext = () => useContext(TodoContext);
