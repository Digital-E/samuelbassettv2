import { useEffect, useState, useRef } from "react"
import { animate, motion, useMotionValue, useTransform } from "framer-motion"
import styled from "styled-components"

import Video from "../video"


const VideoContainer = styled(motion.div)`
    position: absolute;
    width: 35%;
    overflow: hidden;
    pointer-events: all;
    cursor: grab;
    display: flex;

    > div:nth-child(1) > div:nth-child(1) {
        border-radius: 15px;
    }
`

const Left = styled.div`
    display: flex;
    flex-direction: column;
`

const Right = styled.div`
    display: flex;
    flex-direction: column;
`


const Information = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 5px 0 0 5px;
`


const Label = styled.div`
    display: flex;

    span {
        font-family: "Eurostile";
        text-transform: uppercase;
        color: white;
        font-size: 12px;
        white-space: nowrap;
    }

    span:nth-child(2) {
        opacity: 0.6;
    }
`


const Link = styled.div`
    height: auto;
    min-width: 8px;
    margin-left: 5px;
    margin-top: -8px;

    img {
        height: 100%;
    }
`

const Lock = styled.div`
    height: auto;
    min-width: 6px;
    margin-left: 5px;
    margin-top: -8px;

    img {
        height: 100%;
    }
`

const Role = styled.div`
    height: 100%;
    display: flex;
    align-items: flex-end;
    padding-bottom: 200%;
`

const RoleLabelDev = styled.div`
    display: flex;
    height: fit-content;
    text-orientation: mixed;
    writing-mode: vertical-lr;
    transform: rotateZ(180deg);
    padding: 0 5px 0 0;

    span {
        font-family: "Eurostile";
        text-transform: uppercase;
        color: white;
        font-size: 12px;
        display: inline-block;
    }

    span:nth-child(1) {
        opacity: 0.2;
    }

    span:nth-child(2) {
        margin-left: 3px;
    }

    span:nth-child(2) svg {
        height: 10px;
        margin: 5px 0;
    }
`

const RoleLabelDevAndDes = styled.div`
display: flex;
height: fit-content;
text-orientation: mixed;
writing-mode: vertical-lr;
transform: rotateZ(180deg);
padding: 0 5px 0 0;

span {
    font-family: "Eurostile";
    text-transform: uppercase;
    color: white;
    font-size: 12px;
    display: inline-block;
}

span:nth-child(2) {
    margin-left: 3px;
}

span:nth-child(2) svg {
    height: 10px;
    margin: 5px 0;
}
`



let videos = [
    {url: "./videos/videoOne.mov"},
    {url: "./videos/videoTwo.mov"},
    {url: "./videos/videoThree.mov"}
]

const mediaMotion = {
    rest: {
      scale: 1,
      transition: {
        duration: 2,
        type: "tween",
        ease: "easeIn"
      }
    },
    hover: {
      scale: 1.01,
      transition: {
        duration: 1,
        type: "tween",
        ease: "easeOut"
      }
    }
  };



const Index = ({src, initShiftValue, initDelayValue, reveal}) => {
    let [windowHeight, setWindowHeight] = useState(0);
    let [windowWidth, setWindowWidth] = useState(0);
    let [shiftValue, setShiftValue] = useState(0);
    let [delayValue, setDelayValue] = useState(0);

    let videoContainerRef = useRef();


    let x = useMotionValue(0);
    let y = useMotionValue(0);

    let windowInit = () => {
        setWindowHeight(window.innerHeight - videoContainerRef.current.getBoundingClientRect().height);
        setWindowWidth(window.innerWidth - videoContainerRef.current.getBoundingClientRect().width);

        let leftDistance = window.innerWidth * 0.4;
        let topDistance = window.innerHeight;


        x.set(leftDistance);
        y.set(topDistance);
    }

    let revealProjects = () => {
        setWindowHeight(window.innerHeight - videoContainerRef.current.getBoundingClientRect().height);
        setWindowWidth(window.innerWidth - videoContainerRef.current.getBoundingClientRect().width);

        let leftDistance = window.innerWidth * 0.4 + shiftValue.x;
        let topDistance = window.innerHeight * 0.1 + shiftValue.y;

        animate(x, leftDistance, {
            duration: 0,
        });
    
        animate(y, topDistance, {
            duration: 1,
            delay: delayValue
        });
    }
    

    let windowResize = () => {
        setWindowHeight(window.innerHeight - videoContainerRef.current.getBoundingClientRect().height);
        setWindowWidth(window.innerWidth - videoContainerRef.current.getBoundingClientRect().width);
    }


    useEffect(()=>{
        setShiftValue(initShiftValue);
        setDelayValue(initDelayValue);

        windowInit();


        window.addEventListener("resize", windowResize);

        () => {
            window.removeEventListener("resize", windowResize);
        }
    },[]);


    useEffect(()=>{
        if(reveal) {
            revealProjects();
        }
    }, [reveal])


    const getRole = (src) => {
        let designer = src.designer;
        switch(designer) {
            case false:
                return (<RoleLabelDev>
                    <span>DESIGN</span>
                    <span>
                    <svg viewBox="0 0 18.01 18.01"><circle cx="9.01" cy="9.01" r="8.72" style={{fill:"none", stroke:"#fff", strokeMiterlimit:10, strokeWidth: "0.581044039059308px"}}/><path d="M1.74,9A7.26,7.26,0,0,1,16.27,9" style={{fill:"#fff", opacity: 0.2}}/><path d="M1.74,9A7.26,7.26,0,1,0,16.27,9" style={{fill:"#fff"}}/></svg>
                    </span>
                    <span>DEVELOPMENT</span>
                </RoleLabelDev>)
                break;
            case true:
                return(
                <RoleLabelDevAndDes>
                <span>DESIGN</span>
                <span>
                <svg viewBox="0 0 18.01 18.01"><circle cx="9.01" cy="9.01" r="8.72" style={{fill:"none", stroke:"#fff", strokeMiterlimit:10, strokeWidth: "0.581044039059308px"}}/><path d="M1.74,9A7.26,7.26,0,0,1,16.27,9" style={{fill:"#fff"}}/><path d="M1.74,9A7.26,7.26,0,1,0,16.27,9" style={{fill:"#fff"}}/></svg>
                </span>
                <span>DEVELOPMENT</span>
            </RoleLabelDevAndDes>)
                break;
            default:
                return null;            
        }
    }


    return (
            <VideoContainer 
            drag 
            dragConstraints={{ left: 0, right: windowWidth, top: 0, bottom: windowHeight}}
            dragElastic={0.5}
            ref={videoContainerRef}
            style={{x, y}}
            initial="rest"
            whileHover="hover"
            variants={mediaMotion}
            >
                <Left>
                <Video src={src}/>
                <Information>
                    <Label>
                        <span>{src.name}</span>&nbsp;<span>{src.description}</span>
                    </Label>
                        {
                            src.link !== null ?
                            <Link>
                                <img src="./icons/share.svg" />
                            </Link>
                            :
                            <Lock>
                                <img src="./icons/lock.svg" />
                            </Lock>
                        }
                </Information>
                </Left>
                <Right>
                    <Role>
                        {getRole(src)}
                    </Role>
                </Right>
            </VideoContainer>)
}

export default Index;