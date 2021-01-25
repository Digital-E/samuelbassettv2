import { useEffect, useContext, useState, useRef } from "react";

import { useRouter } from "next/router";

import styled from "styled-components";

import Link from "./link"

import { store } from "../store";

const Container = styled.div`
  position: relative;
  top: 0;
  z-index: 999;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  // background: linear-gradient(rgba(255, 255, 255, 1) 28.99%, rgba(255, 255, 255, 0.93) 48.32%,
  // rgba(255, 255, 255, 0.76) 66.39%,
  // rgba(255, 255, 255, 0.5) 79.83%,
  // rgba(255, 255, 255, 0) 100%
  // );

  .hide-mobile {
    display: none;
  }

  @media(min-width: 992px) {
    padding: 1.3rem;

    .hide-mobile {
      display: inline-block;
    }
  }
`;

const LeftCol = styled.div`
  display: flex;
  flex-direction: column;

  @media(min-width: 992px) {
    flex-direction: row;
  }
`

const RightCol = styled.div`
  display: flex;
`

const Menu = styled.div`
  display: flex;

`;

const Logo = styled.div`
a {
  border: none;
}
  a span {
    border: none;
    color: black;
  }
`;

const MenuItem = styled.div`
  margin-left: 0.5em;

  span {
    line-height: 1;
  }
`;

const Information = styled.div`
  display: flex;
`;


const Project = styled.div`
  margin-left: 0;

  @media(min-width: 992px) {
    margin-left: 0.5em;
  }
`;

const Counter = styled.div`
  margin-left: 0.5em;
`;

const Readmore = styled.div`
  margin-left: 0.5em;

  .read-more {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Clock = styled.span`
  // display: none;
  margin-left: 0.5em;

  // @media(min-width: 576px) {
  //   display: block;
  // }
`


export default function Header() {
  let clockRef = useRef();

  const router = useRouter();

  let [pathname, setPathname] = useState("");

  //Context
  const context = useContext(store);
  const { state, dispatch } = context;

  useEffect(() => {
    function showTime(){
      var date = new Date();

      // var h = date.getHours(); // 0 - 23
      // var m = date.getMinutes(); // 0 - 59
      // var s = date.getSeconds(); // 0 - 59
      // var session = "AM";
      
      // // if(h == 0){
      // //     h = 12;
      // // }
      
      // // if(h > 12){
      // //     h = h - 12;
      // //     session = "PM";
      // // }
      
      // h = (h < 10) ? "0" + h : h;
      // m = (m < 10) ? "0" + m : m;
      // s = (s < 10) ? "0" + s : s;
      
      // // var time = h + ":" + m + ":" + s + " " + session;
      // var time = h + ":" + m + ":" + s;

      if(clockRef.current === null) return;
      clockRef.current.innerText = date.toLocaleTimeString("en-GB", { timeZone: 'Europe/London' });
      clockRef.current.textContent = date.toLocaleTimeString("en-GB", { timeZone: 'Europe/London' });
      
      setTimeout(showTime, 1000);
  }
  
  showTime();
  },[]);

  useEffect(()=>{
    setPathname(router.pathname)
  })



  const toggleProjectOpen = () => {
    dispatch({type: "update project open", value: !state.projectOpen})
  }

  const reset = () => {
    dispatch({type: "update project index", value: 0})
    dispatch({type: "update slide index", value: 0})
    dispatch({type: "update project open", value: false})
  }


  return (
    <Container>
      <LeftCol>
      <Menu>
        <Logo onClick={()=> reset()}><Link href="/"><span>AD-REM</span><span className="hide-mobile">.Studio</span></Link></Logo><span>,</span>
        <MenuItem onClick={()=> reset()}><Link href="/all"><span>Index</span></Link></MenuItem><span>,</span>
        <MenuItem onClick={()=> reset()}><Link href="/information"><span>Info</span><span className="hide-mobile">rmation</span></Link></MenuItem><span>,</span>
        <Clock ref={clockRef} />
        {
          (pathname === "/" 
          || router.asPath.split("/")[1] === "projects")  && state.projectIndex !== null ?
          <span className="hide-mobile">,</span>
          :
          null
        }
      </Menu>
      {
        pathname === "/"  && state.projectIndex !== null
        ||
        router.asPath.split("/")[1] === "projects"
        ?
        (
          <Information>
          <Project>
            <span>{state.allProjects.length > 0 && state.allProjects[state.projectIndex].node.title}</span>
          </Project>
          <Counter>
            <span>
              {parseInt(state.slideIndex) + 1}
              /
              {state.allProjects.length > 0 && state.allProjects[state.projectIndex].node.media.length}</span>
          </Counter>
          <Readmore onClick={()=>toggleProjectOpen()}>
            <span>(</span><span className="read-more">{state.projectOpen ? "Read less" : "Read more"}</span><span>)</span>
          </Readmore>
          </Information>
        )
        :
        null
        }
        {/* {
        pathname === "/all" && state.projectIndex !== null ?
        (
          <Information>
          <Project>
            <span>{state.allProjects.length > 0 && state.allProjects[state.projectIndex].node.title}</span>
          </Project>
          <Counter>
            <span>
              ({state.allProjects.length > 0 && state.allProjects[state.projectIndex].node.media.length})</span>
          </Counter>
          </Information>
        )
        :
        null
        } */}
        {
        pathname === "/all" ?
        (
          <Information>
            <span className="hide-mobile">,</span>
            <Project><span>Selected Works</span></Project>
          </Information>
        )
        :
        null
        }
      </LeftCol>
      {/* <RightCol>
        <Clock ref={clockRef} />
      </RightCol> */}
    </Container>
  );
}
