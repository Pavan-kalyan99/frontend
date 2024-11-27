import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import "./AuthStyles.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [answer, setanswer] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const submitHand = async (e) => {
    e.preventDefault();
    try {
      const res = await axios({
        method: "POST",
        url: "/api/auth/register",
        data: {
          name,
          email,
          password,
          answer,
          phone,
        },
      });
      if (res && res.data.success) {
        // await toast.success(res.data && res.data.message);
        await toast.success("successfully registered");
        setTimeout(navigate("/login"), 50000000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <Layout title={"Register| E-store"}>
      <div className="form-cointainer">
        <form
          onSubmit={submitHand}
          className="p-2"
          style={{
            width: "75%",
            border: "2px solid black",
            borderRadius: "10px",
          }}
        >
          <h1 className="title">Register form</h1>

          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              minLength="4"
              maxlength="10"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
              autoFocus
              placeholder="Name "
              id="exampleInputName"
            />
          </div>

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
              placeholder="Enter mail"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>

          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              minLength="5"
              maxlength="10"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPhone" className="form-label">
              Phone
            </label>
            <input
              type="text"
              className="form-control"
              pattern="\d*"
              onKey
              minlength="10"
              maxLength="11"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              required
              placeholder="Enter Phone Number"
              id="exampleInputPhone"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
