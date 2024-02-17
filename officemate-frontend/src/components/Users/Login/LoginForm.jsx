import { Button, Form, Input, message } from "antd";
import axios from "axios"; // Import axios for making HTTP requests
import { useContext, useEffect, useState } from "react";
import {
  NavLink,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { AuthContext } from "../Authprovider";
import { validateEmail } from "../../../services/utils";
import SocialLogin from "../SocialLogin/SocialLogin";
import "../Login/LoginStyle.css";

const Login = () => {
  const { googleSignIn, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const navigation = useNavigation();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
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
    // Call the fetchAllUsers function when the component mounts
    fetchAllUsers();
  }, []); // Empty dependency array ensures that this effect runs only once, on component mount

  if (navigation.state === "loading") {
    return <progress className="progress w-56"></progress>;
  }

  const onFinish = async (values) => {
    try {
      const response = await axios.post("http://localhost:5000/login", values);
      const { token,auth } = response.data;
      localStorage.setItem("token", token);
      
      // Assuming allUser is available in scope
      const foundUser = allUser.find((u) => u.email === values.email);
      setUser(foundUser);

      message.success("Login successful"); // Display success message

      navigate("/"); // Redirect to home page after successful login
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleGoogle = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        const saveUser = {
          username: user.displayName,
          email: user.email,
          role: "user",
          password: "",
        };

        axios
          .post("http://localhost:5000/user", saveUser, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then(() => {
            message.success("Login successful"); // Display success message
            navigate(from, { replace: true });
          })
          .catch((error) => {
            console.error("Error posting user data:", error);
          });
      })
      .catch((error) => {
        console.error("Google sign-in error:", error.message);
      });
  };
  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center overflow-auto">
      <Form
        name="basic"
        labelCol={{
          span: 4,
          className:
            "form-label text-xl font-medium flex justify-start items-center",
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="w-full"
      >
        <div className="bg-black w-full py-5 px-14">
          <h2 className="uppercase text-white text-center mb-4 font-medium text-xl">
            Login
          </h2>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                validator: (rule, value) => {
                  if (!validateEmail(value)) {
                    return Promise.reject(
                      "Please input a valid email address!"
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input
              className="py-2 text-center username-input placeholder:text-white bg-[#a5a5a5] border-4 rounded-none border-[#434343] text-white font-medium"
              placeholder="Enter your username"
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            className="mb-3"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              className="py-2 text-center password-input bg-[#a5a5a5] border-4 rounded-none border-[#434343] text-white font-medium signup-password"
              placeholder="Enter your password"
            />
          </Form.Item>
          <div className="flex justify-between items-center sm:ml-20">
            <p className="text-white">
              No Account?&nbsp;
              <NavLink to="/signup" className="text-white">
                Signup here
              </NavLink>
            </p>
            <NavLink href="/forgot-password" className="text-white">
              Forgot Password?
            </NavLink>
          </div>
        </div>
        <div className="flex justify-center items-center mt-6 flex-col">
          <Button
            className="rounded-none bg-black px-10 submit-btn"
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
          <SocialLogin.Google
            onClick={handleGoogle}
            className="mt-5"
            title="Sign in with Google"
          />
        </div>
      </Form>
    </div>
  );
};

export default Login;