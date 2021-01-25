import {  useContext } from "react";

import styled from "styled-components";

import { store } from "../store";

const Container = styled.footer``;





export default function Footer() {
  //Context
  const context = useContext(store);
  const { state, dispatch } = context;

  return (
    <Container>
      
    </Container>
  );
}
