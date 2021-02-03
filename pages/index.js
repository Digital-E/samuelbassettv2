import { useState, useEffect, useContext, useRef } from "react";
import Layout from "../components/layout";
import Head from "next/head";
import { CMS_NAME } from "../lib/constants";

import {motion} from "framer-motion"

import Form from "../components/conversational-form"

import BackgroundSwitch from "../components/background-switch"

import Projects from "../components/projects"

import Intro from "../components/intro.js"

import styled from "styled-components";

import { store } from "../store";


const Container = styled.div`
  height: 100vh;
  width: 100vw;
`;

const FormContainer = styled(motion.div)`
  position: absolute;
  width: 40%;
  height: 100vh;
  z-index: 0;

  .mobile-link {
    display: none;
  }

  @media(max-width: 992px) {
    width: 100%;

    .mobile-link {
      display: inline-block;
    }
  }


  .conversational-form {
    background: transparent !important;
    display: flex;
    align-items: flex-end;
    // -webkit-mask-image: linear-gradient( transparent 0%, white 6%, white 90%, transparent 95%);
  }

  cf-chat-response text {
    padding-right: 2px;
  }

  cf-input-control-elements {
    padding: 0 !important;
  }

  cf-input {
    margin-bottom: 0 !important;
  }

  cf-chat {
    margin-bottom: 0 !important;
  }

  .conversational-form a {
    color: #d1d1d1 !important;
  }

  .conversational-form-inner {
    width: fit-content !important;
    position: relative !important;
    min-height: 0 !important;
  }

  cf-chat-response thumb {
    background: transparent;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 30px;
  }

  .conversational-form:before {
    background: none;
  }
  
  .conversational-form cf-chat-response.robot text > p {
    /* border-radius: 4px 20px 20px 20px; */
    background-color: #a0a0a0 !important;
  }
  
  .conversational-form cf-chat-response.robot text {
    color: white !important;
  }

  cf-input {
    // background: transparent;
    background: #757575;
  }

  .inputWrapper {
    display: none !important;
  }

  cf-list-button:nth-child(2):before {
    background: none;
  }


  .cf-button[checked=checked]:not(:focus):not(:hover):not(.highlight), .cf-button[selected=selected]:not(:focus):not(:hover):not(.highlight) {
    background-color: #48ba48;
    color: white;
  }

  .cf-button:hover {
    background-color: #48ba48 !important;
    color: white !important;
  }

  .cf-button {
    background: #a0a0a0;
    color: white;
    border: none;
  }

  cf-radio-button.cf-button cf-radio {
    border: 1px solid white;
  }

  conversational-form-inner {
  
  }

  cf-chat {
    width: fit-content !important;
  }

  cf-chat scrollable {
    width: fit-content !important;
    padding-right: 0 !important;
  }

  cf-chat-response {
    max-width: none !important;
  }

  #google-drive-icon {
    top: -2px;
    position: relative;
    width: 14px;
    display: inline;
    margin: 0;
    padding: 0;
  }
`;

const Background = styled.img`
  position: fixed;
  height: 100%;
  width: 100%;
`
 



let projects = [
  {url: "./videos/videoOne.mp4", name: "Nike Bra Radar", description: "A tool for influencers", link: null, developer: true, designer: false, collaboration: "made with The Digital Fairy"},
  {url: "./videos/videoTwo.mp4", name: "CLM", description: "An international super-agency", link: "https://clm-agency.com", developer: true, designer: false, collaboration: "made with Yes Studio"},
  {url: "./videos/videoThree.mp4", name: "John Gray", description: "A french film director", link: "https://realdejague.com", developer: true, designer: true, collaboration: null},
  {url: "./videos/videoFour.mp4", name: "Caroline Dussuel", description: "specialised in creative services", link: "https://carolinedussuel.com", developer: true, designer: true, collaboration: null},
  {url: "./videos/videoFive.mp4", name: "Scotomalab", description: "a textile-first creative studio", link: "https://scotomalab.com", developer: true, designer: true, collaboration: null}
]



export default function Index({ preview }) {
  let [revealProjects, setRevealProjects] = useState(false);
  let [triggerForm, setTriggerForm] = useState(false);

  let messageAlert = useRef();



  //Context
  const context = useContext(store);
  const { state, dispatch } = context;

  useEffect(()=>{
    document.body.click()
    setTimeout(()=>{
      setTriggerForm(true);
    },2000);
  // },0);
  },[])



  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{CMS_NAME}</title>
        </Head>
        <Container>
        <BackgroundSwitch />
        {/* <Background src="./images/bg-2.jpg"/> */}
        <Intro />
        <Projects reveal={revealProjects} projects={projects}/>
        <FormContainer>
          <Form trigger={triggerForm} showProjects={() => setRevealProjects(true)} projects={projects}/>
        </FormContainer>
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps({ preview = false, previewData }) {


  return {
    props: { preview },
  };
}
