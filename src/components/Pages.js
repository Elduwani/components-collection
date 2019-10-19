import React from 'react'
import Sidebar from "../navigation/filesystem/Filesystem"
import Select from "../select/Select"
import Progress from "../progress/Progress"
import Buttons from "../buttons/Buttons"
// import { FiBox } from "react-icons/fi"

import "./pages.css"

const Pages = () => {
    return (
        <div className="pages">
            <section>
                <div className="content">
                    <h2>Directory Component</h2>
                    <p>
                        Dynamic depth traversal with a recursive component. Uses data whose entries are defined in a hierarchical manner. Examples of such case may include a corporate hierarchy, a directory structure, and so on.
                    </p>
                </div>
                <Sidebar />
            </section>
            <section>
                <div className="content">
                    <h2>Autocomplete Select</h2>
                    <p>A dropdown menu with Autocomplete for displaying choices -
                        an elegant alternative to the native <code>select</code> element.
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
            <section>
                <div className="content">
                    <h2>Buttons</h2>
                    <p>
                        Click to fill it up
                    </p>
                </div>
                <Buttons />
            </section>
        </div>
    )
}

export default Pages;
