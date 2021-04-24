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

  const decryptPass = (encryption) => {
    axios
      .post("http://localhost:3001/decryptpassword", {
        password: encryption.password,
        iv: encryption.iv,
      })
      .then((res) => {
        console.log(res.data);

        setPasswordList(
          passwordList.map((val) => {
            return val.id == encryption.id
              ? {
                  id: val.id,
                  password: val.password,
                  title: res.data,
                  iv: val.iv,
                }
              : val;
          })
        );
      });
  };

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
        {passwordList.map((val, key) => {
          return (
            <div
              className="password"
              onClick={() => {
                decryptPass({ password: val.password, iv: val.iv, id: val.id });
              }}
              key={key}
            >
              <h3>{val.title}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
