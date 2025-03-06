import React from "react";
import Header from "./header.tsx";

const Layout: React.FC<{children:React.ReactNode}> = ({ children }) => {
    return (
        <div className="app-container">
            <Header />
            <main>{children}</main>
        </div>
    );
};

export default Layout;