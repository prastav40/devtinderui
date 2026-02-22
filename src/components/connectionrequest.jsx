import { showconnectionrequest } from "../../utils/connectionrequestslice"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import axios from "axios"
import { BASEURL } from "../../utils/constant"
import { useSelector } from "react-redux"
import { addfeed } from "../../utils/feedslice"
import { addUser } from "../../utils/userslice"
import {removerequest} from "../../utils/connectionrequestslice"

const ConnectionRequest = () => {
    const dispatch = useDispatch();
    const data = useSelector((store) => store.showconnectionrequest);

    const getconnectionrequest = async () => {
        try {
            const res = await axios.get(BASEURL + "/user/requests/pending", { withCredentials: true });
            // Ensure you are dispatching the array (check if it's res.data or res.data.data)
            dispatch(showconnectionrequest(res?.data?.data));
        } catch (err) {
            console.error("Failed to fetch requests:", err);
        }
    };

    
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

    const selectconnectionstatus = async (status, id_sr) => {
        try {
            const res = await axios.post(BASEURL + "/request/review/" + status + "/" + id_sr, {}, { withCredentials: true })
            dispatch(removerequest(id_sr))
        } catch (err) {
            console.error("Failed to update request status:", err);
        }
    }

    useEffect(() => {
        // Only fetch if we don't already have data to save API calls
        if (!data || data.length === 0) {
            getconnectionrequest();
            handlerefresh();
        }
    }, []);

    // 1. Check if data is null/undefined (Loading state)
    if (!data) return <div className="text-white text-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-900 p-4">
            <h2 className="p-4 pb-4 text-3xl tracking-wide font-bold text-center text-white">
                Connection Requests
            </h2>

            {/* 2. Check if data is an empty array */}
            {data.length === 0 ? (
                <p className="text-white text-center">No pending requests found.</p>
            ) : (
                data.map((item) => {
                    // 3. Return the JSX (The "Fix")
                    return (
                        <div key={item._id} className="bg-blue-800 p-4 m-2 rounded-lg w-1/2 mx-auto text-white flex justify-between items-center">
                            <div>{item?.senderid?.firstname} {item?.senderid?.lastname}</div>

                            <div className="flex gap-2">
                                <button className="btn btn-success" onClick={() => { selectconnectionstatus("accepted", item._id) }}>Accepted</button>
                                <button className="btn btn-error" onClick={() => { selectconnectionstatus("rejected", item._id) }}>Rejected</button>
                            </div>

                        </div>

                    );
                })
            )}
        </div>
    );
};

export default ConnectionRequest