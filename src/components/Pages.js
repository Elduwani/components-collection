import React from 'react'
import Sidebar from "../navigation/sidebar/Sidebar"
import Select from "../select/Select"
import { FiBox } from "react-icons/fi"

import "./pages.css"

const Pages = () => {
    return (
        <div className="pages">
            <section className="">
                <div className="content">
                    <h2><FiBox className="icon"/> Recursive Tree Component</h2>
                    <p>
                        Dynamic depth traversal with a React recursive component, 
                        calling itself depending on props
                    </p>
                </div>
                <Sidebar />
            </section>
            <section className="">
            <   div className="content">
                    <h2>Array Select Component</h2>
                    <p>
                        Search and Select component
                    </p>
                </div>
                <Select />
            </section>
        </div>
    )
}

export default Pages;
