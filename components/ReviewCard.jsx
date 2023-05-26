import React from "react";
import Avatar from "./elements/Avatar/Avatar";
import RatingBar from "./elements/RatingBar";
import Text from "./elements/Text";
import Paragraph from "./elements/Paragraph";


const ReviewCard = ({ review }) => {


    return (
        <div>
            <div className="flex justify-center items-center">
                <Avatar src={review && process.env.api_url + review?.user?.image_url}/>
                
                <div className="flex-1 h-full">
                    <RatingBar rating={review?.rating}/>
                </div>
            </div>
            <Text>@{review?.user.username}</Text>
            <hr className="m-1 bg-black bg-opacity-25" />
            <div className="h-44 overflow-y-auto scroll-h scrollbar-none">
                <Paragraph text={review?.comment}/>
            </div>
        </div>
    );
}


export default ReviewCard;