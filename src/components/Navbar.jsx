import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { BASEURL } from "../../utils/constant"
import {removeUser} from "../../utils/userslice"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Link } from "react-router-dom"


const Navbar = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const data = useSelector((store) => store.user)
 const handlelogout = async () => {
    try {
        // 1. Correct arguments: URL, Body (empty), Config
        await axios.post(
            BASEURL + "/logout", 
            {}, 
            { withCredentials: true }
        );

        // 2. Clear Redux State
        dispatch(removeUser());

        // 3. Redirect
        navigate("/login");
    } catch (err) {
        console.error("Logout failed:", err);
    }
};
    return (
        <>
            
                <div className="navbar bg-base-100 shadow-sm">
                    <div className="flex-1">
                       <Link to="/"> <div className="btn btn-ghost text-xl">daisyUI</div></Link>
                    </div>
                    <div className="flex gap-2">
                        <div className="dropdown dropdown-end">
                           {data&&<div className="flex gap-2 items-center">
                              <div>{data?.firstname} {data?.lastname}</div>
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                </div>
                            </div>
                           </div>}
                            <ul
                                tabIndex="-1"
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                <li>
                                    <Link to="/ProfileEdit">
                                        Profile
                                    </Link>
                                </li>
                                <li><Link to="/Connections">Connections</Link>
                                </li>
                                <li><Link to="/ConnectionRequest">Connection Request</Link>
                                </li>
                                
                                <li ><a onClick={handlelogout}>Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default Navbar