import React from 'react'
import Sidebar from "../navigation/sidebar/Sidebar"
import Select from "../select/Select"
import Progress from "../progress/Progress"
import { FiBox } from "react-icons/fi"

import "./pages.css"

const Pages = () => {
    return (
        <div className="pages">
            <section>
                <div className="content">
                    <h2><FiBox className="icon"/> Recursive Tree Component</h2>
                    <p>
                        Dynamic depth traversal with a React recursive component, 
                        calling itself depending on props
                    </p>
                </div>
                <Sidebar />
            </section>
            <section>
                <div className="content">
                    <h2>Array Select Component</h2>
                    <p>
                        Search and Select component
                    </p>
                </div>
                <Select />
            </section>
            <section>
                <div className="content">
                    <h2>Progress Bar</h2>
                    <p>
                        Click to fill it up
                    </p>
                </div>
                <Progress />
            </section>
        </div>
    )
}

export default Pages;
