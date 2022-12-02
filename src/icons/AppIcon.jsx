import React from "react";
import { useScroll } from "../contexts/ScrollContext";
import { interpolate } from "../utils/Interpolator";



const AppIcon = ({ className }) => {
    const {scroll} = useScroll();

    return (
        <svg className="h-full stroke-primary" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">  
            <path style={{ strokeDasharray: interpolate(scroll, [0, 75, 200], [183, 350, 183]), strokeDashoffset: 140 }} 
                d="M62.7071 27.6962L94.2016 58.7062C94.3925 58.8942 94.5 59.1509 94.5 59.4188V91.5C94.5 92.0523 94.0523 92.5 93.5 92.5H72C71.4477 92.5 71 92.0523 71 91.5V69.5C71 68.9477 70.5523 68.5 70 68.5H55C54.4477 68.5 54 68.9477 54 69.5V91.5C54 92.0523 53.5523 92.5 53 92.5H30.5137C30.1913 92.5 29.8886 92.3445 29.7008 92.0824L6.3108 59.4338C6.11656 59.1627 6.07028 58.8126 6.18738 58.5003L17.0637 29.4969C17.3881 28.6317 18.6119 28.6317 18.9363 29.4969L29.4547 57.5459C29.7101 58.2269 30.5839 58.4161 31.0981 57.9019L61.2984 27.7016C61.6867 27.3133 62.3157 27.3108 62.7071 27.6962Z" stroke="#070077" strokeWidth="6"/>
            <path d="M40.5 64.5L60.7702 42.2994C61.1636 41.8685 61.8407 41.8645 62.2392 42.2907L83 64.5" stroke="#070077" strokeWidth="6" strokeLinecap="round"/>
        </svg>
    );
}

export default AppIcon;