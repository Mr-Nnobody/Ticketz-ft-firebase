import React, { createContext, useState, useContext } from "react";

//....
const UserContext = createContext();

const UserProvider = ({ children }) => {
  //agency personnel data
  const [auser, setAuser] = useState([]);
  //AGENCY personnel userID
  const [auserId, setAuserId] = useState(null);
  //user data(passenger)
  const [user, setUser] = useState([]);
  //userID(passenger)
  const [userId, setUserId] = useState(null);
  //view tickets data
  const [view, setView] = useState([]);
  //tickets data for search functionality
  const [ticket, setTicket] = useState([]);
  //agency data for quick agency name display
  const [agencies, setAgencies] = useState([]);
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
        ticket,
        setTicket,
        agencies,
        setAgencies,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
