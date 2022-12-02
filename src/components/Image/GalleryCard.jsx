import React from "react";
import { useScreenSize, State } from "../../contexts/ScreenContext";
import ImageContainer from "./ImageContainer";
import ImagesGrid from "./ImagesGrid";



const GalleryCard = ({ srcs }) => {
    const [full, setFull] = React.useState(false);
    const {size} = useScreenSize();

    if (full) {
        return (
            <div className="fixed inset-0 z-50 bg-slate-500 backdrop-blur-sm bg-opacity-20">
                <div className="w-full h-full object-contain ">
                    <ImageContainer srcs={srcs} onClick={()=>setFull(false)}/>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            {
                size === State.sm ?  <div className="w-full aspect-square">
                                        <ImageContainer srcs={srcs} onClick={()=>setFull(e => !e)}/>
                                    </div> : <ImagesGrid srcs={srcs} onShowMore={()=>setFull(true)} />
            }
        </div>
    );
}


export default GalleryCard;