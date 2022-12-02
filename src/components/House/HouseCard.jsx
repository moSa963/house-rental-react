import React from "react";
import { Link } from "react-router-dom";
import Text from "../../elements/Text";
import { APP_URL } from "../../utils/Request";
import ImageContainer from "../Image/ImageContainer";
import RatingBar from "../../elements/RatingBar";

const HouseCard = ({ house }) => {

    return (
        <div className="relative cursor-pointer bg-level3 shadow-md before:absolute before:inset-0 p-2 rounded-lg overflow-hidden before:pointer-events-none before:from-transparent before:to-transparent before:via-slate-500 before:bg-opacity-0 before:hover:bg-gradient-to-bl before:hover:opacity-20">
            <div className="aspect-[1.5]">
                <ImageContainer srcs={house?.images?.map(e => APP_URL + e.url )}/>
            </div>
            <Link to={"/house/" + house?.id}>
                <div className="w-full h-24 overflow-hidden">
                    <Text type="p" className="overflow-hidden font-bold whitespace-nowrap text-ellipsis pb-1">{house?.name}</Text> 
                    <Text type="caption">@{house?.user.username} . {house?.city},{house?.country}</Text> 
                </div>
            </Link>
            <RatingBar rating={house?.reviews_avg || 0} className="absolute top-4 text-primary bg-slate-300 bg-opacity-50 rounded-lg w-24" />
            <Text type="caption" className="overflow-hidden font-serif whitespace-nowrap text-ellipsis">{house?.night_cost || 0} $/night</Text> 
        </div>
    );
};


export default HouseCard;