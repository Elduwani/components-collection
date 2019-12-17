import React from 'react'
import Sidebar from "./filesystem/Filesystem"
import Select from "./select/Select"
import Progress from "./progress/Progress"
import Buttons from "./buttons/Buttons"
import Loader from "./loader/Loader"
import Ratings from "./ratings/Ratings"
import Carousel from "./carousel/Carousel"
import Plans from "./plans/Plans"
import BrightnessController from "./brightnessController/BrightnessController"
// import { FiBox } from "react-icons/fi"

import "./pages.css"

document.title = "Components with Hooks | Elduwani"

const Pages = () => {
    return (
        <div className="pages" style={{ color: 'white' }}>
            <section>
                <div className="content">
                    <h2>Folder Tree</h2>
                    <p>
                        A recursive component. Uses data whose entries are defined in a hierarchical manner. Useful for file structure exploration and so on.
                    </p>
                </div>
                <Sidebar />
            </section>

            <section>
                <div className="content">
                    <h2>Controller</h2>
                    <p>Slide to adjust</p>
                </div>
                <BrightnessController />
            </section>

            <section>
                <div className="content">
                    <h2>Autocomplete Select</h2>
                    <p>A dropdown menu with Autocomplete for displaying choices -
                        an elegant alternative to the native <code>select</code> element.
                    </p>
                </div>
                <Select />
            </section>

            <section>
                <div className="content">
                    <h2>Progress Bar</h2>
                    <p>
                        A component for visualising space allocation between parent and childnodes.
                    </p>
                </div>
                <Progress />
            </section>

            <section>
                <div className="content">
                    <h2>Buttons</h2>
                    <p>
                        A set of buttons for iOS, Android and Windows with state transition animations.
                    </p>
                </div>
                <Buttons />
            </section>

            <section>
                <div className="content">
                    <h2>Spinners</h2>
                    <p>
                        Spinner components for async events and loading states. Tap to pause/play.
                    </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Loader size={40} stroke={5} color='#6c5b7b' duration={0.5} />
                    <Loader size={70} stroke={10} color='#c06c84' paused={true} />
                    <Loader size={100} stroke={15} color='#f67280' paused={true} />
                </div>
            </section>

            <section>
                <div className="content">
                    <h2>Carousel</h2>
                    <p>Carousel component for galleries and multi-step information.</p>
                </div>
                <Carousel count={null} />
            </section>

            <section>
                <div className="content">
                    <h2>Ratings</h2>
                    <p>
                        Ratings components for async events. Tap to pause/play.
                    </p>
                </div>
                <Ratings number={5} />
            </section>
            <section>
                <div className="content">
                    <h2>Pricing Plans</h2>
                    <p>
                        Pricing options component for customizing payment plans.
                    </p>
                </div>
                <Plans />
            </section>
        </div>
    )
}

export default Pages;
