import React from 'react'
import { JoblyNavbar } from "./Navbar";
import { Outlet } from 'react-router-dom';

const Root = () => {
    return (
        <>
        <JoblyNavbar />
        <div>
           <Outlet/>
        </div>
        </>
    )  
};


export default Root
