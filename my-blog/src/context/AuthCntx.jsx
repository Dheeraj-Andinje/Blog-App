// 


import { createContext, useState} from "react";

// Create context
export const AuthCntx = createContext();

// Provider component
export const AuthProvider = ({ children }) => {

  
  // State to store user data, initialized from localStorage if available
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
   
    
    return savedUser ? JSON.parse(savedUser) : null;
  });
 

 
 

  // Login function: Saves user data to localStorage and updates the state
  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // Logout function: Removes user data from localStorage and clears the state
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // Return the provider to pass the context value to children components
  return (
    <AuthCntx.Provider value={{ user, login, logout }}>
      {children}
    </AuthCntx.Provider>
  );
};
