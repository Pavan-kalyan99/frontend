import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, NavLink } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import "./AuthStyles.css";
import { useAuth } from "../../context/Auth";
import { Checkbox } from "antd";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPasaword] = useState("");
  const [passVisible, setPassVisible] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const submitHand = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        //  toast.success("successfully registered");
        setAuth({ ...auth, user: res.data.user, token: res.data.token });
        //localStorage
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  return (
    <Layout title={"Login| E-store"}>
      <div className="form-cointainer card item-center">
        <form
          onSubmit={submitHand}
          style={{
            width: "75%",
            border: "2px solid black",
            borderRadius: "10px",
          }}
          className="p-2"
        >
          <h1 className="title text-center">Login form</h1>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              autoFocus
              placeholder="Enter mail"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3 ">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              className="form-control"
              value={password}
              minLength="5"
              maxlength="10"
              type={passVisible ? "text" : "password"}
              onChange={(e) => {
                setPasaword(e.target.value);
              }}
              required
              placeholder="Password"
            ></input>
            <Checkbox
              className="d-flex text-light"
              onClick={() => setPassVisible(!passVisible)}
            >
              {passVisible ? "hide password" : "show password"}
            </Checkbox>
          </div>
          {/*  */}
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          &nbsp;&nbsp;
          <Link type="submit" to="/forget-password">
            forget Password?
          </Link>
          <NavLink to="/register" className="nav-link">
            Create New Account
          </NavLink>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
