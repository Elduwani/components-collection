import React, { useState, useEffect, useRef } from 'react';
import items from './items'
import './Sidebar.css'

const Sidebar = () => {
    return (
        <div className="sidebar-parent">
            {
                <OptionsList nodes={items} />
            }
        </div>
    );
}

const OptionsList = ({ nodes }) => {
    // const [open, setOpen] = useState("collapsed")

    if (nodes) return (
        nodes.map((node, index) => {
            const { name, children } = node
            return (
                <ul
                    key={name + index}
                    className={`parent`}
                    onClick={(e) => {
                        console.log(e.target);
                        if (children) {
                            e.target.parentElement.classList.toggle("expanded")
                        }
                    }}
                >
                    <li className="child name">{name}</li>
                    {
                        children && children.length > 0 ? <OptionsList nodes={children} /> : null
                    }
                </ul>
            )
        })
    )
}

export default Sidebar;
