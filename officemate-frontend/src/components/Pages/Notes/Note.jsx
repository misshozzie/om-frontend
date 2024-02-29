import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import LogoImage from "../../../assets/images/omlogo2.png";
import { useContext } from "react";
import { AuthContext } from "../Users/Authprovider";


function Note() {
  const [allNotes, setAllNotes] = useState([]);
  const {getUser} = useContext(AuthContext)

  const fetchNotes = async () => {
    try {
      let config = {
        headers: {
          'Authorization': 'Bearer ' + getUser().token
        }
      }
      //const response = await axios.get("https://officemate-backend.onrender.com/notes/all",config);
      const response = await axios.get(import.meta.env.VITE_BASE_URL + "/notes/all", config);
      console.log(response.data);
      setAllNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };
  useEffect(() => {
    fetchNotes();
  }, []);


  const handleDeleteBtn = async (id) => {
    try {
      let config = {
        headers: {
          'Authorization': 'Bearer ' + getUser().token
        }
      }
      // Send a DELETE request to the server route with the note ID
      //const response = await axios.delete(`https://officemate-backend.onrender.com/notes/${id}`,config);
      //const response = await axios.delete(`process.env.VITE_BASE_URL + "/notes/"${id}`,config);
      const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/notes/${id}`, config);

      if (response.status === 200) {

        // If the deletion is successful, you can perform additional actions if needed
        message.success("Note deleted successfully!");
        await fetchNotes()
      }
    } catch (error) {
      message.error("Error deleting note");
      console.error(error);
      // Handle errors if the deletion fails
    }
  };

  return (
    <div className="mx-10 mt-10 mb-60">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <img src={LogoImage} alt="OfficeMate Logo" />
        </h1>
        <Link to="/Notes/addNote">
          <button className="btn bg-customOrange text-white font-semibold">
            Add Notes +
          </button>
        </Link>
      </div>
      <div className="flex flex-wrap items-center mt-10 gap-3">
        {allNotes.map((note, index) => (
          <div
            key={index}
            className="card w-80 bg-customBlue text-primary-content"
          >
            <div className="card-body text-center">
              <h2 className="text-xl font-semibold text-black">{note.Title}</h2>
              <p className="text-black font-medium">{note.Date.split('T')[0]}</p>
              <div className="card-actions justify-center flex-wrap mt-5">
                <Link to={`/Notes/viewNote/${note._id}`}>
                  <button className="btn bg-customBeige text-black">View</button>
                </Link>
                <Link
                  to={{
                    pathname: `/Notes/updateNote/${note._id}`,
                    state: { from: "/Notes" },
                  }}
                >
                  <button className="btn bg-customPink text-grey">Edit</button>
                </Link>

                <button
                  className="btn bg-customOrange text-white"
                  onClick={() => handleDeleteBtn(note._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Note;
