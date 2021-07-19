import { useEffect, useRef, useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import Dropdown from "../Dropdown.jsx";
import colors from "./names.js";

export default function AutoComplete() {
    const inputRef = useRef(null)
    const [selected, setSelected] = useState([])
    const [options, setOptions] = useState(colors)
    const maxItems = selected.length >= 3

    const isSelected = id => [...selected.map(el => el.id)].includes(id)
    const focus = () => inputRef.current && inputRef.current.focus()

    const search = event => {
        const val = event.target.value
        const regex = new RegExp(val, 'gi')
        const data = colors.filter(color => color.label.match(regex) && !isSelected(color.id))
        if (data.length) setOptions(data)
        else setOptions([])
    }

    useEffect(() => {
        //Skip an already selected color when updating Options
        const filtered = colors.filter(elem => !isSelected(elem.id))
        setOptions(filtered)
        // eslint-disable-next-line 
    }, [selected]);

    return (
        <div className="relative h-12">
            <div className="flex items-center justify-between h-full w-full bg-gray-800 border border-gray-700 rounded-lg">
                {
                    //Display selected items
                    selected.length ?
                        <div className="p-1 h-full flex space-x-1">
                            {
                                selected.map(item =>
                                    <div className="bg-gray-700 flex items-center space-x-2 px-4 h-full rounded" key={item.id} style={{ borderColor: item.color }}>
                                        <Span color={item.color} />
                                        <span>{item.label}</span>
                                    </div>
                                )
                            }
                        </div>
                        : null
                }
                {
                    // MaxLength of items selectable 
                    !maxItems ?
                        <Dropdown
                            menuList={
                                options.map(o => ({
                                    ...o,
                                    icon: <Span color={o.color} />,
                                    onClick: () => {
                                        if (!maxItems) {
                                            setSelected(s => [...s, o])
                                            inputRef.current.value = ""
                                        }
                                    }
                                }))
                            }
                        >
                            <input
                                type="text"
                                ref={inputRef}
                                onChange={search}
                                className="flex-1 bg-transparent"
                                placeholder="Search Palettes"
                            />
                        </Dropdown>
                        : null
                }
                <div className="pr-4 text-2xl text-blue-600 cursor-pointer"
                    onClick={() => {
                        setSelected([])
                        setOptions(colors)
                        focus()
                    }}
                >
                    <IoIosSearch className="animate-pulse" />
                </div>
            </div>
        </div>
    );
}

const Span = ({ color }) => <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></span>
