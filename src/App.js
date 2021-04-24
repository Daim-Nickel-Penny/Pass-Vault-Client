import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [passwordList, setPasswordList] = useState([]);

  const addPassword = () => {
    axios.post("http://localhost:3001/addpassword", {
      password: password,
      title: title,
    });
  };

  useEffect(() => {
    axios.get("http://localhost:3001/showpasswords").then((response) => {
      console.log(response.data);
      setPasswordList(response.data);
    });
  }, []);

  return (
    <div className="App">
      <div className="AddingPassword">
        <input
          type="text"
          placeholder="password@123"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <input
          type="text"
          placeholder="Instagram"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></input>
        <button onClick={addPassword}>Add Password</button>
      </div>

      <div className="Passwords">
        {passwordList.map((val) => {
          return (
            <div className="password">
              <h3>{val.title}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
