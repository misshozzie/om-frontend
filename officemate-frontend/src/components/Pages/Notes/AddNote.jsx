import { Checkbox, DatePicker, Form, Input, message } from "antd";
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import addnotes from "../../../assets/styles/addnotes.json";
import { useContext } from "react";
import { AuthContext } from "../../../components/Pages/Users/Authprovider";

function AddNote({ setRender, render }) {
  const { getUser } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState("");
  //const [formState, setFormState] = useState({});
  //const [disabled, setDisabled] = useState(true);
  //const [errors, setErrors] = useState({});
  

  const navigate = useNavigate();

  let query = new URLSearchParams(window.location.search);
  let username = query.get("username");

  const dateChange = (date, dateString) => {
    setSelectedDate(dateString);
  };

  const onFinish = async (values) => {
    try {
      const { title, user, calendar } = values;

      const newNote = {
        Title: title,
        Date: selectedDate,
        Description: user.description,
        isEvent: calendar,
        Tasks: [],
      };
      console.log(newNote);

      let config = {
        headers: {
          Authorization: "Bearer " + getUser().token,
        },
      };

      const response = await axios.post(
        //"https://officemate-backend.onrender.com/notes/create",
        import.meta.env.VITE_BASE_URL + "/notes/create",
        newNote,
        config
      );

      if (response.status === 201) {
        message.success("Note created successfully");
      } else {
        message.error("Failed to create note");
      }
    } catch (error) {
      message.error("Failed to create note. Please try again later.");
      console.error("Error creating note:", error);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex my-16 items-center justify-evenly mx-16 p-10">
      <div>
        <h1 className="text-3xl font-bold text-center mb-6 italic">
          ADD NOTES
        </h1>
        <Form
          name="basic"
          initialValues={{
            calendar: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Input Title here!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Date"
            name="DatePicker"
            rules={[
              {
                required: true,
                message: "Please input Date!",
              },
            ]}
          >
            <DatePicker
              onChange={dateChange}
              size={"large"}
              placeholder="Search by Date"
            />
          </Form.Item>

          <Form.Item
            label="Description"
            name={["user", "description"]}
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="calendar" valuePropName="checked">
            <Checkbox>Add to Calendar view</Checkbox>
          </Form.Item>

          <div className="flex gap-2 justify-center">
            <Link to="/Notes">
              <button
                className="btn btn-wide bg-customBlue text-white"
                id="customizeBtn"
              >
                Return
              </button>
            </Link>
            <Form.Item>
              <button
                type="submit"
                className="btn btn-wide bg-customOrange text-white"
              >
                Create Note
              </button>
            </Form.Item>
          </div>
        </Form>
      </div>
      <Lottie
        animationData={addnotes}
        loop={true}
        style={{ width: "400px", height: "auto" }}
      />
    </div>
  );
}

export default AddNote;
