import { showconnections } from "../../utils/conectionslice"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import axios from "axios"
import { BASEURL } from "../../utils/constant"
import { useSelector } from "react-redux"
import { addfeed } from "../../utils/feedslice"
import { addUser } from "../../utils/userslice"

const Connection = () => {

    const dispatch = useDispatch();
    const data = useSelector((store) => store.connections)
    const getconnections = async () => {
        try {
            const res = await axios.get(BASEURL + "/user/requests/accepted", { withCredentials: true })
            dispatch(showconnections(res?.data?.data))
        } catch (err) {
            console.log(err)
        }
    }
   
    
    const handlerefresh = async () => {
        try {
            const res = await axios.get(BASEURL + "/profile/view", { withCredentials: true });
            const feed_data = await axios.get(BASEURL + "/feed", { withCredentials: true });
            
            // Dispatching the array to Redux
            dispatch(addfeed(feed_data?.data));
            dispatch(addUser(res?.data));
        } catch (err) {
            console.error("Fetch error:", err);
        }
    };
    useEffect(() => {
        getconnections(),
        handlerefresh()
    }, [])

    if(!data || data.length === 0){
        return null
    }

    return (
        <div>
            <li className="p-4 pb-2 text-3xl  tracking-wide font-bold text-center text-white">Connections</li>
            {data.map((item) => {
               return( 
                <div key={item._id} >
                    <ul className="list bg-emerald-800 rounded-box shadow-md w-1/2 mx-auto flex flex-col gap-4 p-4 mb-4">
                    <li className="list-row">
                        <div className="flex gap-2">
                            <div >{item.firstname}</div>
                            <div >{item.lastname}</div>
                        </div>
                    </li>
                </ul>
                </div>
               )
            })}
        </div>
    )
}

export default Connection