import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import { BASEURL } from "../../utils/constant";
import { addUser } from "../../utils/userslice";
import {  useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const ProfileEdit = () => {
    const selectordata = useSelector((store) => store.user);
    const navigate=useNavigate()
    const dispatch=useDispatch()
    
    // Initialize state with existing user data
    const [firstname, setfirstname] = useState(selectordata?.firstname || "");
    const [lastname, setlastname] = useState(selectordata?.lastname || "");
    const [age, setage] = useState(selectordata?.age || 18);
    // Set initial gender from selector or default to "Gender"
    const [gender, setgender] = useState(selectordata?.gender || "male");

      const handlerefresh = async () => {
        try {
            const res = await axios.get(BASEURL + "/profile/view", { withCredentials: true });
            dispatch(addUser(res?.data));
        } catch (err) {
           navigate("/login")
        }
    };

    const handlesubmit = async () => {
        try {
            // Added gender to the data object
            const res = await axios.patch(
                BASEURL + "/profile/edit", 
                { firstname, lastname,age }, 
                { withCredentials: true }
            );
            alert("Profile updated successfully!");
        } catch (err) {
            console.error("Update failed:", err);
        }
    };


    useEffect(()=>{
         handlerefresh()
    },[])
    return (
        <div className="flex gap-10 justify-center items-center min-h-[80vh]">
            <div className="flex flex-col gap-4 justify-center items-center p-10 bg-base-200 rounded-xl shadow-lg">
                <h1 className="text-2xl font-bold mb-2">Edit Profile</h1>
                
                <input 
                    type="text" 
                    placeholder="First Name" 
                    className="input input-bordered input-primary w-full" 
                    value={firstname} 
                    onChange={(e) => setfirstname(e.target.value)} 
                />
                
                <input 
                    type="text" 
                    placeholder="Last Name" 
                    className="input input-bordered input-primary w-full" 
                    value={lastname} 
                    onChange={(e) => setlastname(e.target.value)} 
                />

                <input 
                    type="number" 
                    placeholder="Age" 
                    className="input input-bordered input-primary w-full" 
                    value={age} 
                    onChange={(e) => setage(e.target.value)} 
                />

                {/* Controlled Select Component */}
                <select 
                    value={gender} 
                    className="select select-bordered select-primary w-full"
                    onChange={(e) => setgender(e.target.value)}
                >
                    <option disabled value="Gender">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>

                <button 
                    className="btn btn-primary w-full bg-green-500 hover:bg-green-600 border-none text-white"
                    onClick={handlesubmit}
                >
                    Save Profile
                </button>
            </div>

            {/* Live Preview Card */}
            <div className="hidden md:block">
                <h2 className="text-center font-semibold mb-2">Preview</h2>
                <Card userData={{ firstname, lastname, age, gender }} />
            </div>
        </div>
    );
};

export default ProfileEdit;