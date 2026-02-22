import axios from "axios";
import { BASEURL } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../utils/userslice";
import { useEffect } from "react";
import { addfeed } from "../../utils/feedslice";
import Card from "./Card";

const Feed = () => {
    const dispatch = useDispatch();
    const feedselector = useSelector((store) => store.feed);

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
        handlerefresh();
    }, []);

    return (
        <div className="flex flex-wrap justify-center items-center gap-6 p-10 bg-base-200 min-h-screen">
            {/* Map through the feed and pass each user to a Card */}
            {feedselector && feedselector.map((user) => (
                <Card key={user._id} userData={user} />
            ))}

            {/* Empty State */}
            {feedselector?.length === 0 && (
                <div className="text-xl font-semibold text-gray-500">No more profiles to show!</div>
            )}
        </div>
    );
};

export default Feed;