import Head from 'next/head'
import Filesystem from "@components/filesystem/Filesystem"
import Autocomplete from "@components/autocomplete"
import Storage from "@components/storage/Storage"
import Buttons from "@components/buttons/Buttons"
import Spinner from "@components/Spinner"
import Ratings from "@components/Ratings"
import Carousel from "@components/Carousel"
import Plans from "@components/plans/Plans"
import BrightnessController from "@components/BrightnessController"
import Payment from "@components/Payment"
import Layout from "@components/layout/Layout"
import DemoChart from "@components/charts/DemoChart"
import KnightWalker from "@components/KnightWalker"
import React from 'react'
import Footer from '@components/Footer'
import ColorPreviewer from '@components/ColorPreviewer'

export default function Home() {
  return (
    <div className="min-h-screen p-6">
      <Head>
        <title>Elduwani | Components Library</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="pages h-full mx-auto max-w-4xl space-y-10 px-6 py-20 text-white">
        <div className="space-y-6 mx-auto mb-20 ">
          <h1 className="text-center font-sans font-bold text-5xl md:text-6xl text-gray-200 md:whitespace-nowrap">
            {`<Designer who codes />`}
          </h1>
          <p className="text-center text-gray-400">
            <i className="text-blue-400 inline-block mr-2">Hola! </i>
            I'm Freedom. Welcome to my demo space where I make random stuff with React.
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
            <Autocomplete />
          </Content>
        </Container>

        <Container>
          <Content title="Color Previewer" description="An interactive HSL color generator. Click to copy to clipboard.">
            <ColorPreviewer />
          </Content>
          <Content title="Carousel" description="Carousel component for galleries and multi-step information.">
            <Carousel />
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
          <Content title="Knight walker" description="Visualising possible chess knight moves with a 2D array and some game logic.">
            <KnightWalker />
          </Content>
        </Container>

        <Container oneCol>
          <Content title="CSS Chart" description="Grid and flex based chart using no canvas or SVG elements">
            <DemoChart />
          </Content>
        </Container>
      </main>

      <Footer />
    </div>
  )
}

function Container({ children, oneCol }: { children: React.ReactNode, oneCol?: boolean }) {
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
