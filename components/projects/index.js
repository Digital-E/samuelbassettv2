import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import styled from "styled-components"


import VideoContainer from "./video-container"


const Container = styled(motion.div)`
    position: fixed;
    height: 100vh;
    width: calc(100vw - 40%);
    z-index: 1;
    // pointer-events: none;
    left: 40%;
    overflow: scroll;

    @media(max-width: 992px) {
        display: none;
    }
`

const InnerContainer = styled.div`
    > a:nth-child(1) {
        margin-top: 50px;
    }
`




let shiftValue = {
    x: 0,
    y: 0
}

let delayValue = 0;

let containerVariants = {
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3
        }
    },
    hide: {
        opacity: 0,
    }
}


const Index = ({reveal, projects}) => {
     let containerRef = useRef();
     


    return (
    <Container 
        ref={containerRef} 
        className="projects-container"
        initial="hide"
        animate={reveal ? "show" : "hide"}
        variants={containerVariants}
    >
        <InnerContainer>
        {projects.map((item, index) => {
            if(index !== 0) {
                shiftValue = {
                    x: shiftValue.x += 15,
                    y: shiftValue.y += 40,
                }
                delayValue += 0.2
            }
            return <VideoContainer src={item} initShiftValue={shiftValue} initDelayValue={delayValue} reveal={reveal}/>    
        })}
        </InnerContainer>
    </Container>)
}

export default Index;