import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

const Login = ({ setShowForm, setUser }) => {
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState();

  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });

  const handlePassword = (event) => {
    const password = event.target.value;
    setUserInfo((userInfo) => ({ ...userInfo, password }));
  };

  const handleUsername = (event) => {
    const username = event.target.value;
    setUserInfo((userInfo) => ({ ...userInfo, username }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (verifyLogin()) {
      setError(false);
      setShowForm(true);
      setUser(userInfo.username);
    } else {
      setError(true);
    }
  };

  const verifyLogin = () => {
    let flag = false;
    for (let admin of admins) {
      console.log(admin["username"] === userInfo.username);
      console.log(admin["password"] === userInfo.password);
      if (
        admin["username"] === userInfo.username &&
        admin["password"] === userInfo.password
      ) {
        flag = true;
      }
    }
    return flag;
  };

  useEffect(() => {
    getAdmins();
  }, []);

  // get request to get existing admins
  async function getAdmins() {
    await fetch("http://localhost:8080/admins")
      .then((response) => response.json())
      .then((reviews) => {
        setAdmins(reviews);
      });
  }

  return (
    <>
      <div className="LoginFormDiv">
        <h1 className="CreateFormTitle">Login to Create Post</h1>
        <div className="LoginForm">
          <Form className="loginformForm" onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <input
                type="text"
                id="username"
                placeholder="Username"
                required
                value={userInfo.username || ""}
                onChange={handleUsername}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <br></br>
              <input
                type="password"
                id="password"
                placeholder="Password"
                required
                value={userInfo.password || ""}
                onChange={handlePassword}
              />
            </Form.Group>
            <Form.Group>
              <Button
                type="submit"
                variant="outline-success"
                style={{ marginTop: "10px" }}
              >
                Login
              </Button>
            </Form.Group>
          </Form>
        </div>
        {error ? (
          <div>
            <p style={{ color: "red", marginTop: "10px" }}>
              Incorrect password or username
            </p>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Login;
