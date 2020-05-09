import React from 'react';
import RadioButton from "../buttons/RadioButton"

const PlanList = ({ selected, plan, index, setSelected }) => {
    const details = plan.details.split(',')
    const isSelected = selected === index

    return (
        <li
            onClick={(() => setSelected(index))}
            className={`plan animated ${isSelected ? "selected" : ""}`}
        >
            <RadioButton isSelected={isSelected} />
            <div className="size">{`${plan.name}GB`}</div>
            <div className="details">
                {`
                    ${details[0]} ${details[0] !== "1" ? "CPU's" : "CPU"} - 
                    ${details[1]}GB RAM`
                }
            </div>
            <div className="price">
                <span>{`${plan.price},000 $`}</span>
                <span>per month</span>
            </div>
        </li>
    );
}

export default PlanList;
