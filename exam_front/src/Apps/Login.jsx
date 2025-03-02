import { useState, useRef, useEffect } from "react";
import "../css/login.css";

const Login = () => {
  const [reg, setReg] = useState("");
  const [password, setPassword] = useState("");
  // const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const spinnerRef = useRef(null);

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    spinnerRef.current.style.display = "block";

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
      .then((response) => console.log(response))
      .catch((err) => console.error(err))
      .finally(() => {
        // ✅ Hide spinner and stop loading only after request finishes
        if (spinnerRef.current) {
          spinnerRef.current.style.display = "none";
        }
        setLoading(false);
      });
    // spinnerRef.current.style.display = "none";
    // setLoading(false);
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
              className="none"
              style={{ color: "#086e08", fontWeight: "700" }}
            >
              Success
            </p>
            <button
              className="rounded-button login-cta"
              type="submit"
              disabled={loading}
            >
              <span id="textbtn">
                <i
                  ref={spinnerRef}
                  className="fa fa-spinner fa-spin"
                  style={{ display: "none " }}
                ></i>
                Login
              </span>
            </button>
          </form>
          {/* <div className="register-div">
            Not registered yet?{" "}
            <a href="./signup.php" className="link create-account">
              Create an account?
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
