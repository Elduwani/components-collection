import Filesystem from "./filesystem/Filesystem"
import Select from "./autocomplete/AutoComplete"
import Storage from "./storage/Storage"
import Buttons from "./buttons/Buttons"
import Spinner from "./Spinner"
import Ratings from "./Ratings"
import Carousel from "./carousel/Carousel"
import Plans from "./plans/Plans"
import BrightnessController from "./BrightnessController"
import Payment from "./Payment"
import Layout from "./layout/Layout"
import DemoChart from "./charts/DemoChart"
import KnightWalker from "./walker"

document.title = "Components with Hooks | Elduwani"

function Pages() {
    return (
        <main className="pages space-y-10 px-6 py-20 text-white border-blue-600">
            <div className="space-y-6 max-w-lg mx-auto mb-20 ">
                <h1 className="text-center font-extrabold font-sans text-5xl md:text-7xl text-gray-200 break-words">
                    [Void]
                </h1>
                <p className="text-center text-gray-400">
                    <i className="text-blue-400 inline-block mr-2">Hola! </i>
                    Welcome to my demo space.
                </p>
            </div>
            <Container>
                <Content title="Folder Tree" description="A recursive component that uses data whose entries are defined in a hierarchical structure.">
                    <Filesystem />
                </Content>
                <Content title="Storage Details" description="A component for visualising space allocation between parent and childnodes.">
                    <Storage />
                </Content>
            </Container>

            <Container>
                <Content title="Controller" description="Slide to adjust">
                    <BrightnessController />
                </Content>
                <Content title="Autocomplete Search" description="A searchable dropdown">
                    <Select />
                </Content>
            </Container>

            <Container>
                <Content title="Ratings" description="Tap to rate your experience.">
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
                <Content title="Canvas Animation" description="A set of canvas animations using p5.js.">
                    <Buttons />
                </Content>
            </Container>

            <Container>
                <Content title="Carousel" description="Carousel component for galleries and multi-step information.">
                    <Carousel />
                </Content>
                <Content title="Spinners" description="Spinner components for async events and loading states. Tap to pause/play.">
                    <div className="flex items-center space-x-4">
                        <Spinner size="text-8xl" color='text-blue-500' />
                        <Spinner size="text-6xl" color='text-red-500' />
                        <Spinner color='text-indigo-500' variant={2} />
                    </div>
                </Content>
            </Container>

            <Container oneCol>
                <Content title="CSS Chart" description="Grid and flex based chart using no canvas or SVG elements">
                    <DemoChart />
                </Content>
            </Container>

            <Container>
                <Content title="Knight walker" description="Visualising possible chess knight moves using a 2D array and some game logic. Tap a cell to start">
                    <KnightWalker />
                </Content>
            </Container>

        </main>
    )
}

export default Pages;


function Container({ children, oneCol }) {
    return <div className={`space-y-8 md:space-y-0 md:grid ${oneCol ? "md:grid-cols-1" : "md:grid-cols-2"} md:gap-8`}>
        {children}
    </div>
}

function Content({ title, description, children }) {
    return <div className="space-y-5">
        <div className="text-gray-400 space-y-1">
            <h3 className="text-white text-2xl capitalize">{title}</h3>
            <p>{description}</p>
        </div>
        {children}
    </div>
}