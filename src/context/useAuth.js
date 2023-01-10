import { createContext, useState } from "react";

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const[auth, setAuth] = useState({})


    // const authFields  = {
    //     token: '',

    // } 

    return( 
        <AuthContext.Provider value={{ auth, setAuth }}>
            { children }
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider }