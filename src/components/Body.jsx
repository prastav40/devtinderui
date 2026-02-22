import axios from "axios"
import { BASEURL } from "../../utils/constant"
import { useDispatch } from "react-redux"
import { addUser } from "../../utils/userslice"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const data = useSelector((store) => store.user);

    const handlerefresh = async () => {
        try {
            const res = await axios.get(BASEURL + "/profile/view", { withCredentials: true });
            dispatch(addUser(res?.data));
        } catch (err) {
           navigate("/login")
        }
    };

    useEffect(() => {
       handlerefresh()
      
    }, []); // Re-run if data changes

    // Return null or a loading spinner if there is no data
    if (!data) {
        return null; 
    }

    return (
        <div>
            Body
        </div>
    );
};

export default Body