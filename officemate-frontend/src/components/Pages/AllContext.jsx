import  { createContext, useContext, useState } from "react";

const AllContext = createContext();

export const useAllContext = () => useContext(AllContext);

export const AllProvider = ({ children }) => {
  const [allTask, setAllTask] = useState([]);

  return (
    <AllContext.Provider value={{ allTask, setAllTask }}>
      {children}
    </AllContext.Provider>
  );
};
