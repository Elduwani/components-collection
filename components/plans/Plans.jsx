import { useState } from 'react'
import Button from '../buttons/Button'
import data from "./plansData"


export default function Plans() {
    const [selected, setSelected] = useState(2)
    return (
        <div className="p-4 rounded-lg bg-gray-800 border border-gray-700 space-y-4">
            <span>Upgrade Configuration</span>
            <ul className="rounded-md overflow-hidden border border-gray-700 divide-y divide-gray-700">
                <SinglePlan plan={{ name: 1, price: "30" }} dummy />
                {
                    data.map((plan, i) =>
                        <SinglePlan
                            key={i}
                            index={i}
                            selected={selected}
                            setSelected={setSelected}
                            plan={plan}
                        />
                    )
                }
            </ul>
            <div className="grid grid-cols-2 gap-2">
                <Button bg="bg-transparent">
                    <span className="text-gray-400">Cancel</span>
                </Button>
                <Button className="">Confirm</Button>
            </div>
        </div>
    )
}

const SinglePlan = ({ selected, plan, index, setSelected, dummy }) => {
    const { name, price } = plan
    const isSelected = !dummy && selected === index

    return (
        <li
            onClick={(() => setSelected?.(index))}
            className={`
                grid grid-cols-6 gap-2 items-center text-sm px-4 py-2 
                ${dummy ? "bg-gray-900" : isSelected ? "bg-indigo-700" : "bg-transparent"}
                ${dummy ? "text-gray-400" : "cursor-pointer"}
            `}
        >
            {/* <RadioButton isSelected={isSelected} /> */}
            <p>{`${name}GB`}</p>
            <p className="col-span-4">
                {`
                    ${name * 2} CPUs - ${name * 4}GB RAM
                `}
            </p>
            <p className="text-sm opacity-60 flex flex-col">
                {`$${price}k`}
                <span className="text-xs">monthly</span>
            </p>
        </li>
    );
}