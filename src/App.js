// import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "./firebase-config";
import {  getDocs , collection} from "firebase/firestore";
function App() {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      console.log(data);
    };

    getUsers();
  }, []);

  return <div></div>;
}

export default App;
