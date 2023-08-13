import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import Error from "./components/error/Error";
import Login from "./components/auth/login/Login";
import Auth from "./components/auth/Auth";
import Default from "./components/auth/Default";
import Signup from "./components/auth/signup/Signup";
import {CookiesProvider} from "react-cookie";
import {ProtectedRoute} from "./components/auth/ProtectedRout";
import {Profile} from "./components/profile/Profile";
import {UpdateProfile} from "./components/profile/UpdateProfile";
import TeacherPortal from "./components/teacher/portal/TeacherPortal";
import AddSubject from "./components/teacher/portal/AddSubject";
import Subject from "./components/teacher/subject/Subject";
import Home from "./components/home/Home";
import MySubject from "./components/user/subjects/MySubject";
import AdminPanel from "./components/admin/AdminPanel";
import UpdateSubject from "./components/teacher/subject/UpdateSubject";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute/>,
        errorElement: <Error/>,
        children: [
            {
                path: "/",
                element: <App/>,
                errorElement: <Error/>,
                children: [
                    {
                        path: "/",
                        element: <Home />,
                        errorElement: <Error/>
                    },
                    {
                        path: "/mysubject/:id",
                        element: <MySubject />,
                        errorElement: <Error/>
                    },
                    {
                        path: "/profile",
                        element: <Profile/>,
                        errorElement: <Error/>
                    },
                    {
                        path: "/profile/update",
                        element: <UpdateProfile/>,
                        errorElement: <Error/>,
                    },
                    {
                        path: "/teacher",
                        element: <TeacherPortal />,
                        errorElement: <Error/>
                    },
                    {
                        path: "/teacher/subject/add",
                        element: <AddSubject />,
                        errorElement: <Error/>
                    },
                    {
                        path: "/teacher/subject/:id",
                        element: <Subject />,
                        errorElement: <Error/>
                    },
                    {
                        path: "/teacher/subject/:id/update",
                        element: <UpdateSubject />,
                        errorElement: <Error />
                    },
                    {
                        path: "/admin",
                        element: <AdminPanel />,
                        errorElement: <Error/>
                    }
                ]
            }
        ]
    },
    {
        path: "/auth",
        element: <Auth/>,
        errorElement: <Error/>,

        children: [
            {
                path: "/auth/",
                element: <Default/>,
                errorElement: <Error/>
            },
            {
                path: "/auth/login",
                element: <Login/>,
                errorElement: <Error/>
            },
            {
                path: "/auth/register",
                element: <Signup/>,
                errorElement: <Error/>
            }
        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <CookiesProvider>
                <RouterProvider router={router}/>
        </CookiesProvider>
    </React.StrictMode>
);
