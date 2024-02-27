import { useState, useContext } from "react";
import { Button, Form, Input, message } from "antd";
import { AuthContext } from "../Authprovider";
import axios from "axios";
import { Link,useLocation ,NavLink, useNavigate } from "react-router-dom";

// import { useNavigate, useLocation } from "react-router-dom";
import { hashData } from "../../../../util/security";
// import Joi from "joi";
import "../../../../../src/index.css";

// function Signup() {
//   const { googleSignIn, setUser } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const navigation = useNavigation();
//   const location = useLocation();

//   const from = location.state?.from?.pathname || "/";

//   if (navigation.state === "loading") {
//     return <progress className="progress w-56"></progress>;
//   }
//   const onFinish = async (values) => {
//     const defaultUser = {
//       role: "user",
//     };

//     const userData = {
//       ...defaultUser,
//       ...values,
//     };

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/signup",
//         userData
//       );

//       setUser(response.data.user);

//       message.success("Signup successful");
//       navigate('/login', { replace: true });
//     } catch (error) {
//       console.error("Signup failed:", error?.response?.data?.error);

//       message.error("Failed to signup. Please try again later.");
//     }
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };

//   const handleGoogle = () => {
//     googleSignIn()
//       .then((result) => {
//         const user = result.user;
//         const saveUser = {
//           username: user.displayName,
//           email: user.email,
//           role: "user",
//           password: "",
//         };

//         axios
//           .post("http://localhost:5000/user", saveUser, {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           })
//           .then(() => {
//             message.success("Login successful");
//             navigate(from, { replace: true });
//           })
//           .catch((error) => {
//             console.error("Error posting user data:", error);
//           });
//       })
//       .catch((error) => {
//         console.error("Google sign-in error:", error.message);
//       });
//   };

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [disable, setDisable] = useState(true);

  const { googleSignIn,signup } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
  setDisable(checkPassword());
};

const togglePasswordVisibility = () => {
  setShowPassword(!showPassword);
};

async function onSubmit(e) {
  console.log(e);
  try{
    const resp = await signup(e);
    if (resp.success)
    {
      message.success("Signup successful");
      navigate("/login");
    }
    else{
      message.warning("Failed!");
    }
  } catch (error) {
    console.error("Signup failed:", error.response.data.errorMsg);
    message.warning( error.response.data.errorMsg)
  }
}

const handleGoogle = async () => {
  googleSignIn()
    .then((result) => {
      const user = result.user;
      const saveUser = {
        username: user.displayName,
        email: user.email,
        role: "user",
        password: "dummy",
      };

      console.log(saveUser);
      // signup(saveUser)
      // .then((resp) => {
      //   // if (resp.success)
      //   message.success("Login successful");
      //   navigate(from, { replace: true });
      // })
      // .catch((error) => {
      //   displayErrorMessage("Error posting user data.");
      // });
    })
    .catch((error) => {
      displayErrorMessage("Google sign-in error."); 
    });
};

function displayErrorMessage(msg) {
  alert(msg); 

}


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
        onFinish={onSubmit}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="w-full"
      >
        <div className="bg-black w-full py-5 px-14">
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
              className="py-2 text-center username-input placeholder:text-white bg-[#a5a5a5] border-4 rounded-none border-[#434343] text-white font-medium"
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
              // {
              //   validator: (rule, value) => {
              //     if (!validateEmail(value)) {
              //       return Promise.reject(
              //         "Please input a valid email address!"
              //       );
              //     }
              //     return Promise.resolve();
              //   },
              // },
            ]}
          >
            <Input
              className="py-2 text-center username-input placeholder:text-white bg-[#a5a5a5] border-4 rounded-none border-[#434343] text-white font-medium"
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
              className="py-2 text-center password-input bg-[#a5a5a5] border-4 rounded-none border-[#434343] text-white font-medium signup-password"
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
            className="rounded-none bg-black px-10 submit-btn"
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