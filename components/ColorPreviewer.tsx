import { motion } from "framer-motion"
import { SetStateAction, useCallback, useEffect, useRef, useState } from "react"
import { Slider } from "./ControlSlider"

interface Props {
    index: number,
    hsl: [h: number[], s: number[], l: number[]],
    steps: number,
    copyToClipboard: (arg: any) => void,
}
export default function ColorPreviewer({ steps = 7 }) {
    const [hue, setHue] = useState([Math.floor(Math.random() * 360)])
    const [saturation, setSaturation] = useState([0, 100])
    const [lightness, setLightness] = useState([0, 100])
    const [clipboard, setClipboard] = useState<null | string>(null)

    return (
        <div className="border bg-gray-800 border-gray-700 rounded-lg overflow-hidden relative">
            {
                clipboard ?
                    <Notifier text={clipboard} clear={() => setClipboard(null)} />
                    : null
            }
            <div className="space-y-8 p-6 px-8 w-full mb-4">
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
            <div className="flex">
                {
                    Array.from({ length: steps }, (_, i) =>
                        <Color
                            key={i}
                            index={i}
                            hsl={[hue, saturation, lightness]}
                            steps={steps}
                            copyToClipboard={setClipboard}
                        />
                    )
                }
            </div>
        </div>
    )
}

function Color({ index, hsl, steps, copyToClipboard }: Partial<Props>) {
    const [hue, s, l] = hsl
    const lStep = ((l[1] - l[0]) / steps)
    const sStep = ((s[1] - s[0]) / steps)
    const lightness = Math.floor(l[1] - index * lStep)
    const saturation = Math.floor(s[1] - index * sStep)

    const colorValue = `hsl(${hue[0]}, ${saturation}%, ${lightness}%)`

    const copy = () => {
        navigator?.clipboard?.writeText?.(colorValue)
        copyToClipboard(colorValue)
    }

    return (
        <div
            style={{ backgroundColor: colorValue }}
            className="flex-1 text-white h-14 p-2 cursor-pointer"
            onClick={copy}
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

function Notifier({ text, clear }: { text: string, clear(): void }) {
    const savedCallback = useRef(clear)

    useEffect(() => {
        if (text) {
            const timer = setTimeout(() => {
                savedCallback.current()
            }, 5000);

            return () => clearTimeout(timer)
        }
    }, [text])

    useEffect(() => {
        savedCallback.current = clear
    }, [clear])

    return (
        <motion.span
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ border: `1px solid ${text}` }}
            className="px-4 py-1.5 bg-gray-700 text-white absolute top-2 right-2 rounded">Copied</motion.span>
    )

}
