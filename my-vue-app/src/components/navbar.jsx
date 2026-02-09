import { useSelector } from "react-redux";
const Navbar = () => {
    const user=useSelector((state)=>state.user)
    console.log("Current User in Navbar:", user); // Debugging line to check user state
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-none">
                <button className="btn btn-square btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg>
                </button>
            </div>
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">DevTinder</a>
            </div>
           
            {user&&<div>welcome {user.firstname}</div>}
        </div>
    )
}

export default Navbar;
