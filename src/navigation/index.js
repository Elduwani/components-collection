import React from 'react';
import Sidebar from "./sidebar/Sidebar"
import Select from "../select/Select"

const Navigation = () => {
    return (
        <div className="nav-wrapper">
            <Sidebar />
            <Select />
        </div>
    );
}

export default Navigation;
