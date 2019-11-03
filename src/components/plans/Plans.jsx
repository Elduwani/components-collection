import React from 'react'
import PlanList from "./PlanList"
import { data } from "./plansData"
import { FiXCircle } from "react-icons/fi"
import './plans.css'

const Plans = () => {
    return (
        <div className="plans-wrapper rounded">

            <div className="top-info">
                <span>Upgrade Flavor</span>
                <FiXCircle className="icon" />
            </div>

            <ul className="plans rounded">
                <li className="plan inactive">
                    <div className="size">1GB</div>
                    <div className="details">1 CPU - 4GB RAM</div>
                    <div className="price">
                        <span>30,000 $</span>
                        <span>per month</span>
                    </div>
                </li>
                {
                    data.map((item, i) =>
                        <PlanList key={i} item={item} />
                    )
                }
            </ul>
            <div className="buttons-wrapper">
                <span>Cancel</span>
                <div className="button-x rounded">Confirm</div>
            </div>
        </div>
    )
}

export default Plans;
