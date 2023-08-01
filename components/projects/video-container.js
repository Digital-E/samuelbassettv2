import { useEffect, useState, useRef } from "react"
import { animate, motion, useMotionValue, useTransform } from "framer-motion"
import styled from "styled-components"

import Video from "../video"


const VideoContainer = styled(motion.a)`
    position: relative;
    width: calc(100% - 20px);
    overflow: hidden;
    display: flex;
    margin-bottom: 40px;
    text-decoration: none;

    > div:nth-child(1) > div:nth-child(1) {
        border-radius: 15px;
    }

    > div:nth-child(1)  {
        cursor: pointer;
    }

    .locked-project {
        cursor: not-allowed !important;
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
    line-height: 1.6;

    span {
        font-family: "Eurostile";
        text-transform: uppercase;
        color: white;
        font-size: 14px;
        // white-space: nowrap;
    }

    span:nth-child(2) {
        opacity: 0.6;
    }
`


const Link = styled.div`
    height: auto;
    min-width: 8px;
    margin-left: 5px;
    margin-top: -12px;

    img {
        height: 100%;
    }
`

const Lock = styled.div`
    height: auto;
    min-width: 6px;
    margin-left: 5px;
    margin-top: -13px;

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
        font-size: 14px;
        display: inline-block;
    }

    span:nth-child(1) {
        opacity: 0.2;
    }

    span:nth-child(2) {
        // margin-left: 8px;
        left: 2px;
        position: relative;
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
    font-size: 14px;
    display: inline-block;
}

span:nth-child(2) {
    // margin-left: 8px;
    left: 2px;
    position: relative;
}

span:nth-child(2) svg {
    height: 10px;
    margin: 5px 0;
}
`


  let mediaVariants = {
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1,
            type: "tween",
            ease: "easeInOut"
          }
    },
    hide: {
        opacity: 0,
        y: 20,
    }
}



const Index = ({src}) => {

    let videoContainerRef = useRef()


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
            ref={videoContainerRef}
            variants={mediaVariants}
            href={src.link}
            target="_blank"
            >
                <Left className={src.link === null && "locked-project"}>
                <Video src={src} height="1590" width="2880"/>
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