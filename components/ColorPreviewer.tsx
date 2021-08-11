import { useState } from "react"
import { Slider } from "./ControlSlider"

interface Props {
    value: number,
    hsl: { h: number[], s: number[], l: number[] }
    steps: number
}
export default function ColorPreviewer({ steps = 10 }) {
    const [state, setState] = useState<Props["hsl"]>({ h: [250], s: [0, 100], l: [0, 50] })
    return (
        <div className="border bg-gray-800 border-gray-700 p-4 rounded-lg grid grid-cols-2 gap-4">
            <div className="colors border">
                <span>Colors</span>
                <div className="preview w-[80px]">
                    {
                        Array.from({ length: steps }, (_, i) =>
                            <Color
                                key={i}
                                value={i}
                                hsl={state}
                                steps={steps}
                            />
                        )
                    }
                </div>
            </div>
            <div className="sliders border">
                <Slider
                    max={360}
                    values={state.h}
                    onChange={values => {
                        // setHue(values)
                    }}
                />
            </div>
        </div>
    )
}

function Color({ value, hsl, steps }: Props) {
    const { h, s, l } = hsl
    return (
        <div
            style={{ backgroundColor: `hsl(${h}, ${s}%, ${l}%)` }}
            className="text-white border"
        >
            {value}
        </div>
    )
}
