import { message } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "./Authprovider";

function AdminPage() {
  const [allUser, setAllUser] = useState([]);
  const {getUser} = useContext(AuthContext);

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get("https://officemate-backend.onrender.com/users/all");
      const users = response.data.filter(user => user.role !== "admin");
      setAllUser(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {

    fetchAllUsers();
  // }, [allUser]);
}, []);

  // Function to handle delete button click
  const handleDeleteBtn = async (id) => {
    try {
      const response = await axios.delete(
        `https://officemate-backend.onrender.com/user/delete/${id}`
      );
      if (response.status === 200) {
        message.success("User deleted successfully!");

        //setAllUser(allUser.filter((user) => user.id !== id));
        await fetchAllUsers()
      }
    } catch (error) {
      message.error("Failed to delete user. Please try again later.");
      console.error("Error deleting user:", error);
    }
  };
  return (
    <div>
      <div className="overflow-x-auto mx-10 my-20">
        <h1 className="text-4xl font-bold text-center mb-3">ALL USERS</h1>
        <table className="table table-zebra border-4">
          {/* head */}
          <thead>
            <tr className="font-semibold text-center text-lg">
              <th>No.</th>
              <th>Email Addresses</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allUser.map((user, index) => (
              <tr key={index} className="text-center">
                <th>{index + 1}</th>
                <td className="font-medium">{user.email}</td>
                <td>
                  <button className="btn btn-sm bg-customOrange text-white font-semibold" onClick={() => handleDeleteBtn(user._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
