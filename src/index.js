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

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />
    },
    {
        path: "/auth",
        element: <Auth />,
        errorElement: <Error />,

        children: [
            {
                path: "/auth/",
                element: <Default />,
                errorElement: <Error />
            },
            {
                path: "/auth/login",
                element: <Login />,
                errorElement: <Error />
            },
            {
                path: "/auth/register",
                element: <Signup />,
                errorElement: <Error />
            }
        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
