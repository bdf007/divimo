import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";

const UserManagement = () => {
  const { user } = useContext(UserContext);
  const [listOfUsers, setListOfUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [updateUsername, setUpdateUsername] = useState("");
  const [updateFirstname, setUpdateFirstname] = useState("");
  const [updateLastname, setUpdateLastname] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [updateRole, setUpdateRole] = useState("");

  // get all users
  const getListOfUsers = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/users`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          withCredentials: true,
        }
      );
      setListOfUsers(res.data);
    } catch (error) {
      toast.error("Error during fetching users", error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/user/update/${editUser._id}`,
        {
          username: updateUsername,
          firstname: updateFirstname,
          lastname: updateLastname,
          email: updateEmail,
          role: updateRole,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      setEditUser(null); // Ferme le formulaire après la mise à jour
      getListOfUsers(); // Actualise la liste des utilisateurs
    } catch (error) {
      toast.error(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/user/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      getListOfUsers();
    } catch (error) {
      toast.error(error);
    }
  };

  const handleEditClick = (userlist) => {
    setEditUser(userlist);
    setUpdateUsername(userlist.username);
    setUpdateFirstname(userlist.firstname);
    setUpdateLastname(userlist.lastname);
    setUpdateEmail(userlist.email);
    setUpdateRole(userlist.role);
  };

  useEffect(() => {
    getListOfUsers();
  });

  return (
    <div className="container mt-5">
      <h1>Liste des utilisateurs</h1>
      <div className="row">
        {!editUser &&
          listOfUsers.map((userlist) => (
            <div className="col-md-6 col-lg-4 mb-4" key={userlist._id}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{userlist.username}</h5>
                  <p className="card-text">
                    <strong>Firstname: </strong> {userlist.firstname} <br />
                    <strong>Lastname: </strong> {userlist.lastname} <br />
                    <strong>Email: </strong> {userlist.email} <br />
                    <strong>Role: </strong> {userlist.role}
                  </p>
                  {(user.role === "admin" || user.role === "superadmin") && (
                    <div>
                      {userlist.role === "user" && (
                        <button
                          className="btn btn-danger btn-sm me-2"
                          onClick={() => deleteUser(userlist._id)}
                        >
                          Delete
                        </button>
                      )}
                      {userlist.role !== "superadmin" && (
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleEditClick(userlist)}
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>

      {editUser && (
        <div className="edit-form mt-4">
          <h3>Edit User</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateUser();
            }}
          >
            <div className="row">
              <div className="form-group col-md-6">
                <label>Username</label>
                <input
                  type="text"
                  value={updateUsername}
                  onChange={(e) => setUpdateUsername(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="form-group col-md-6">
                <label>First Name</label>
                <input
                  type="text"
                  value={updateFirstname}
                  onChange={(e) => setUpdateFirstname(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label>Last Name</label>
                <input
                  type="text"
                  value={updateLastname}
                  onChange={(e) => setUpdateLastname(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="form-group col-md-6">
                <label>Email</label>
                <input
                  type="email"
                  value={updateEmail}
                  onChange={(e) => setUpdateEmail(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label>Role</label>
                <select
                  value={updateRole}
                  onChange={(e) => setUpdateRole(e.target.value)}
                  className="form-control"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="superadmin">Superadmin</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-success mt-3">
              Save Changes
            </button>
            <button
              className="btn btn-secondary mt-3 ms-2"
              onClick={() => setEditUser(null)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
