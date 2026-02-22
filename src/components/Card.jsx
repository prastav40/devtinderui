import { use } from "react";

const Card = ({ userData }) => {
    // Destructuring userData from props makes the code cleaner
    const firstname = userData?.firstname;
    const lastname = userData?.lastname;

    return (
        <div>
            {/* Added 'border' and 'border-gray-200' (or border-base-300) */}
            <div className="card bg-base-100 w-64 shadow-sm border border-gray-200">
                <figure>
                    <img
                        src="https://imageio.forbes.com/specials-images/imageserve/62d700cd6094d2c180f269b9/0x0.jpg?format=jpg&crop=959,959,x0,y0,safe&height=416&width=416&fit=bounds"
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title capitalize">{firstname} {lastname}</h2>
                    <div>{userData?.gender|| "other"}</div>
                    <div>{userData?.age} </div>
                    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary btn-sm">Interested</button>
                        <button className="btn btn-secondary btn-sm">Ignored</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;