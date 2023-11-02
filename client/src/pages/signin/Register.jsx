import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";

import AxiosConfig from "../../axios";
import "./Signin.css";

const Register = () => {
  const [Form, setForm] = useState({});
  // console.log(Form)
  const axios = AxiosConfig();

  //useNavigate
  const navigate = useNavigate();

  
  const [showPassword, setShowPassword] = useState(false);

		const togglePasswordVisibility = () => {
			setShowPassword(!showPassword);
		}


  //handle change value
  const handleChange = (e) => {
    setForm({ ...Form, [e.target.name]: e.target.value });
  };

  //handle submit value
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/register", Form);
      alert("register successfuly");
      navigate("/Login");
    } catch (error) {
      alert(error.response.data.msg);
      console.log(error.response.data.msg);
    }
  };
  return (
    <div className="container form">
      <div className="sign">
        <div>
          <div className="login-text">Join the network</div>

          <div className="text_login">
            <div>
              Already have an account?{" "}
              <span>
                {" "}
                <Link to={"/Login"} className="Link">
                  Sign in
                </Link>
              </span>
            </div>
          </div>
        </div>
        <form method="POST" className="login_form" onSubmit={handleSubmit}>
          <div className="mb-2 email px-4">
            <input className="input"
              type="text"
              name="user_name"
              onChange={handleChange}
              placeholder="user_name"
              required
            />
          </div>
          <br />

          <div className="sign_input">
            <div className="mb-2 email px-4">
              <input className="input"
                type="text"
                name="firs_tname"
                onChange={handleChange}
                placeholder="first_name"
                required
              />
            </div>
            <div className="mb-2 email px-4 pl-2">
              <input className="input"
                type="text"
                name="last_name"
                onChange={handleChange}
                placeholder="last_name"
                required
              />
            </div>
          </div>

          <br />

          <div className="mb-2 email px-4">
            <input className="input"
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
          <br />

          <div className="mb-2 email px-4">
            <input className="input"
              type="Password"
              name="password"
              onChange={handleChange}
              placeholder="Password"
              required
            />
              <span className="eyes" onClick={togglePasswordVisibility}>
											{showPassword ? (
												<FaRegEye className="eye" />
											) : (
												<FaRegEyeSlash className="eye" />
											)}
										</span>
          </div>
          <br />
          <div className="form-group">
              <p className="term-policy text-muted priv small">
                I agree to the
                <a href="#" target="_blank">
                  privacy policy
                </a>
                and
                <a href="#" target="_blank">
                  terms of service
                </a>
                .
              </p>
            </div>
          <div className="btn">
            <button type="submit">Agree And Join</button>
          </div>
          <br />
          <Link className="Link" to={'/Login'}>Already have an account?</Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
