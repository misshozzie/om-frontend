import { Button, Form, Input, message } from "antd";
import axios from "axios"; // Import axios for making HTTP requests
import { useContext, useEffect, useState } from "react";
import {
  NavLink,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { AuthContext } from "../Authprovider"
import { validateEmail } from '../../../../services/utils';
import SocialLogin from "../SocialLogin";
import { hashDataWithSaltRounds, storeToken } from "../../../../util/security";
import "../Login/Login.css";

function Login() {
  //const LoginForm = () => {
  const { googleSignIn, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const navigation = useNavigation();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
      const response = await axios.post("http://localhost:3000/login", values);
      const { token, auth } = response.data;
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // has the password
      const hashedPassword = hashedPassword(formData.password);
      //make a copy of formData to avoid directly mutating state
      const loginDate = { ...formData, password: hashedPassword };

      //Attempt to login
      const {
        date: { token, user },
      } = await axios.post("http://localhost:3000/login", loginData);

      storeToken(token);
      setUser(user);
      navigate(from, { replace: tru });
      setErrorMessage("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
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
          .post("http://localhost:3000/user", saveUser, {
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
        <div className="bg-customBlue w-full py-5 px-14">
          <h2 className="uppercase text-customBeige text-center mb-4 font-medium text-xl">
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
              className="py-2 text-center username-input placeholder:text-customBlue bg-customPink border-4 rounded-none border-customBeige text-white font-medium"
              placeholder="Enter your email"
              onChange={handleInputChange}
              value={formData.email} required
              
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
              className="py-2 text-center password-input placeholder:text-customBlue bg-customPink border-4 rounded-none border-customBeige text-white font-medium signup-password"
              placeholder="Enter your password"
              onChange={handleInputChange}
              value={formData.password} required
            />
          </Form.Item>
          <div className="flex justify-between items-center sm:ml-20">
            <p className="text-customBeige">
              No Account?&nbsp;
              <NavLink to="/signup" className="text-customBeige">
                Signup here
              </NavLink>
            </p>
            <NavLink href="/forgot-password" className="text-customBeige">
              Forgot Password?
            </NavLink>
          </div>
        </div>
        <div className="flex justify-center items-center mt-6 flex-col">
          <Button
            className="rounded-none bg-customOrange px-10 submit-btn"
            type="primary"
            htmlType="submit"
            onClick={handleInputChange}
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
}

export default Login;
