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

function Container({ children, oneCol }) {
    return <div className={`space-y-8 md:space-y-0 md:grid ${oneCol ? "md:grid-cols-1" : "md:grid-cols-2"} md:gap-6`}>
        {children}
    </div>
}

function Content({ title, description, children }) {
    return <div className="space-y-5">
        <div className="text-gray-400 space-y-1">
            <p className="text-gray-200">{title}</p>
            <p>{description}</p>
        </div>
        {children}
    </div>
}

function Pages() {
    return (
        <div className="pages space-y-8 px-6 py-20" style={{ color: 'white' }}>
            <div className="space-y-6 max-w-lg mx-auto mb-20 ">
                <h1 className="text-center font-extrabold font-sans text-5xl md:text-7xl text-green-300 break-words">
                    Moderator for complex creativeness
                    {/* Creator of things, undefined... */}
                </h1>
                <p className="text-center text-gray-400">
                    <i className="text-red-400 inline-block mr-2">Hola! </i>
                    Welcome to my [ placeholder ] space.
                    I make nice things with React, Node and databases.
                    As a designer I also sorta like writing CSS <span role="img" aria-label="Cool Emoji">😎</span>
                </p>
            </div>
            <Container>
                <Content title="Folder Tree"
                    description="A recursive component that uses data whose entries are defined in a hierarchical structure."
                ><Filesystem />
                </Content>
                <Content title="Storage Details"
                    description="A component for visualising space allocation between parent and childnodes."
                ><Storage />
                </Content>
            </Container>

            <Container>
                <Content title="Controller" description="Slide to adjust">
                    <BrightnessController />
                </Content>
                <Content title="Autocomplete Search"
                    description="A searchable dropdown - an elegant alternative to the native Select elements."
                ><Select />
                </Content>
            </Container>

            <Container>
                <Content title="Ratings" description="Ratings components for customer and product reviews. Tap to rate your experience.">
                    <Ratings size={40} selected={2} />
                </Content>
                <Content title="Credit / Debit Card" description="Payment processing with loading states and card type detection.">
                    <Payment />
                </Content>
            </Container>

            <Container oneCol>
                <Content title="Layouts" description="Different CSS Grid layouts">
                    <Layout />
                </Content>
            </Container>

            <Container>
                <Content title="Pricing Plans" description="Pricing options component for customizing payment plans.">
                    <Plans />
                </Content>
                <Content title="Buttons" description="A set of buttons for iOS, Android and Windows with state transition animations.">
                    <Buttons />
                </Content>
            </Container>

            <Container>
                <Content title="Carousel" description="Carousel component for galleries and multi-step information.">
                    <Carousel count={null} />
                </Content>
                <Content title="Spinners" description="Spinner components for async events and loading states. Tap to pause/play.">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Loader size={40} stroke={5} color='#6c5b7b' duration={0.5} />
                        <Loader size={70} stroke={10} color='#c06c84' paused={true} />
                        <Loader size={100} stroke={15} color='#f67280' paused={true} />
                    </div>
                </Content>
            </Container>

            <Container oneCol>
                <Content title="Demo Chart" description="Different CSS Grid layouts">
                    <DemoChart />
                </Content>
            </Container>

        </div>
    )
}

export default Pages;
