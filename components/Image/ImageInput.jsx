import React from "react";
import ImageContainer from "./ImageContainer";
import {HiPlus} from "react-icons/hi";
import {MdOutlineRemove} from "react-icons/md";

const ImageInput = ({ srcs=[], onChange, onDelete, disabled })=>{
    const [images, setImages] = React.useState([]);
    const [input, setInput] = React.useState([]);
    const [index, setIndex] = React.useState(0);

    React.useEffect(()=>{
        onChange && onChange(input);
    }, [input, onChange]);

    const handleInput = async (files) => {
        const b64 = [];

        for(var i = 0; i < files.length; ++i){
            b64.push(URL.createObjectURL(files[i]));
        }

        setInput([...input, ...files]);
        setImages([...images, ...b64]);
    }

    const handleDelete = () => {
        if (disabled) return;

        if (index < srcs.length ){
            onDelete && onDelete(index);
            return;
        }
        
        setImages(images.filter((e, i) => i !== index + srcs.length ));
    }

    return (
        <div className="relative w-full aspect-square">
            <ImageContainer srcs={[...srcs, ...images]} onChange={setIndex} />
            <div className="absolute top-0 left-0 right-0 flex justify-center" >
                <div title="Add" className="cursor-pointer relative bg-slate-500 bg-opacity-25 hover:rotate-180 transition-transform w-9 h-9 rounded-full flex justify-center items-center border-2">
                    <input type="file" accept="image/*" multiple className="absolute inset-0 w-full h-full opacity-0" onInput={(e) => handleInput(e.currentTarget.files)} disabled={disabled}/>                   
                    <HiPlus className="w-7 h-7 hover:cursor-pointer"/> 
                </div>
                <div title="Delete" onClick={handleDelete} className="cursor-pointer relative bg-slate-500 bg-opacity-25 hover:rotate-180 transition-transform w-9 h-9 rounded-full flex justify-center items-center border-2">
                    <MdOutlineRemove className="text-red-700 w-7 h-7" />
                </div>
            </div>
        </div>
    );
}


export default ImageInput;