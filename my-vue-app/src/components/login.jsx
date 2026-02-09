import { use, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { adduser } from "../../utils/userslice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email,setemail] = useState("akshay@gmail.com"); // Changed to camelCase
  const [password, setPassword] = useState("akshay@123");
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault(); // CRITICAL: Stops the page from refreshing
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        { email, password },
        { withCredentials: true }
      );
      dispatch(adduser(response.data.user)) // Store user in Redux
      // Redirect user or store token here
      navigate("/") // Redirect to home page after login
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      {/* Use onSubmit here instead of onClick on the button */}
      <form 
        onSubmit={handleLogin} 
        className="card bg-base-100 shadow-xl border p-10 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>
        
        <div className="form-control">
          <label className="label">
            <span className="label-text">email</span>
          </label>
          <input 
            type="text" 
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="input input-bordered w-full mb-4" 
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full mb-6" 
            required
          />
        </div>

        <div className="card-actions justify-center">
          {/* Button type is submit by default inside forms */}
          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;