import {  DatePicker, Form, Input, message } from "antd";
import Lottie from "lottie-react";
import update from "../../../assets/styles/update notes.json";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Users/Authprovider";
import { useContext } from "react";


function UpdateNote() {
  const [selectedDate, setSelectedDate] = useState("");
  const [noteData, setNoteData] = useState([]);
  const {getUser} = useContext(AuthContext)

  const { id } = useParams();


  useEffect(() => {
    const fetchNote = async () => {
      try {
        let config = {
          headers: {
            'Authorization': 'Bearer ' + getUser().token
          }
        }
        const response = await axios.get(`http://localhost:3000/notes/one/${id}`,config);
        console.log(response.data);
        setNoteData(response.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNote();
  }, []);

  const dateChange = (date, dateString) => {
    setSelectedDate(dateString);
  };

  const onFinish = async (values) => {
    console.log(values)
    try {
        const data = {
          Title: values?.Title || noteData.Title,
          Date: selectedDate && selectedDate || noteData.Date,
          Description: values?.Description || noteData.Description,
          Calendar: noteData.Calendar,
          Tasks: noteData.Tasks
        }
        let config = {
          headers: {
            'Authorization': 'Bearer ' + getUser().token
          }
        }
        console.log(data);
        const response = await axios.patch(
          `http://localhost:3000/notes/${id}`,
          data,
          config
        );

        console.log(response)
        if (response.status === 200) {
          message.success("Note updated successfully!");
          // Optionally, you can navigate to another page or update the UI
        }
      } catch (error) {
        message.error("Error updating note");
        console.error(error);
        // Handle errors if the update fails
      }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex my-16 items-center justify-evenly mx-16 p-10">
      <div>
        <h1 className="text-3xl font-bold text-center mb-6 italic">
          UPDATE NOTE
        </h1>
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          size="large"
        >
          <Form.Item
            label="Title"
            name="Title"
          >
            <Input placeholder={noteData.Title}/>
          </Form.Item>

          <Form.Item
            label="Date"
            name="Date"
          >
            <DatePicker
              onChange={dateChange}
              size={"large"}
              placeholder={noteData.Date}
            />
          </Form.Item>

          <Form.Item
            label="Description"
            name={"Description"}
          >
            <Input.TextArea placeholder={noteData.Description}/>
          </Form.Item>

          <div className="flex gap-2 justify-center">
            <Link to="/Notes">
              <button
                className="btn btn-wide bg-customBlue text-white"
                id="customizeBtn"
              >
                View Note
              </button>
            </Link>
            <Form.Item>
              <button 
                type="submit"
                className="btn btn-wide bg-customOrange text-white"
              >
                Update Note
              </button>
            </Form.Item>
          </div>
        </Form>
      </div>
      <Lottie
        animationData={update}
        loop={true}
        style={{ width: "400px", height: "auto" }}
      />
    </div>
  );
};

export default UpdateNote;
