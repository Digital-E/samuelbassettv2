import { useState, useEffect, useContext } from "react";
import Layout from "../components/layout";
import Head from "next/head";
import { CMS_NAME } from "../lib/constants";

import Form from "../components/conversational-form"

import styled from "styled-components";

import { store } from "../store";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  position: relative;
  width: 40%;
  height: 40%;
  left: -2%;

  .conversational-form {
    background: transparent !important;
    display: flex;
    justify-content: center;
  }

  .conversational-form-inner {
    width: fit-content !important;
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
    width: fit-content !important;
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



  //Context
  const context = useContext(store);
  const { state, dispatch } = context;



  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{CMS_NAME}</title>
        </Head>
        <Container>
          <FormContainer>
            <Form />
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
