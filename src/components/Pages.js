import React from 'react'
import Filesystem from "./filesystem/Filesystem"
import Select from "./select/Select"
import Storage from "./storage/Storage"
import Buttons from "./buttons/Buttons"
import Loader from "./loader/Loader"
import Ratings from "./ratings/Ratings"
import Carousel from "./carousel/Carousel"
import Plans from "./plans/Plans"
import BrightnessController from "./brightnessController/BrightnessController"
import Payment from "./payment/Payment"
import Layout from "./layout/Layout"
import DemoChart from "./charts/DemoChart"
// import { FiBox } from "react-icons/fi"
import "./pages.scss"


document.title = "Components with Hooks | Elduwani"
document.body.classList.add("dark-theme")

const Pages = () => {
    return (
        <div className="pages" style={{ color: 'white' }}>
            <div className="header">
                {/* <div className="main-title"><h1>Carefree Futurist of Things</h1></div> */}
                <div className="main-title"><h1>Moderator for Complex Creativeness</h1></div>
                <div className="main-description">
                    <i>Hola!, </i>[placeholder] welcome to my javascript playground.
                    I try to build nice things with React, and as a designer I also pride myself in writing CSS <span role="img" aria-label="Cool Emoji">😎</span>.
                    [placeholder]
                </div>
            </div>
            <section className="page-section">
                <div className="content">
                    <h4>Folder Tree</h4>
                    <p>
                        A recursive component that uses data whose entries are defined in a hierarchical structure.
                      </p>
                    <Filesystem />
                </div>
                <div className="content">
                    <h4>Storage Details</h4>
                    <p>
                        A component for visualising space allocation between parent and childnodes.
                        </p>
                    <Storage />
                </div>
            </section>

            <section className="page-section">
                <div className="content">
                    <h4>Controller</h4>
                    <p>Slide to adjust</p>
                    <BrightnessController />
                </div>
                <div className="content">
                    <h4>Autocomplete Search</h4>
                    <p>A search with datalist dropdown and autocomplete functionality -
                        an elegant alternative to the native <code>{`<Select/>`}</code> elements.
                        </p>
                    <Select />
                </div>
            </section>

            <section className="page-section">
                <div className="content">
                    <h4>Ratings</h4>
                    <p>
                        Ratings components for customer and product reviews. Tap to rate your experience.
                        </p>
                    <Ratings size={40} selected={2} />
                </div>
                <div className="content">
                    <h4>Credit / Debit Card</h4>
                    <p></p>
                    <Payment />
                </div>
            </section>

            <section className="page-section">
                <div className="content grid-col-span-2">
                    <h4>Layouts</h4>
                    <p>Different CSS Grid layouts</p>
                    <Layout />
                </div>
            </section>

            <section className="page-section">
                <div className="content">
                    <h4>Pricing Plans</h4>
                    <p>
                        Pricing options component for customizing payment plans.
                        </p>
                    <Plans />
                </div>
                <div className="content">
                    <h4>Buttons</h4>
                    <p>
                        A set of buttons for iOS, Android and Windows with state transition animations.
                        </p>
                    <Buttons />
                </div>
            </section>
            <section className="page-section">
                <div className="content">
                    <h4>Carousel</h4>
                    <p>Carousel component for galleries and multi-step information.</p>
                    <Carousel count={null} />
                </div>
                <div className="content">
                    <h4>Spinners</h4>
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
            <section className="page-section">
                <div className="content grid-col-span-2">
                    <h4>Demo Chart</h4>
                    <p>Different CSS Grid layouts</p>
                    <DemoChart />
                </div>
            </section>
        </div>
    )
}

export default Pages;
