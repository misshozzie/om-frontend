import { Button, message } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Users/Authprovider";
import { useContext } from "react";

function ViewNote(){
    const [noteData, setNoteData] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const from = "/Notes";
    const {getUser} = useContext(AuthContext)

    useEffect(() => {
      const fetchNote = async () => {
        try {
          let config = {
            headers: {
              'Authorization': 'Bearer ' + getUser().token
            }
          }
          const response = await axios.get(`process.env.VITE_BASE_URL + "/notes/one/"${id}`,config);
          console.log(response.data);
          setNoteData(response.data);
        } catch (error) {
          console.error("Error fetching notes:", error);
        }
      };
  
      fetchNote();
      }, []);
    
      const handleDeleteBtn = async () => {
        try {
          // Send a DELETE request to the server route with the note ID
          const response = await axios.delete(`process.env.VITE_BASE_URL + "/notes/"${id}`);
          if (response.status === 200) {
            // If the deletion is successful, you can perform additional actions if needed
            message.success("Note deleted successfully!");
            navigate(from, { replace: true });
    
            // Optionally, you can navigate to another page or update the UI
          }
        } catch (error) {
          message.error("Error deleting note");
          console.error(error);
          // Handle errors if the deletion fails
        }
      };
      console.log(noteData);
      const handleDeleteTaskBtn = async (taskId) => {
        // console.log(taskId);
        try {
          // Send a DELETE request to the server route with the note ID
          const response = await axios.delete(`process.env.VITE_BASE_URL +" /tasks/"${taskId}`);
          if (response.status === 200) {
            // If the deletion is successful, you can perform additional actions if needed
            message.success("Task deleted successfully!");
            navigate(from, { replace: true });
    
            // Optionally, you can navigate to another page or update the UI
          }
        } catch (error) {
          message.error("Error deleting Task");
          console.error(error);
          // Handle errors if the deletion fails
        }
      };
      console.log(noteData);
      return (
        <div className="mx-20 mt-10 mb-[28vh]">
          <div className="flex justify-end">
            <Link to={`/Notes/addTask/${id}`}>
              <button className="btn bg-customOrange text-white font-semibold mb-9">
                Add Task +
              </button>
            </Link>
          </div>
          <div className="card  shadow-2xl border-4 border-customBlue">
            <div className="grid grid-cols-1 md:grid-cols-2 ">
              <div className="md:border-r-4 border-b-4">
                <div className="card-body">
                  <h2 className="text-4xl font-bold">{noteData?.Title}</h2>
                  <p>{noteData?.Date}</p>
                  <p className="font-semibold">Description:</p>
                  <p>{noteData?.Description}</p>
                </div>
                <div className="card-actions justify-start mb-5 ms-5">
                  <Link
                    to={{
                      pathname: `/Notes/updateNote/${noteData._id}`,
                      state: { from: "/Notes/viewNote" },
                    }}
                  >
                    <button className="btn bg-customBlue text-white">Update</button>
                  </Link>
    
                  <button
                    className="btn bg-customOrange text-white"
                    onClick={handleDeleteBtn}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div>
                <div className="card-body">
                  <h2 className="text-xl font-bold text-center">Tasks:</h2>
                  <ul style={{ listStyle: "circle" }} className="ml-5">
                    {noteData?.Tasks?.map((val, index) => (
                      <li style={{margin: 2}} key={index}> 
                      <h3 className="text-l font-bold">{val.title}</h3>
                      
                      {val.task}

                      &nbsp;
                      &nbsp;
                      <button
                      className="btn  btn-circle bg-customOrange text-white text-xs"
                      onClick={() => {handleDeleteTaskBtn(val._id)}}
                      >
                        X
                      </button>
                      </li> 
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };
    
    export default ViewNote;
    