import React, {useEffect, useState} from 'react'
import {Outlet} from "react-router-dom";
import {useCookies} from "react-cookie";
import {getSelf} from "./functions/user/User";
import Header from "./components/header/Header";

export const UserContext = React.createContext(null);

const App = () => {
    const [ user, setUser ] = useState(null);
    const [ cookie ] = useCookies('access_token');

    useEffect(() => {
        if (cookie.access_token) {
            const response = getSelf(cookie.access_token);

            if(response.status === 200) {
                setUser(response.data);
            } else {
                console.log(response);
            }
        }
    }, []);

    return (
        <UserContext.Provider value={{ user: user, setUser: setUser }}>
            <Header />
            <Outlet />
        </UserContext.Provider>
    )
}
export default App
