import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// design
import {
  TextField,
  InputAdornment,
  IconButton,
  OutlinedInput,
  FormControl,
  InputLabel,
  Button,
  FormHelperText,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

// API functions
import { register } from "../api/user";

const Signup = () => {
  const navigate = useNavigate();
  // form states
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // password validation
  let hasSixChar = password.length >= 6;
  let hasLowerChar = /(.*[a-z].*)/.test(password);
  let hasUpperChar = /(.*[A-Z].*)/.test(password);
  let hasNumber = /(.*[0-9].*)/.test(password);
  let hasSpecialChar = /(.*[^a-zA-Z0-9].*)/.test(password);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await register({
        username,
        firstname,
        lastname,
        email,
        password,
      });
      if (res.error) toast.error(res.error);
      else {
        toast.success(res.message);
        // redirect to login page
        navigate("/login");
      }
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="home">
      <div className="container mt-5 col-10 col-sm-8 col-md-6 col-lg-5">
        <div className="text-center mb-5 alert alert-primary">
          <label htmlFor="" className="h2">
            Sign Up
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="username"> Username</label>
          <TextField
            size="small"
            variant="outlined"
            className="form-control mb-3"
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstname"> FirstName</label>
          <TextField
            size="small"
            variant="outlined"
            className="form-control mb-3"
            label="FirstName"
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastname"> LastName</label>
          <TextField
            size="small"
            variant="outlined"
            className="form-control mb-3"
            label="LastName"
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email"> Email</label>
          <TextField
            size="small"
            variant="outlined"
            className="form-control mb-3"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password"> Password</label>
          <FormControl
            variant="outlined"
            size="small"
            className="form-control mb-3"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment>
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {password && (
            <div className="ml-1 mb-3" style={{ columns: 2 }}>
              <div>
                {hasSixChar ? (
                  <span className="text-success">
                    <CheckCircleIcon className="mr-1" fontSize="small" />
                    <small>at least 6 characters</small>
                  </span>
                ) : (
                  <span className="text-danger">
                    <CancelIcon className="mr-1" fontSize="small" />
                    <small>at least 6 characters</small>
                  </span>
                )}
              </div>
              <div>
                <small
                  className={hasLowerChar ? "text-success" : "text-danger"}
                >
                  at least one lowercase character
                </small>
              </div>
              <div>
                {hasUpperChar ? (
                  <span className="text-success">
                    <CheckCircleIcon className="mr-1" fontSize="small" />
                    <small>at least one uppercase character</small>
                  </span>
                ) : (
                  <span className="text-danger">
                    <CancelIcon className="mr-1" fontSize="small" />
                    <small>at least one uppercase character</small>
                  </span>
                )}
              </div>
              <div>
                {hasNumber ? (
                  <span className="text-success">
                    <CheckCircleIcon className="mr-1" fontSize="small" />
                    <small>at least one number</small>
                  </span>
                ) : (
                  <span className="text-danger">
                    <CancelIcon className="mr-1" fontSize="small" />
                    <small>at least one number</small>
                  </span>
                )}
              </div>
              <div>
                {hasSpecialChar ? (
                  <span className="text-success">
                    <CheckCircleIcon className="mr-1" fontSize="small" />
                    <small>at least one special character</small>
                  </span>
                ) : (
                  <span className="text-danger">
                    <CancelIcon className="mr-1" fontSize="small" />
                    <small>at least one special character</small>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="confirmpassword"> Confirm Password</label>
          <TextField
            size="small"
            variant="outlined"
            className="form-control"
            label="Confirm Password"
            type="password"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {password && confirmpassword && (
            <FormHelperText className="ml-1 mt-1">
              {password === confirmpassword ? (
                <span className="text-success">Password does match</span>
              ) : (
                <span className="text-danger">Password does not match</span>
              )}
            </FormHelperText>
          )}
        </div>
        <div className="text-center mt-4">
          <Button
            className="mb-4"
            variant="contained"
            color="primary"
            disabled={
              !email ||
              !password ||
              !confirmpassword ||
              !username ||
              password !== confirmpassword ||
              !hasSixChar ||
              !hasLowerChar ||
              !hasUpperChar ||
              !hasNumber ||
              !hasSpecialChar
            }
            onClick={handleRegister}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
