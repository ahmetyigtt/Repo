import React ,{useState} from 'react'

export const UserContext = React.createContext();


export const UserContextProvider = ({children}) => {

    const [login, setLogin] = useState(false);
    const [userData, setUserData] = useState({});

  return (
    <UserContext.Provider value={{login, setLogin,userData, setUserData}}>
      {children}
    </UserContext.Provider>
  )
}

