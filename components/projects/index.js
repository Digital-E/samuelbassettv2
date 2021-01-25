import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import styled from "styled-components"


import VideoContainer from "./video-container"


const Container = styled(motion.div)`
    position: fixed;
    height: 100vh;
    width: 100vw;
    z-index: 1;
    pointer-events: none;
`


let videos = [
    {url: "./videos/videoOne.mp4", name: "Nike Bra Radar", description: "A tool for influencers", link: null, developer: true, designer: false, collaboration: "made with The Digital Fairy"},
    {url: "./videos/videoTwo.mp4", name: "CLM", description: "An international super-agency", link: "https://google.com", developer: true, designer: false, collaboration: "made with Yes Studio"},
    {url: "./videos/videoThree.mp4", name: "John Gray", description: "A french film director", link: "https://google.com", developer: true, designer: true, collaboration: null},
    {url: "./videos/videoFour.mp4", name: "Caroline Dussuel", description: "specialised in creative services", link: "https://google.com", developer: true, designer: true, collaboration: null},
    {url: "./videos/videoFive.mp4", name: "Scotomalab", description: "a textile-first creative studio", link: "https://google.com", developer: true, designer: true, collaboration: null}
]


let shiftValue = {
    x: 0,
    y: 0
}

let delayValue = 0;


const Index = ({reveal}) => {
     let containerRef = useRef();
     


    return (
    <Container ref={containerRef}>
        {videos.map((item, index) => {
            if(index !== 0) {
                shiftValue = {
                    x: shiftValue.x += 15,
                    y: shiftValue.y += 40,
                }
                delayValue += 0.2
            }
            return <VideoContainer src={item} initShiftValue={shiftValue} initDelayValue={delayValue} reveal={reveal}/>    
        })}
    </Container>)
}

export default Index;