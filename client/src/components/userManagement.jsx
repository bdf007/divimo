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

  // Remplit les champs d'édition avec les données de l'utilisateur sélectionné
  const handleEditClick = (userlist) => {
    setEditUser(userlist); // Définit l'utilisateur en cours d'édition
    setUpdateUsername(userlist.username);
    setUpdateFirstname(userlist.firstname);
    setUpdateLastname(userlist.lastname);
    setUpdateEmail(userlist.email);
    setUpdateRole(userlist.role);
  };

  useEffect(() => {
    getListOfUsers();
  }, []);

  return (
    <div className="container mt-5">
      <h1>Liste des utilisateurs</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Username</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {listOfUsers.map((userlist) => (
            <tr key={userlist._id}>
              <td>{userlist.username}</td>
              <td>{userlist.firstname}</td>
              <td>{userlist.lastname}</td>
              <td>{userlist.email}</td>
              <td>{userlist.role}</td>
              {(user.role === "admin" || user.role === "superadmin") && (
                <>
                  <td>
                    {userlist.role === "user" && (
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteUser(userlist._id)}
                      >
                        Delete
                      </button>
                    )}
                    <button
                      className="btn btn-warning"
                      onClick={() => handleEditClick(userlist)}
                    >
                      Edit
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {editUser && (
        <div className="edit-form">
          <h3>Edit User</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault(); // Empêche le rechargement de la page
              handleUpdateUser(); // Appelle la fonction de mise à jour
            }}
          >
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={updateUsername}
                onChange={(e) => setUpdateUsername(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                value={updateFirstname}
                onChange={(e) => setUpdateFirstname(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                value={updateLastname}
                onChange={(e) => setUpdateLastname(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={updateEmail}
                onChange={(e) => setUpdateEmail(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
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

            <button type="submit" className="btn btn-success">
              Save Changes
            </button>
            {/* Bouton pour annuler l'édition */}
            <button
              className="btn btn-secondary"
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
