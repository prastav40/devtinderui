import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userslice";
import { useNavigate } from "react-router-dom";
import {BASEURL } from "../../utils/constant";

const Login = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [email, setemail] = useState("rudransh@gmail.com");
    const [password, setpassword] = useState("rudransh@123");
    const[error,seterror]=useState()

    const handlelogin = async () => {
        try {
            const res = await axios.post(
                BASEURL+"/login",
                { email, password },
                { withCredentials: true } 
            );
            dispatch(addUser(res?.data?.user))
            alert("Welcome back!");
            navigate("/Feed")
        } catch (err) {
            console.error("Login failed:", err);
            alert("Error: " + (err.response?.data?.error || "Invalid login"));
            seterror(err.response?.data?.error || "Invalid login")
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-base-100 px-4">
            <div className="card bg-base-300 w-full max-w-sm shadow-2xl p-8 border border-base-content/5 mb-24">
                <header className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-primary">Welcome Back</h2>
                    <p className="text-sm opacity-70 mt-2 text-center w-full">Log in to your account</p>
                </header>

                <div className="flex flex-col gap-4">
                    {/* Email Input */}
                    <div className="form-control w-full">
                        <label className="input input-bordered flex items-center gap-3 validator w-full">
                            <svg className="h-5 w-5 opacity-60 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                            <input
                                type="email"
                                required
                                placeholder="Email"
                                value={email} // Connected to state
                                onChange={(e) => setemail(e.target.value)} // Updates state
                                className="grow w-full"
                            />
                        </label>
                    </div>

                    {/* Password Input */}
                    <div className="form-control w-full">
                        <label className="input input-bordered flex items-center gap-3 validator w-full">
                            <svg className="h-5 w-5 opacity-60 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                            <input
                                type="password"
                                required
                                placeholder="Password"
                                value={password} // Connected to state
                                onChange={(e) => setpassword(e.target.value)} // Updates state
                                className="grow w-full"
                            />
                        </label>
                        <div className="text-red-700">{error}</div>
                    </div>

                    <button 
                        className="btn btn-primary mt-2 w-full text-lg shadow-md hover:brightness-110 active:scale-95 transition-all" 
                        onClick={handlelogin}
                    >
                        Login
                    </button>
                    
                    <div className="divider opacity-30 text-[10px]">OR</div>
                    <p className="text-center text-sm">
                        New to DevTinder? <span className="link link-primary no-underline font-bold">Join Now</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;