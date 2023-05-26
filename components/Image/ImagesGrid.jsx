import React from "react";

const ImageItem = ({ src }) => {

    return (
        <div className="col-span-1 aspect-[1.5]">
            <img src={src} className="w-full h-full object-cover object-center" alt=""/>
        </div>
    )
}

const ImagesGrid = ({ srcs = [], onShowMore }) => {

    const [first, ...rest] = srcs;

    if (srcs.length === 0) return <div className="relative aspect-[2.5] w-full rounded-3xl bg-level2 animate-pulse"></div>

    return (
        <div className="relative w-full overflow-hidden rounded-3xl grid grid-cols-2">

            <div className="col-span-1 aspect-[1.5]">
                {
                    first && <img src={first} className="w-full h-full object-cover object-center" alt=""/>
                }
            </div>

            <div className="col-span-1 grid grid-cols-2">
                {
                    rest.map((e, i) => i < 4 && <ImageItem key={i} src={e} />)
                }
            </div>

            <div onClick={() => onShowMore&&onShowMore()}
                className="absolute bg-slate-300 bg-opacity-50 hover:bg-opacity-100 right-5 bottom-5 border-dotted border-black border-2 p-1 rounded shadow-md select-none cursor-pointer">
                <p >more</p>
            </div>
        </div>
    );
}


export default ImagesGrid;