import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import { AppState } from "../../App";

import AxiosConfig from "../../axios";
import "./Signin.css";

function Login() {
  const axios = AxiosConfig();
  const { userData, setUserData } = useContext(AppState);

  const [form, setForm] = useState({});
  console.log(form.email);
  console.log(form.password);
  const navigate = useNavigate();
  const [alertMessages, setAlertMessages] = useState("");
  console.log(alertMessages)

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //handle change value
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //handle submit value
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(form)
    try {
      const { data } = await axios.post("/user/login", form);
      // console.log(data);
      setUserData(data);

      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      alert(error.response.data.msg);
      console.log(error.response);
    }
  };
  return (
    <div className="container form bg-lignt">
      <div className="logins">
        <div>
          <div className="login-text">Login to your account</div>
         

          <div className="text_login">
            <div>
              Don’t have an account?{" "}
              <span>
                {" "}
                <Link to={"/Register"} className="Link">
                  Create a new account
                </Link>
              </span>
            </div>
          </div>
        </div>
        <form method="POST" className="login_form" onSubmit={handleSubmit}>
          <div className="mb-2 email px-4">
            <input
              className="input"
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
          <br />

          <div className="mb-2 email px-4">
            <input
              className="input"
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={handleChange}
              placeholder="Password"
              required
            />
            {/* <span className="eyes" onClick={togglePasswordVisibility}>
              {showPassword ? (
                <FaRegEye className="eye" />
              ) : (
                <FaRegEyeSlash className="eye" />
              )}
            </span> */}
          </div>
          <br />
          <div>
            <Link className="Link forget">Forgot password?</Link>
          </div>
          <br />
          <div className="btn">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
