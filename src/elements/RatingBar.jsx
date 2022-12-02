import React from "react";
import {AiOutlineStar} from "react-icons/ai";
import {AiFillStar} from "react-icons/ai";

const Star = ({ fill, onChange }) => {

    return (
        <div className="aspect-square scale-90 hover:scale-100 cursor-pointer " onClick={onChange} >
            {
                fill ? <AiFillStar className="w-full h-full"/> : <AiOutlineStar className="w-full h-full"/>
            }
        </div>
    );
}

const render = (rating) => {
    var arr = [];
    for(var i = 0; i < 5; ++i){
        arr.push(i < rating); 
    }
    return arr;
}

const RatingBar = ({ rating, onChange, className="w-full", disabled }) => {

    return (
        <div className={"max-w-[150px] grid grid-cols-5 text-slate-600 " + className}>
            {
                render(rating).map((e, i) => <Star key={i} onChange={() => !disabled && onChange && onChange(i + 1)} fill={e} />)
            }
        </div>
    );
}

export default RatingBar;