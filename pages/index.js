import { useState, useEffect, useContext } from "react";
import Layout from "../components/layout";
import Head from "next/head";
import { CMS_NAME } from "../lib/constants";

import {motion} from "framer-motion"

import Form from "../components/conversational-form"

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


  .conversational-form {
    background: transparent !important;
    display: flex;
    align-items: flex-end;
  }

  .conversational-form a {
    color: #cbcbcb;
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
`;





export default function Index({ preview }) {
  let [revealProjects, setRevealProjects] = useState(false);
  let [triggerForm, setTriggerForm] = useState(false);


  //Context
  const context = useContext(store);
  const { state, dispatch } = context;

  useEffect(()=>{
    setTimeout(()=>{
      setTriggerForm(true);
    // },2000);
  },0);
  },[])



  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{CMS_NAME}</title>
        </Head>
        <Container>
        {/* <Intro /> */}
        <Projects reveal={revealProjects}/>
        <FormContainer>
          <Form trigger={triggerForm} showProjects={() => setRevealProjects(true)}/>
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
