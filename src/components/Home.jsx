import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import firebaseApp from "../../credentials";
import AddTask from "./AddTask";
import TaskList from "./TaskList";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const fakeTask = [
  { id: 1, description: "Tarea de ejemplo" },
  { id: 2, description: "Tarea de ejemplo2" },
];

const Home = ({ userEmail }) => {
  const [tasksList, setTasksList] = useState([]);

  const searchOrCreateDocument = async (idDocument) => {
    //crear referencia al documento
    const docRef = doc(firestore, `users/${idDocument}`);
    //Buscar documento
    const query = await getDoc(docRef);
    //console.log(query);
    //Revisar si existe el documento
    if (query.exists()) {
      //Si existe
      const infoDoc = query.data();
      return infoDoc.tareas;
    } else {
      //Si no existe
      await setDoc(docRef, { tareas: [...fakeTask] });
      //Volvemos a preguntar - sabiendo que ahora existe
      const query = await getDoc(docRef);
      const infoDoc = query.data();
      return infoDoc.tareas;
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await searchOrCreateDocument(userEmail);
      setTasksList(tasks);
    };

    fetchTasks();
  }, []);

  return (
    <Container>
      <h2>Home</h2>
      <Button onClick={() => signOut(auth)}>Cerrar sesion</Button>
      <hr />
      <AddTask
        tasks={tasksList}
        userEmail={userEmail}
        setTasksList={setTasksList}
      />
      <TaskList
        tasks={tasksList}
        userEmail={userEmail}
        setTasksList={setTasksList}
      />
    </Container>
  );
};

export default Home;
