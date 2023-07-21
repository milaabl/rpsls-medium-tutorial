import React from "react";
import { Outlet } from "react-router-dom";
import Header from './components/Header';

function Layout () {
    return <>
        <Header />
        <main>
            <Outlet />
        </main>
    </>
};


export default Layout;