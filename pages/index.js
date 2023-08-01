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
  height: 100%;
  width: 100vw;
`;

const FormContainer = styled(motion.div)`
  position: absolute;
  width: 40%;
  height: 100vh;
  z-index: 0;

  .mobile-link {
    display: none;
    text-decoration: none;
  }

  .mobile-lock-icon {
    height: 10px;
    width: auto;
    display: inline-block;
    padding: 0;
    margin: 0;
    opacity: 0.5;
    margin: 0 0 1px 3px;
  }

  .mobile-link-icon {
    height: 10px;
    width: auto;
    display: inline-block;
    padding: 0;
    margin: 0;
    opacity: 0.5;
    margin: 0 0 1px 3px;
  }

  @media(min-width: 992px) {
    .mobile-lock-icon {
      display: none !important;
    }

    .mobile-link-icon {
      display: none !important;
    }
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

  cf-radio {
    display: none !important;
  }

  .hide-nav-buttons {
    padding: 0;
  }

  .hide-nav-buttons.animate-in {
    padding: 10px 0;
  }

  cf-input {
    margin-bottom: 0 !important;
  }

  cf-chat {
    margin-bottom: 0 !important;
  }


  cf-input-control-elements .cf-button {
    margin-bottom: 0;
  }

  .conversational-form a {
    color: #d1d1d1 !important;
  }

  .conversational-form-inner {
    // width: fit-content !important;
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
    background: transparent;
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


  cf-chat {
    // width: fit-content !important;
  }

  cf-chat scrollable {
    // width: fit-content !important;
    width: 100% !important;
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

 
let projects = [
  {url: "./videos/nike.mp4", name: "Nike Impact Game", description: "a digital experience that invites youth to engage and imagine a new path to the future.", link: "https://nike.gallery/yourmove/", developer: true, designer: false, collaboration: "made with OK DEPLOY and Accept & Proceed"},
  {url: "./videos/rupturesstudio.mp4", name: "Ruptures Studio", description: "a Paris based video and visual services studio", link: "https://www.ruptures.studio", developer: true, designer: true, collaboration: null},
  {url: "./videos/digitalfairy.mp4", name: "The Digital Fairy", description: "a London based creative agency", link: "https://www.thedigitalfairy.co.uk/", developer: true, designer: false, collaboration: "design by Katie Ling"},
  {url: "./videos/beepybella.mp4", name: "Beepy Bella", description: "a New York based jewelry brand", link: "https://www.beepybella.world/", developer: true, designer: false, collaboration: "made with The Digital Fairy"},
  {url: "./videos/artaucentregeneve.mp4", name: "Art au Centre Genève", description: "a city-wide art exhibition in Geneva, Switzerland", link: "https://www.artaucentregeneve.ch/", developer: true, designer: false, collaboration: "made with Neo Neo"},
  {url: "./videos/videoOne.mp4", name: "Nike Bra Radar", description: "a bespoke experience for influencers around the world", link: null, developer: true, designer: false, collaboration: "made with The Digital Fairy"},
  {url: "./videos/lesgarconnes.mp4", name: "Les Garçonnes", description: "a virtual fitting room for the Parisian fashion house", link: "https://cabine.les-garconnes.com/", developer: true, designer: true, collaboration: null},
  {url: "./videos/videoTwo.mp4", name: "CLM", description: "an international super-agency", link: "https://www.clm-agency.com/", developer: true, designer: false, collaboration: "made with Yes Studio"},
  {url: "./videos/videoThree.mp4", name: "John Gray", description: "a french film director", link: "https://digital-e.github.io/realdejague4/ ", developer: true, designer: true, collaboration: null},
  {url: "./videos/videoFour.mp4", name: "Caroline Dussuel", description: "specialised in creative services", link: "https://carolinedussuel.com", developer: true, designer: true, collaboration: null},
  {url: "./videos/videoFive.mp4", name: "Scotomalab", description: "a textile-first creative studio", link: "https://scotomalab.com", developer: true, designer: true, collaboration: null}
]



export default function Index({ preview }) {
  let [revealProjects, setRevealProjects] = useState(false);
  let [triggerForm, setTriggerForm] = useState(false);
  let [introLoaded, setIntroLoaded] = useState(false);

  let formContainerRef = useRef();
  let messageAlertRef = useRef();



  //Context
  const context = useContext(store);
  const { state, dispatch } = context;


  useEffect(()=>{
    if(introLoaded !== true) return;
    setTriggerForm(true);
    setTimeout(()=>{
      formContainerRef.current.style.height = "100%";
    }, 2000);
  },[introLoaded]);

  const playMessageAlert = () => {
    messageAlertRef.current.play();
  }


  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{CMS_NAME}</title>
        </Head>
        <Container>
        <BackgroundSwitch toggleSwitch={()=>{}}/>
        <Intro introLoaded={() => setIntroLoaded(true)}/>
        <audio preload="true" ref={messageAlertRef} src="/sounds/your-turn-491.mp3" type="audio/mp3"/>
        <Projects reveal={revealProjects} projects={projects}/>
        <FormContainer ref={formContainerRef}>
          <Form playMessageAlert={() => playMessageAlert()} trigger={triggerForm} showProjects={() => setRevealProjects(true)} projects={projects}/>
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
