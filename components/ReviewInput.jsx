import React from "react";
import RatingBar from "./elements/RatingBar";
import Text from "./elements/Text";
import TextInput from "./elements/TextInput";
import Button from "./elements/Button";
import request from "@/utils/Request";



const ReviewInput = ({ house }) => {
    const [inputs, setInputs] = React.useState({});
    const [error, setError] = React.useState();

    React.useEffect(()=>{
        house && house.id && getReview(house.id, setInputs);
    }, [house]);

    const handleInput = (key, value) => {
        setInputs(inputs => {
            inputs[key] = value;
            return {...inputs};
        });
    }

    const handleSave = () => {
        house && house?.add_review && sendReview(house?.id, inputs, setError);
    }

    return (
        <div className="w-full grid grid-cols-1 gap-4 bg-inherit">
            <RatingBar rating={inputs?.rating} onChange={(v) => handleInput("rating", v)}/>
            {!house?.add_review && <Text>you cannot add new review until you rent this house</Text>}
            <TextInput title="comment" error={error} value={inputs?.comment || ""} onInput={(v) => handleInput("comment", v)} />
            <div className="w-full flex justify-end">
                <Button value="Save" disabled={!house?.add_review} onClick={handleSave}/>
            </div>
        </div>
    );
}


const getReview = async (house_id, setData) => {
    const res = await request(`api/house/${house_id}/review`);

    if (res.ok){
        const js = await res.json();
        js?.data && setData(js.data);
    }
}

const sendReview = async (house_id, data, setError) => {
    const res = await request(`api/house/${house_id}/review`, "POST", data);

    if (!res.ok){
        const js = await res.json();
        setError(js.message);
    }
}

export default ReviewInput;