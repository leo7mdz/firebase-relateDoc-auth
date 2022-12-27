import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import firebaseApp from "../../credentials";

const AddTask = ({ tasks, userEmail, setTasksList }) => {
  const firestore = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);

  let downloadURL;

  const handleChange = async (e) => {
    //detectar archivo
    const localFile = e.target.files[0];
    console.log(localFile);

    //Cargarlo a firebase storage
    const fileRef = ref(storage, `documents/${localFile.name}`);
    await uploadBytes(fileRef, localFile);

    //Obtener URL de descarga
    downloadURL = await getDownloadURL(fileRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const description = e.target.description.value;

    //actualizar la base de datos
    const docRef = doc(firestore, `users/${userEmail}`);

    const newArrayTasks = [
      ...tasks,
      { id: +new Date(), description, file: downloadURL },
    ];

    await updateDoc(docRef, { tareas: [...newArrayTasks] });

    //Actuliazar el estado
    setTasksList(newArrayTasks);

    e.target.description.value = "";
  };

  return (
    <Container>
      <Form className="mb-5" onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Control
              type="text"
              placeholder="Ingrese tarea"
              id="description"
            />
          </Col>
          <Col>
            <Form.Control type="file" id="file" onChange={handleChange} />
          </Col>
          <Col>
            <Button variant="secondary" type="submit">
              Agregar tarea
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default AddTask;
