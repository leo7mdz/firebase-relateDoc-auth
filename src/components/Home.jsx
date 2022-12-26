import React from "react";
import { Button, Container } from "react-bootstrap";
import { getAuth, signOut } from "firebase/auth";
import firebaseApp from "../../credentials";

const auth = getAuth(firebaseApp);
const Home = () => {
  return (
    <Container>
      <h2>Home</h2>
      <Button onClick={() => signOut(auth)}>Cerrar sesion</Button>
    </Container>
  );
};

export default Home;
