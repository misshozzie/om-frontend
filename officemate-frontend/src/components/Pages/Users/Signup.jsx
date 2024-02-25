import { useState, useContext } from 'react';
import { AuthContext } from '../Users/Authprovider';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { hashData } from '../util/security'; // Ensure this is correctly imported
import '../../../index.css';

function Signup() {
  const { googleSignIn, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGoogle = async () => {
    try {
      const result = await googleSignIn();
      const user = result.user;
      const saveUser = {
        username: user.displayName,
        email: user.email,
        role: "user",
        password: "",
      };
  
      await axios.post("http://localhost:3000/user", saveUser, {
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        message.success("Login successful");
        navigate(from, { replace: true });
      } catch (error) {
        console.error("Google sign-in error:", error.message);
      }
    };
  };

  const onSubmit = async (e) => {
    e.preventDefault(); 

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    const hashedPasswordData = hashData(formData.password); 
    
    try {
      const userData = {
        ...formData,
        password: hashedPasswordData.hash, 
        salt: hashedPasswordData.salt, 
        iterations: hashedPasswordData.iterations, 
      };

      const response = await axios.post('http://localhost:3000/signup', userData);
      console.log(response.data);
      setUser(response.data.user);
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error.response?.data?.message || 'An error occurred');
    }
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

export default Signup;
