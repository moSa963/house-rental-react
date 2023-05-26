import React from "react";
import ImageInput from "../Image/ImageInput";
import Button from "../elements/Button";
import request from "@/utils/Request";




const UpdateRoomImagesForm = ({ processing, setProcessing, house, setHouse }) => {
    const [newImages, setNewImages] = React.useState([]);

    const handleSaveImages = async ()=>{
        setProcessing(true);
        await addImages(house.id, newImages, setHouse);
        setNewImages([]);
        setProcessing(false);
    }

    const handleRemoveImage = async (i)=>{
        setProcessing(true);
        await removeImage(house?.id, house?.images[i].id, setHouse);
        setProcessing(false);
    }

    return (
        <div className="bg-level2 p-2 rounded-lg">
            <ImageInput srcs={house?.images?.map(e => `${process.env.api_url}api/house/${house?.id}/image/${e.id}` +  + "/image/" + )} onChange={setNewImages} onDelete={handleRemoveImage} disabled={processing}/>
            <div className="flex w-full justify-end">
                <Button value="Save" onClick={handleSaveImages} disabled={processing}/>
            </div>
        </div>
    );
}


const addImages = async (house_id, data, setHouse)=>{
    const res = await request("api/house/" + house_id + "/image", "POST", {image: data});

    if (res.ok){
        const js = await res.json();
        setHouse(h => ({...h, images: [...h.images, ...js.data]}));
    }
}

const removeImage = async (house_id, image_id, setHouse)=>{
    const res = await request(`api/house/${house_id}/image/${image_id}` , "DELETE");

    if (res.ok){
        setHouse(h => ({...h, images: h.images.filter(e => e.id !== image_id)}));
    }
}


export default UpdateRoomImagesForm;