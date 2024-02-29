import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import { AuthContext } from "../Users/Authprovider";

function AddTask() {
  const [task, setTask] = useState();
  const [title, setTitle] = useState();
  const [taskList, setTaskList] = useState([]);
  const [noteData, setNoteData] = useState([]);
  const { id } = useParams();
  const {getUser} = useContext(AuthContext);
  
  useEffect(() => {
 
  }, []);

  console.log(noteData);

  const handleAddTask = async () => {
    try {

      const data = {
        Title: title,
        Task: task,
        NoteId: id
      };

    
      let config = {
        headers: {
          'Authorization': 'Bearer ' + getUser().token
        }
      }
    
      const response = await axios.post(
        process.env.VITE_BASE_URL + "/tasks/create",
          data,
          config
      );
    
      if (response.status === 201) {
        message.success("Task created successfully");

      } else {
        message.error("Failed to create Task");
      }
    } catch (error) {
      message.error("Failed to create Task. Please try again later.");
      console.error("Error creating Task:", error);
    }
  };

  const handleRemoveTask = async (index) => {
    const updatedTasks = [...taskList];
    updatedTasks.splice(index, 1);
    setTaskList(updatedTasks);
  };
  console.log(taskList);
  const handleSaveTask = async () => {
    try {
      const updatedNote = {
        Tasks: taskList.map((task) => ({
          title: "",
          task: task,
        })),
      };
      console.log(updatedNote);
      await axios.put(`process.env.VITE_BASE_URL + "/notes/task/update/"${id}`, {
        updatedTasks: updatedNote.Tasks,
      });

      message.success("Tasks Added Successfully!");
      // setTaskList([]); // Clear the task list array
    } catch (error) {
      console.error("Error saving tasks:", error);
      message.error("Failed to save tasks. Please try again later.");
    }
  };

  return (
    <>
      <div className="mx-20 mt-16 mb-52 ">
        <h1 className="text-3xl font-bold text-center mb-10">TASK LIST</h1>
        <div className="grid grid-cols-1 md:grid-cols-2   shadow-2xl border-2 border-black ">
          <div className="md:border-r-4 border-b-4 md:ps-10 md:py-5 mx-10 mt-5 md:mx-0 md:mt-0">
            <label className="form-control w-full md:max-w-fit">
              <div className="label">
                <span className="label-text font-bold">Title</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full "
                onChange={(e) => setTitle(e.target.value)}
                value={title} 
              />
            </label>
            <label className="form-control w-full md:max-w-fit">
              <div className="label">
                <span className="label-text font-bold">Task</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full "
                onChange={(e) => setTask(e.target.value)}
                value={task}
              />
            </label>
            <div className="flex justify-center items-center gap-3 mt-5 flex-wrap mb-5 md:mb-0">
              <button
                className="btn bg-customBlue text-white font-semibold"
                onClick={handleAddTask}
              >
                Add Task
              </button>
              <button
                className="btn bg-customPink text-gray font-semibold"
                onClick={handleSaveTask}
              >
                Save Tasks
              </button>
              <Link to={`/Notes/viewNote/${id}`}>
                <button className="btn bg-customOrange text-white font-semibold">
                  Return
                </button>
              </Link>
            </div>
          </div>
          <div className="ps-10 py-5">
            <h1 className="text-3xl font-bold text-center mb-3 italic">
              All Tasks
            </h1>
            <ul className="mx-5">
              {taskList.map((task, index) => (
                <li key={index}>
                  <div className="flex justify-between items-center space-y-2">
                    <h1 className="text-xl font-semibold">{task}</h1>
                    <button
                      className="btn btn-square btn-outline btn-error"
                      onClick={() => handleRemoveTask(index)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddTask;