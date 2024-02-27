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
import { validateEmail } from "../../../../services/utils";
import SocialLogin from "../SocialLogin";
import "../Login/Login.css";

function Login() {
  const { googleSignIn, setUser, login,signup } = useContext(AuthContext);
  const navigate = useNavigate();
  const navigation = useNavigation();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [allUser, setAllUser] = useState([]);

  useEffect(() => {
    
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/login");
        setAllUser(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

 
  }, []);

  if (navigation.state === "loading") {
    return <progress className="progress w-56"></progress>;
  }

  const onFinish = async ({ email, password }) => {
    try {
   
      const resp = await login(email, password);
      if (resp.success)
      {
        message.success("Login successful");
        {resp.data.role == "admin"?
          navigate("/adminpage")
          :
          navigate("/");
        }
      }
      else{
        message.warning("Wrong username or password!");
      }
   
      
    } catch (error) {
      console.error("Login failed:", error.response.data.errorMsg);
      message.warning( error.response.data.errorMsg)
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleGoogle = async () => {
    try {
      const result = await googleSignIn();
        const user = result.user;
        const saveUser = {
          username: user.displayName.replace(/\s/g, ''),
          email: user.email,
          role: "user",
          password: "dummy"
        };
        console.log(saveUser);
        try {
          const res = await signup(saveUser);
          console.log(res);
          if (res.success){
            console.log(res); 
          }
        } catch (error) {
          console.log(error);
        }

        await login(user.email, 'dummy');
        navigate(from, { replace: true });

    }
    catch(error){
        console.error("Google sign-in error:", error.message);
    };
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
                message: "Please enter your email!",
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
              className="py-2 text-center username-input placeholder:text-customBeige bg-customOrange border-4 rounded-none border-customPink text-black font-medium"
              placeholder="Enter your email"
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
              className="py-2 text-center password-input placeholder:text-customBlue bg-customPink border-4 rounded-none border-customPink text-white font-medium signup-password"
              placeholder="Enter your password"
            />
          </Form.Item>
          <div className="flex justify-between items-center sm:ml-20">
            <p className="text-customBeige">
              No Account?&nbsp;
              <NavLink to="/signup" className="text-customBeige">
                Signup here
              </NavLink>
            </p>
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
            className="mt-5"
            title="Sign in with Google"
          />
        </div>
      </Form>
    </div>
  );
}

export default Login;
