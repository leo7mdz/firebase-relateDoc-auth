import "./App.css";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Home from "./components/Home";
import firebaseApp from "../credentials";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(firebaseApp);

function App() {
  const [isLogin, setIsLogin] = useState(null);

  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      setIsLogin(firebaseUser);
    } else {
      setIsLogin(null);
    }
  });
  console.log(isLogin);
  return (
    <div className="App">
      {isLogin ? <Home userEmail={isLogin.email} /> : <Login />}
    </div>
  );
}

export default App;
