import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../App";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";

const Home = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  //   state for error
  const [error, setError] = useState(false);

  //   to render login/register section
  const [pageType, setPageType] = useState("login");

  //   state to handle login data
  const [loginData, setLogin] = useState({
    email: "",
    password: "",
    type: "",
  });

  //   state to handle registration data
  const [regData, setReg] = useState({
    name: "",
    email: "",
    password: "",
    type: "",
  });

  //   function will save form data on change
  const handleChange = (event) => {
    pageType === "login"
      ? setLogin({ ...loginData, [event.target.name]: event.target.value })
      : setReg({ ...regData, [event.target.name]: event.target.value });
  };

  //   function to handle login
  const login = async (event) => {
    event.preventDefault();
    let data;
    await axios
      // .post(`http://localhost:5001/login`, {
      .post(`https://class-slot-book.onrender.com/login`, {
        email: String(loginData.email),
        password: String(loginData.password),
        type: String(loginData.type),
      })
      .then(
        (res) => (data = res.data),
        (err) => setError(true)
      );
    if (data) {
      setLogin({
        email: "",
        password: "",
        type: "",
      });
      setUser(data);
      navigate("/dashboard");
    }
  };

  //   function to handle registration
  const register = async (event) => {
    event.preventDefault();
    await axios
      // .post(`http://localhost:5001/register`, {
      .post(`https://class-slot-book.onrender.com/register`, {
        name: String(regData.name),
        email: String(regData.email),
        password: String(regData.password),
        type: String(regData.type),
      })
      .then(
        (res) => res.data,
        (err) => console.log(err)
      );
    setReg({
      name: "",
      email: "",
      password: "",
      type: "",
    });
    setPageType("login");
  };

  return (
    <>
      {/* if user wants to login then render this section */}
      {pageType === "login" && (
        <Box
          id="login-box"
          width="50%"
          p="2rem"
          m="2rem auto"
          borderRadius="1.5rem"
          sx={{ boxShadow: "0px 1px 15px #858585" }}
        >
          <Typography
            fontWeight="700"
            variant="h4"
            sx={{ textAlign: "center", mb: "1.5rem" }}
          >
            Login
          </Typography>
          {error && (
            <p
              id="error"
              style={{
                color: "red",
                marginBottom: "10px",
                textAlign: "center",
              }}
            >
              Invalid username / password
            </p>
          )}
          <form onSubmit={login}>
            <Box display="grid">
              {/* Email */}
              <TextField
                type="email"
                name="email"
                onChange={handleChange}
                value={loginData.email}
                label="* Email"
                sx={{
                  gridColumn: "span 4",
                }}
                required
              />

              {/* Password */}
              <TextField
                type="password"
                name="password"
                onChange={handleChange}
                value={loginData.password}
                label="* Password"
                sx={{
                  marginY: "1rem",
                  gridColumn: "span 4",
                }}
                required
              />

              {/* Select Login As student/Teacher */}
              <FormControl sx={{ gridColumn: "span 4" }}>
                <InputLabel id="demo-simple-select-label">I am</InputLabel>
                <Select
                  label="I am"
                  labelId="demo-simple-select-label"
                  name="type"
                  onChange={handleChange}
                  value={loginData.type}
                  required
                >
                  <MenuItem value="student">Student</MenuItem>
                  <MenuItem value="teacher">Teacher</MenuItem>
                </Select>

                {/* login Button */}
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{ marginY: "1rem" }}
                >
                  Login
                </Button>
              </FormControl>
            </Box>
          </form>

          <Typography
            onClick={() => {
              setPageType("register");
            }}
            sx={{
              width: "100px",
              color: "#002884",
              textDecoration: "underline",
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            Register here
          </Typography>
        </Box>
      )}

      {/* if user wants to register then render this section */}

      {pageType === "register" && (
        <Box
          id="login-box"
          width="50%"
          p="2rem"
          m="2rem auto"
          borderRadius="1.5rem"
          sx={{ boxShadow: "0px 1px 15px #858585" }}
        >
          <Typography
            fontWeight="700"
            variant="h4"
            sx={{ textAlign: "center", mb: "1.5rem" }}
          >
            Register
          </Typography>
          <form onSubmit={register}>
            <Box display="grid">
              <TextField
                type="text"
                name="name"
                onChange={handleChange}
                value={regData.name}
                label="* Name"
                sx={{
                  marginY: "1rem",
                  gridColumn: "span 4",
                }}
                required
              />
              <TextField
                type="text"
                name="email"
                onChange={handleChange}
                value={regData.email}
                label="* Email"
                sx={{
                  gridColumn: "span 4",
                }}
                required
              />
              <TextField
                type="password"
                name="password"
                onChange={handleChange}
                value={regData.password}
                label="* Password"
                sx={{
                  marginY: "1rem",
                  gridColumn: "span 4",
                }}
                required
              />
              <FormControl sx={{ gridColumn: "span 4" }}>
                <InputLabel id="demo-simple-select-label">I am</InputLabel>
                <Select
                  label="I am"
                  labelId="demo-simple-select-label"
                  name="type"
                  onChange={handleChange}
                  value={regData.type}
                  required
                >
                  <MenuItem value="student">Student</MenuItem>
                  <MenuItem value="teacher">Teacher</MenuItem>
                </Select>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{ marginY: "1rem" }}
                >
                  Register
                </Button>
              </FormControl>
            </Box>
          </form>

          <Typography
            onClick={() => {
              setPageType("login");
            }}
            sx={{
              width: "100px",
              color: "#002884",
              textDecoration: "underline",
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            Login here
          </Typography>
        </Box>
      )}
    </>
  );
};

export default Home;
