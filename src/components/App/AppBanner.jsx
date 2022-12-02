import React from "react";
import { useScroll } from "../../contexts/ScrollContext";
import Text from "../../elements/Text";

const AppBanner = ({ src,  }) => {
    const {scroll} = useScroll();
    const p = scroll > 500 ? 250: scroll /2;

    return (
        <div className="relative flex justify-center items-center overflow-hidden h-60 md:h-96">
            <img className={`absolute w-full h-full top-0 object-cover brightness-50 `} alt="" style={{transform: `translateY(${p}px)`}} src={src} />
            <div className="absolute  inset-0 flex flex-col justify-center items-center text-center" style={{transform: `translateY(${p}px)`}}>
                <Text type="h1" className="text-white">House rental</Text>
                <Text type="h4" className="text-white tracking-widest">your vacation is our responsibility</Text>
            </div>
            <div className="absolute inset-0 shadow-inner shadow-black"></div>
        </div>
    );
}


export default AppBanner;