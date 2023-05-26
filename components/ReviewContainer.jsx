import React from "react";
import ReviewCard from "./ReviewCard";
import request from "@/utils/Request";


const ReviewContainer = ({ house }) => {
    const [reviews, setReviews] = React.useState(null);
    const [next, setNext] = React.useState(null);
    
    React.useEffect(()=>{
        house?.id && getReviews(house.id, setReviews, setNext);
    }, [house]);

    const handleMore = ()=>{
        getReviews(house.id, setReviews, setNext, next);
    }

    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-10 my-10">
            {
                reviews ? reviews.map(e => <ReviewCard key={e.id} review={e} />) : [0, 1].map(e => <ReviewCard key={e} />)
            }
            {
                next && 
                <div className="col-span-full text-center hover:scale-110 hover:text-blue-600 cursor-pointer" onClick={handleMore}>
                    <p>more?</p>
                </div>
            }
        </div>
    );
}


const getReviews = async (house_id, setReviews, setNext, next) => {
    const res = await request(next ? next : `api/house/${house_id}/review/list`);

    if (res.ok){
        const js = await res.json();
        setReviews(v => next ? [ ...v, ...js.data ] : js.data);
        setNext(js.links.next);
        return;
    }
}


export default ReviewContainer;