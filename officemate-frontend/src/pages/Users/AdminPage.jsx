import { message } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";

function AdminPage() {
  const [allUser, setAllUser] = useState([]);

  useEffect(() => {
    // Function to fetch all users from the server
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user");
        setAllUser(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchAllUsers();
  }, [allUser]);

  // Function to handle delete button click
  const handleDeleteBtn = async (id) => {
    try {
      // Send a DELETE request to delete the user with the specified ID
      const response = await axios.delete(
        `http://localhost:3000/user/delete/${id}`
      );

      // Check if the deletion was successful
      if (response.status === 200) {
        // If successful, display a success message
        message.success("User deleted successfully!");

        // Update the user list after deletion
        setAllUser(allUser.filter((user) => user.id !== id));
      }
    } catch (error) {
      // If an error occurs, display an error message
      message.error("Failed to delete user. Please try again later.");
      console.error("Error deleting user:", error);
    }
  };
  return (
    <div>
      <div className="overflow-x-auto mx-10 my-20">
        <h1 className="text-4xl font-bold text-center mb-3">All USER HERE</h1>
        <table className="table table-zebra border-4">
          {/* head */}
          <thead>
            <tr className="font-semibold text-center text-lg">
              <th>SL</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allUser.map((user, index) => (
              <tr key={index} className="text-center">
                <th>{index + 1}</th>
                <td className="font-medium">{user.email}</td>
                <td>
                  <button className="btn btn-sm btn-error text-white font-semibold" onClick={() => handleDeleteBtn(user._id)}>
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
