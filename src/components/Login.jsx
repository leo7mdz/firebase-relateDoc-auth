import React, { useState } from "react";
import { Stack, Container, Form, Button } from "react-bootstrap";
import firebaseApp from "../../credentials";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.formBasicEmail.value;
    const password = e.target.formBasicPassword.value;

    if (isRegistering) {
      await createUserWithEmailAndPassword(auth, email, password);
    } else {
      await signInWithEmailAndPassword(auth, email, password);
    }
  };
  return (
    <Container>
      <Stack gap={3}>
        <Form onSubmit={handleSubmit}>
          <h2>{isRegistering ? "Registarse" : "Inicia sesion"}</h2>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Button variant="primary" type="submit">
            {isRegistering ? "Registrarse" : "Iniciar sesion"}
          </Button>
        </Form>
        <Button
          variant="primary"
          type="submit"
          style={{ width: "300px" }}
          onClick={() => signInWithRedirect(auth, googleProvider)}
        >
          Acceder con Google
        </Button>
        <Button
          style={{ width: "300px" }}
          variant="secondary"
          type="submit"
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering
            ? "¿Ya tienes cuenta? Inicia sesion"
            : "¿No tienes cuenta? Registrate"}
        </Button>
      </Stack>
    </Container>
  );
};

export default Login;
