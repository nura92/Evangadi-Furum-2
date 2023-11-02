import React from "react";
import Login from "./Login";
import "./logins.css";
import { Link } from "react-router-dom";

function Signin() {
  return (
    <section id="home">
      <div className="slide-home">
        <div className="slide-item">
          <div className="container">
            <div className="row hero-padd">
              <div className="col-md-6 col-12 col-sm-6">
                <div className="authfy-login">
                  <Login />
                </div>
              </div>

              <div className="col-md-6 col-12 col-sm-6  signs">
                <div className="padd-text fadeInLeft description_sign">
                  <small className="small-text  about">About</small>
                  <h2 className="title-h2">Evangadi Networks</h2>
                  <p className="font-p mg-bt-30 px-5">
                    No matter what stage of life you are in, whether you’re just
                    starting elementary school or being promoted to CEO of a
                    Fortune 500 company, you have much to offer to those who are
                    trying to follow in your footsteps.
                  </p>
                  <p className="font-p mg-bt-30 px-5">
                    Wheather you are willing to share your knowledge or you are
                    just looking to meet mentors of your own, please start by
                    joining the network here.
                  </p>
                  <Link href="/explained/" className=" btn-blue">
                    How it works
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signin;
