import {useCookies} from "react-cookie";
import {Navigate, Outlet} from "react-router-dom";

export const ProtectedRoute = () => {
    const [cookie] = useCookies(['access_token']);

    console.log("ProtectedRoute: " + cookie.access_token);
    return cookie.access_token ? <Outlet /> : <Navigate to={"/auth/login/"} replace={true}/>;
}