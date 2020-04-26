import React from 'react'
import Filesystem from "./filesystem/Filesystem"
import Select from "./select/Select"
import Progress from "./progress/Progress"
import Buttons from "./buttons/Buttons"
import Loader from "./loader/Loader"
import Ratings from "./ratings/Ratings"
import Carousel from "./carousel/Carousel"
import Plans from "./plans/Plans"
import BrightnessController from "./brightnessController/BrightnessController"
import AutoInput from "./autoInput/AutoInput"
// import { FiBox } from "react-icons/fi"

import "./pages.scss"

document.title = "Components with Hooks | Elduwani"
document.body.classList.add("dark-theme")

const Pages = () => {
    return (
        <div className="pages" style={{ color: 'white' }}>
            <section>
                <div className="content">
                    <h2>Folder Tree</h2>
                    <p>
                        A recursive component. Uses data whose entries are defined in a hierarchical manner. Useful for file structure exploration and so on.
                    </p>
                    <Filesystem />
                </div>
                <div className="content">
                    <h2>Storage Details</h2>
                    <p>
                        A component for visualising space allocation between parent and childnodes.
                    </p>
                    <Progress />
                </div>
            </section>

            <section>
                <div className="content">
                    <h2>Controller</h2>
                    <p>Slide to adjust</p>
                    <BrightnessController />
                </div>
                <div className="content">
                    <h2>Autocomplete Select</h2>
                    <p>A dropdown menu with Autocomplete for displaying choices -
                        an elegant alternative to the native <code>select</code> element.
                    </p>
                    <Select />
                </div>
            </section>

            <section>
                <div className="content">
                    <h2>Ratings</h2>
                    <p>
                        Ratings components for customer and product reviews. Tap to rate your experience.
                    </p>
                    <Ratings size={40} selected={3} />
                    <Ratings size={30} selected={2} />
                    <Ratings size={25} />
                </div>
                <div className="content">
                    <h2>Spinners</h2>
                    <p>
                        Spinner components for async events and loading states. Tap to pause/play.
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Loader size={40} stroke={5} color='#6c5b7b' duration={0.5} />
                        <Loader size={70} stroke={10} color='#c06c84' paused={true} />
                        <Loader size={100} stroke={15} color='#f67280' paused={true} />
                    </div>
                </div>
            </section>

            <section>
                <div className="content">
                    <h2>Pricing Plans</h2>
                    <p>
                        Pricing options component for customizing payment plans.
                    </p>
                    <Plans />
                </div>
                <div className="content">
                    <h2>Buttons</h2>
                    <p>
                        A set of buttons for iOS, Android and Windows with state transition animations.
                    </p>
                    <Buttons />
                </div>
            </section>

            <section>
                <div className="content">
                    <h2>Carousel</h2>
                    <p>Carousel component for galleries and multi-step information.</p>
                    <Carousel count={null} />
                </div>
                <div className="content">
                    <h2>Autofocus Inputs</h2>
                    <AutoInput />
                </div>
            </section>
        </div>
    )
}

export default Pages;
