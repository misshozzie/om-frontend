import { useContext } from "react";
import { AuthContext } from "../Users/Authprovider";
import axios from "axios"; // Import axios for making HTTP requests
import {
  NavLink,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { validateEmail } from "../../../services/utils"
import SocialLogin from "../Users/SocialLogin";
import "../../../index.css";

function Signup() {
  const { googleSignIn, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  //const navigation = useNavigation();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  // if (navigation.state === "loading") {
  //   return <progress className="progress w-56"></progress>;
  // }
  const onFinish = async (values) => {
    const defaultUser = {
      role: "user",
    };

    const userData = {
      ...defaultUser,
      ...values,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/signup",
        userData
      );
      console.log(response);

      // Set the user in AuthContext after successful signup
      setUser(response.data.user);

      // Display success message using Ant Design message component
      message.success("Signup successful");
      navigate('/login', { replace: true });
    } catch (error) {
      console.error("Signup failed:", error?.response?.data?.error);
      // Display error message using Ant Design message component
      message.error("Failed to signup. Please try again later.");
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
            message.error("Failed to process Google sign-in. Please try again later.");
          });
      })
      .catch((error) => {
        console.error("Google sign-in error:", error.message);
        message.error("Google sign-in failed. Please try again.");
      });
  };

  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center overflow-auto">
      <Form
        name="basic"
        labelCol={{
          span: 6,
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
          <h2 className="uppercase text-white text-center mb-4 font-medium text-xl">
            Signup
          </h2>
          <Form.Item
            label="Username"
            name="username"
            className="mb-4"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input
              className="py-2 text-center username-input placeholder:text-customBlue bg-customPink border-4 rounded-none border-customBeige text-white font-medium"
              placeholder="Enter your username"
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            className="mb-4"
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
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            className="mb-4"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              className="py-2 text-center password-input bg-customPink border-4 rounded-none border-customBeige text-customBlue font-medium signup-password"
              placeholder="Enter your password"
            />
          </Form.Item>
          <Form.Item
            label="Confirm"
            name="confirmPassword"
            className="mb-3"
            rules={[
              {
                required: true,
                message: "Re-input your password!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  );
                },
              }),
            ]}
          >
            <Input.Password
              className="py-2 text-center password-input bg-[#a5a5a5] border-4 rounded-none border-[#434343] text-white font-medium signup-password"
              placeholder="Confirm your password"
            />
          </Form.Item>
          <div className="flex justify-between items-center sm:ml-20">
            <p className="text-white">
              Already member?&nbsp;
              <NavLink to="/login" className="text-white">
                Login here
              </NavLink>
            </p>
            <NavLink href="/forgot-password" className="text-white">
              Forgot Password?
            </NavLink>
          </div>
        </div>
        <div className="flex justify-center items-center mt-6 flex-col">
          <Button
            className="rounded-none bg-customOrange px-10 submit-btn"
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
          <SocialLogin.Google
            onClick={handleGoogle}
            className="mt-8"
            title="Sign up with Google"
          />
        </div>
      </Form>
    </div>
  );
};

export default Signup;