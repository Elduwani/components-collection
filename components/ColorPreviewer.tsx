import { Children, useState } from "react"
import ControlSlider, { Slider } from "./ControlSlider"

interface Props {
    index: number,
    hsl: [h: number[], s: number[], l: number[]]
    steps: number
}
export default function ColorPreviewer({ steps = 7 }) {
    const [hue, setHue] = useState([250])
    const [saturation, setSaturation] = useState([0, 100])
    const [lightness, setLightness] = useState([0, 100])

    return (
        <div className="border bg-gray-800 border-gray-700 p-4 rounded-lg flex">
            <div className="preview w-[80px] rounded-lg overflow-hidden">
                {
                    Array.from({ length: steps }, (_, i) =>
                        <Color
                            key={i}
                            index={i}
                            hsl={[hue, saturation, lightness]}
                            steps={steps}
                        />
                    )
                }
            </div>
            <div className="_sliders border-gray-600 pr-2 space-y-8 px-6 w-full">
                <SliderGroup name="Hue" value={hue[0]}>
                    <Slider
                        max={360}
                        values={hue}
                        onChange={value => setHue(value)}
                    />
                </SliderGroup>
                <SliderGroup name="Saturation" value={saturation[1]}>
                    <Slider
                        max={100}
                        values={saturation}
                        onChange={value => setSaturation(value)}
                    />
                </SliderGroup>
                <SliderGroup name="Lightness" value={lightness[1]}>
                    <Slider
                        max={100}
                        values={lightness}
                        onChange={value => setLightness(value)}
                    />
                </SliderGroup>
            </div>
        </div>
    )
}

function Color({ index, hsl, steps }: Props) {
    const [hue, s, l] = hsl
    const lStep = ((l[1] - l[0]) / steps)
    const sStep = ((s[1] - s[0]) / steps)
    const lightness = Math.floor(l[1] - index * lStep)
    const saturation = Math.floor(s[1] - index * sStep)

    return (
        <div
            style={{ backgroundColor: `hsl(${hue[0]}, ${saturation}%, ${lightness}%)` }}
            className="text-white h-10 p-2"
        ></div>
    )
}

function SliderGroup({ name, value, children }) {
    return (
        <div className="space-y-4">
            <p className="flex justify-between text-gray-300">
                <span className="text-sm">{name}</span>
                <span className="text-sm">{value}</span>
            </p>
            <div className="">{children}</div>
        </div>
    )
}
