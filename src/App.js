import React, {useEffect, useState} from 'react'
import {Outlet} from "react-router-dom";
import {useCookies} from "react-cookie";
import {getSelf} from "./functions/user/User";
import Header from "./components/header/Header";
import {Box, CircularProgress} from "@mui/material";

export const UserContext = React.createContext(null);

const App = () => {
    const [ user, setUser ] = useState(null);
    const [ cookie ] = useCookies('access_token');

    useEffect( () => {
        if (cookie.access_token) {
            getSelf(cookie.access_token).then((r) => {
                if (r.status === 200) {
                    setUser(r.data);
                }
            }).catch((e) => console.log(e));
        }
    }, []);

    return (
        <UserContext.Provider value={{ user: user, setUser: setUser }}>
            {user !== null ?
                <>
                    <Header />
                    <Outlet />
                </>
                :
                <Box justifyContent="center" justifyItems="center" sx={{p: 2}}>
                    <CircularProgress />
                </Box>
            }
        </UserContext.Provider>
    )
}
export default App
