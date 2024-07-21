import React, { createContext, useState, useContext } from "react";

//....
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [auser, setAuser] = useState([]);
  const [user, setUser] = useState([]);
  const [auserId, setAuserId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [view, setView] = useState([]);
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        auser,
        setAuser,
        auserId,
        setAuserId,
        userId,
        setUserId,
        view,
        setView,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
