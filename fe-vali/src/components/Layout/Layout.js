import React from 'react';
import AppFooter from "../AppFooter/AppFooter";
import AppHeader from "../AppHeader/AppHeader";

const Layout = ({ children }) => {
    return (
        <div style={{position:"relative"}}>
            <AppHeader/>
            <div>{children}</div>
            <AppFooter style={{position:"relative"}}/>
        </div>
    );
};

export default Layout;
