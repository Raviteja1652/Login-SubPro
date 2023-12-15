import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {},
});


export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token')
    const [token, setToken] = useState(initialToken);

    const userIsLoggedIn = !!token;

    const loginHandler = (token) => {
        localStorage.setItem('token', token)
        setToken(token)
        autoLogoutTimer();
    };
    const logoutHandler = () => {
        localStorage.removeItem('token')
        setToken(null)
        clearTimeout(logoutTimer)
    };

    let logoutTimer;

    const autoLogoutTimer = () => {
        logoutTimer = setTimeout(() => {
            logoutHandler()
        }, 3*60*1000) // 3 minutes of inactivity
    };
    useEffect(() => {
        if(token){
            autoLogoutTimer()
        }
    }, [token])

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    }

    return(
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
};

export default AuthContext;