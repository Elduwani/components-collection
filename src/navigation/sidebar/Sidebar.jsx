import React from 'react';
import items from './items'
import './Sidebar.css'

const Sidebar = () => {
    return (
        <div className="sidebar-parent">
            {
                items.map((item, index) => {
                    return (
                        <ul key={index}>
                            <li className="name">{item.name}</li>
                            {
                                item.children ?
                                    <ul className="item-parent">
                                        {
                                            item.children.map((child, i) => {
                                                return (
                                                    <>
                                                        <li key={i}>{child.name}</li>
                                                        {
                                                            child.children ?
                                                                <ul className="item-parent">
                                                                    {
                                                                        child.children.map((child2, id) =>
                                                                            <li key={id} className="item-child name">
                                                                                {child2.name}
                                                                            </li>
                                                                        )
                                                                    }
                                                                </ul>
                                                                : null

                                                        }
                                                    </>
                                                )
                                            })
                                        }
                                    </ul>
                                    : null
                            }
                        </ul>
                    )
                })
            }
        </div>
    );
}

export default Sidebar;
