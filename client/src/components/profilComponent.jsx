import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { getUser } from "../api/user";

//design
import {
  TextField,
  InputAdornment,
  IconButton,
  OutlinedInput,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const ProfilComponent = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [updateUsername, setUpdateUsername] = useState("");
  const [updateFirstname, setUpdateFirstname] = useState("");
  const [updateLastname, setUpdateLastname] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [updatePassword, setUpdatePassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordModified, setIsPasswordModified] = useState(false);

  // password validation
  let hasSixChar = updatePassword && updatePassword.length >= 6;
  let hasLowerChar = /(.*[a-z].*)/.test(updatePassword);
  let hasUpperChar = /(.*[A-Z].*)/.test(updatePassword);
  let hasNumber = /(.*[0-9].*)/.test(updatePassword);
  let hasSpecialChar = /(.*[^a-zA-Z0-9].*)/.test(updatePassword);

  const handleUsernameChange = (e) => {
    setUpdateUsername(e.target.value);
  };

  const handleFirstnameChange = (e) => {
    setUpdateFirstname(e.target.value);
  };

  const handleLastnameChange = (e) => {
    setUpdateLastname(e.target.value);
  };

  const handleEmailChange = (e) => {
    setUpdateEmail(e.target.value);
  };

  const handleUpdatedPassword = (e) => {
    e.preventDefault();
    setUpdatePassword(e.target.value);
    if (updatePassword !== user.password) {
      setIsPasswordModified(true);
    } else {
      setIsPasswordModified(false);
    }
    setShowPassword(false);
  };

  const handleConfirmUpdatedPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/profile/${user._id}`,
        {
          username: updateUsername,
          firstname: updateFirstname,
          lastname: updateLastname,
          email: updateEmail,
          password: updatePassword,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      setIsEditing(false);
      getUser();
      if (res.data.message === "User profile updated successfully") {
        navigate("/");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  // populate user data
  useEffect(() => {
    if (user) {
      setUpdateUsername(user.username);
      setUpdateFirstname(user.firstname);
      setUpdateLastname(user.lastname);
      setUpdateEmail(user.email);
      setUpdatePassword(user.password);
    }
  }, [user]);

  // get the info of the logged in user
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUser();
        if (res.error) toast(res.error);
        else setUser(res);
      } catch (err) {
        toast(err);
      }
    };
    fetchData();
  }, [setUser]);

  return (
    <div className="profil">
      <div className="container mt-5 col-10 col-sm-8 col-md-6 col-lg-5">
        <div className="text-center mb-5 alert alert-primary">
          <label htmlFor="" className="h2">
            Profil
          </label>
        </div>
        {!user ? (
          <div className="form-group mb-3">
            <p>
              Vous n'êtes pas connecté. Connectez-vous pour accéder à votre
              profil.
            </p>
          </div>
        ) : (
          <div className="form-group mb-3">
            <p>
              Vous êtes connecté en tant que <strong>{user.username}</strong>{" "}
              avec le rôle <strong>{user.role}</strong>.
            </p>
            {isEditing === false && (
              <button
                className="btn btn-success"
                onClick={() => setIsEditing(true)}
              >
                modifier mes infos
              </button>
            )}
            {isEditing && (
              <>
                <div className="container mt-5 col-10 col-sm-8 col-md-6 col-lg-5">
                  <div className="form-group">
                    <TextField
                      size="small"
                      variant="outlined"
                      className="form-control mb-3"
                      label="Firstname"
                      value={updateUsername}
                      onChange={handleUsernameChange}
                    />
                  </div>
                  <div className="form-group">
                    <TextField
                      size="small"
                      variant="outlined"
                      className="form-control mb-3"
                      label="Firstname"
                      value={updateFirstname}
                      onChange={handleFirstnameChange}
                    />
                  </div>
                  <div className="form-group">
                    <TextField
                      size="small"
                      variant="outlined"
                      className="form-control mb-3"
                      label="Lastname"
                      value={updateLastname}
                      onChange={handleLastnameChange}
                    />
                  </div>
                  <div className="form-group">
                    <TextField
                      size="small"
                      variant="outlined"
                      className="form-control mb-3"
                      label="Email"
                      value={updateEmail}
                      onChange={handleEmailChange}
                    />
                  </div>
                  <div className="form-group">
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
                        type={
                          isPasswordModified
                            ? showPassword
                              ? "text"
                              : "password"
                            : "password"
                        }
                        value={updatePassword}
                        onChange={handleUpdatedPassword}
                        endAdornment={
                          isPasswordModified ? ( // Check if the password is being modified
                            <InputAdornment>
                              <IconButton
                                edge="end"
                                onClick={handleShowPassword}
                              >
                                {showPassword ? (
                                  <VisibilityIcon />
                                ) : (
                                  <VisibilityOffIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ) : null // Hide the toggle button when the password is not being modified
                        }
                      />
                    </FormControl>
                    {updatePassword && (
                      <div className="ml-1 mb-3" style={{ columns: 2 }}>
                        <div>
                          {hasSixChar ? (
                            <span className="text-success">
                              <CheckCircleIcon
                                className="mr-1"
                                fontSize="small"
                              />
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
                            className={
                              hasLowerChar ? "text-success" : "text-danger"
                            }
                          >
                            at least one lowercase character
                          </small>
                        </div>
                        <div>
                          {hasUpperChar ? (
                            <span className="text-success">
                              <CheckCircleIcon
                                className="mr-1"
                                fontSize="small"
                              />
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
                              <CheckCircleIcon
                                className="mr-1"
                                fontSize="small"
                              />
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
                              <CheckCircleIcon
                                className="mr-1"
                                fontSize="small"
                              />
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
                    <p>merci de confirmer votre mot de passe pour valider</p>
                    <TextField
                      size="small"
                      variant="outlined"
                      className="form-control"
                      label="Confirm Password"
                      type="password"
                      value={confirmPassword}
                      onChange={handleConfirmUpdatedPassword}
                    />
                    {updatePassword && confirmPassword && (
                      <FormHelperText className="ml-1 mt-1">
                        {updatePassword === confirmPassword ? (
                          <span className="text-success">
                            Password does match
                          </span>
                        ) : (
                          <span className="text-danger">
                            Password does not match
                          </span>
                        )}
                      </FormHelperText>
                    )}
                  </div>
                </div>

                <div className="text-center mt-4">
                  <button
                    className="btn btn-warning mb-4"
                    onClick={() => setIsEditing(false)}
                  >
                    annuler
                  </button>
                  <button
                    className=" btn btn-success mb-4"
                    disabled={
                      !updateEmail ||
                      !updatePassword ||
                      !confirmPassword ||
                      !updateUsername ||
                      !updateFirstname ||
                      !updateLastname ||
                      updatePassword !== confirmPassword ||
                      !hasSixChar ||
                      !hasLowerChar ||
                      !hasUpperChar ||
                      !hasNumber ||
                      !hasSpecialChar
                    }
                    onClick={handleUpdateUser}
                  >
                    Modifier
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilComponent;
