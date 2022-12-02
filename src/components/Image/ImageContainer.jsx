import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

const ImageItem = ({ src, display }) => {

    return(
        <div className="absolute inset-0 transition-all duration-500 ease-in-out" 
            style={{ opacity: display ? 1 : 0, transform: `scale(${display ? 1 : 0.9})` }}>
            <img className="w-full h-full object-contain object-center" src={src} alt=""/>
        </div>
    );
}

const ImageContainer = ({ srcs, onClick, onChange })=>{
    const [index, setIndex] = React.useState(0);
    const [hover, setHover] = React.useState(false);

    const handleClick = (v)=>{
        if (index + v >= srcs.length || index + v < 0) return;
        setIndex(index + v);
        onChange && onChange(index + v);
    }

    React.useEffect(()=>{
        srcs && setIndex(i => {
                    if (i >= srcs.length) return srcs.length - 1;
                    else if (i < 0) return 0;
                    return i;
                });
    }, [srcs]);

    if (!srcs || srcs.length === 0) return <div className='relative w-full h-full select-none bg-level2 animate-pulse' ></div>

    return (
        <div className={`relative w-full h-full select-none`} onMouseOver={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>
            {
                srcs.map((e, i) => <ImageItem key={i} src={e} display={i === index} />)
            }

            <div className="absolute inset-0" onClick={()=>onClick&&onClick()}></div>

            {
                hover && index > 0 &&
                <div className="absolute left-2 top-1/2 p-2 cursor-pointer opacity-50 hover:opacity-100 bg-level2 rounded-full" 
                    onClick={() => handleClick(-1)}>
                        <FaArrowLeft className="w-4 h-4" />
                </div>
            }

            {
                hover && index < srcs.length - 1 &&
                <div className="absolute right-2 top-1/2 p-2 cursor-pointer opacity-50 hover:opacity-100 bg-level2 rounded-full" 
                    onClick={() => handleClick(+1)}>
                        <FaArrowRight className="w-4 h-4"/>
                </div>
            }
        </div>
    );
}



export default ImageContainer;