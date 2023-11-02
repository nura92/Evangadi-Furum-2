import React, { createContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Home from "./pages/home/Home";
import NewQuestion from "./pages/question/NewQuestion";
import Answer from "./pages/Answer/Answer";
import AxiosConfig from "./axios";
import "./App.css";
import Header from "./pages/Header/Header";
import Footer from "./pages/Footer/Footer";
import Signin from "./pages/signin/Signin";
import Reg from "./pages/signin/Reg";

export const AppState = createContext();

function App() {
  const [userData, setUserData] = useState({});

  console.log(userData);

  const token = localStorage.getItem("token");
  const [tokens, setToken] = useState(token);
  // console.log(tokens)

  // console.log(token)
  const axios = AxiosConfig();
  const navigate = useNavigate();

  // check user avaliabel
  const checkuser = async () => {
    try {
      const { data } = await axios.get("/user/check", {
        headers: {
          Authorization: "Bearer " + tokens,
        },
      });
      setUserData(data);
      // console.log(data);
    } catch (error) {
      console.log(error.response);
      navigate("/Login");
    }
  };
  useEffect(() => {
    checkuser();
  }, []);
  return (
    <AppState.Provider value={{ userData, setUserData }}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Signin />} />
        <Route path="/Register" element={<Reg />} />
        <Route path="/askquestion" element={<NewQuestion />} />
        <Route path="/Answer/:questions_id" element={<Answer />} />
      </Routes>
      <Footer />
    </AppState.Provider>
  );
}

export default App;
