import Alert from "../components/alert";
import Footer from "../components/footer";
import Meta from "../components/meta";

import styled from "styled-components";

const Container = styled.div``;

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      <Container>
        <Alert preview={preview} />
        <main>
          {children}
          <Footer />
        </main>
      </Container>
    </>
  );
}
