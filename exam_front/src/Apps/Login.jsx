import { useState, useEffect } from "react";
import "../css/login.css";

const Login = () => {
  const [reg, setReg] = useState("");
  const [password, setPassword] = useState("");
  // const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);
  // const [status, setStatus] = useState("");
  const [status_text, setStatusText] = useState("");

  const [responseState, setResponseState] = useState({
    loading: false,
    status: null,
    message: "",
    color: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(responseState);
    setResponseState((prev) => {
      return {
        ...prev,
        loading: !prev.loading,
      };
    });

    // setStatus("");

    fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reg: reg,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        // setStatus(response.status);

        setResponseState((prev) => {
          return {
            ...prev,
            status: response.status,
            message:
              response.status === 200
                ? "Success"
                : response.error || "An error occurred",
            color: response.status === 200 ? "#086e08" : "#dd0909",
            loading: response.status !== 200,
          };
        });
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setResponseState((prev) => {
          return {
            ...prev,
            loading: !prev.loading,
          };
        });
      });
  };

  const togglePassword = (e) => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="login-form-inner">
          <div className="logo" style={{ textAlign: "center" }}>
            <img src="src/assets/react.svg" alt="" />
          </div>
          <h1>Login</h1>

          <form id="login-form" autoComplete="off" onSubmit={handleSubmit}>
            <div className="login-form-group">
              <input
                type="text"
                placeholder="Enter Registration number"
                value={reg}
                onChange={(e) => setReg(e.target.value)}
                id="reg"
                name="reg"
              />
              <p className="error none">{error}</p>
            </div>
            <div className="login-form-group">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="pwd"
                name="password"
              />
              <i
                className={`fa-regular eye ${
                  passwordVisible ? "fa-eye-slash" : "fa-eye"
                }`}
                onClick={togglePassword}
                style={{ cursor: "pointer" }}
              ></i>
            </div>

            {/* <div className="login-form-group single-row">
              <div className="custom-check">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  id="remember"
                  name="remember"
                />
                <label htmlFor="remember">Remember me</label>
              </div>
              <div>
                <a href="./forgetPass.php" className="link">
                  Forget Password?
                </a>
              </div>
            </div> */}
            <p
              id="success"
              className={responseState.status ? "" : "none"}
              style={{ color: responseState.color, fontWeight: "700" }}
            >
              {responseState.message}
            </p>
            <button
              className="rounded-button login-cta"
              type="submit"
              disabled={responseState.loading}
            >
              <span id="textbtn">Login</span>
              <i
                className="fa fa-spinner fa-spin"
                style={{ display: responseState.loading ? "" : "none" }}
              ></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
