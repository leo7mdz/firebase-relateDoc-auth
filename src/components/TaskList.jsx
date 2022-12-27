import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import firebaseApp from "../../credentials";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const firebase = getFirestore(firebaseApp);

const TaskList = ({ tasks, userEmail, setTasksList }) => {
  const handleDelete = async (deleteTask) => {
    //Crear nuevo array de tareas
    const newArrayTasks = tasks.filter((task) => task.id !== deleteTask);

    //Actualizar base de datos
    const docRef = doc(firebase, `users/${userEmail}`);

    await updateDoc(docRef, { tareas: [...newArrayTasks] });

    setTasksList(newArrayTasks);
  };

  return (
    <Container>
      {tasks.map((task) => {
        return (
          <div key={task.id}>
            <Row>
              <Col>{task.description}</Col>
              <Col>
                <a href={task.file} target="_blank">
                  <Button>Ver archivo</Button>
                </a>
              </Col>
              <Col>
                <Button variant="danger" onClick={() => handleDelete(task.id)}>
                  Eliminar tarea
                </Button>
              </Col>
            </Row>
            <hr />
          </div>
        );
      })}
    </Container>
  );
};

export default TaskList;
