import React, { useState } from 'react';
import RadioButton from "../buttons/RadioButton"

const PlanList = ({ item }) => {
    const [selected, setSelected] = useState(false)
    const details = item.details.split(',')

    return (
        <li
            onClick={(() => setSelected(!selected))}
            className={`plan animated ${selected ? "selected" : ""}`}
        >
            <RadioButton selected={selected} />
            <div className="size">{`${item.name}GB`}</div>
            <div className="details">
                {`
                    ${details[0]} ${details[0] !== "1" ? "CPU's" : "CPU"} - 
                    ${details[1]}GB RAM`
                }
            </div>
            <div className="price">
                <span>{`${item.price},000 $`}</span>
                <span>per month</span>
            </div>
        </li>
    );
}

export default PlanList;
