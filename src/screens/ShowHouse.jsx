import React from "react";
import GalleryCard from "../components/Image/GalleryCard";
import List from "../elements/List";
import Paragraph from "../elements/Paragraph";
import RatingBar from "../elements/RatingBar";
import ReservationCard from "../components/ReservationCard";
import ReviewContainer from "../components/ReviewContainer";
import Text from "../elements/Text";
import Button from "../elements/Button";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Switch from "../elements/Switch";
import { useRequest } from "../contexts/RequestContext";
import { APP_URL } from "../utils/Request";
import ReviewInput from "../components/ReviewInput";


const ShowHouse = () => {
    const [house, setHouse] = React.useState({});
    const param = useParams();
    const { auth } = useAuth();
    const request = useRequest();

    React.useEffect(()=>{
        getHouse(request, param.id, setHouse);
    }, [param.id, request]);

    const handleActiveChanged = ()=>{
        setActive(request, house, setHouse);
    }

    return (
        <div className="w-full grid grid-cols-3 bg-inherit mt-24 max-w-5xl px-2">
            <div className="col-span-3 flex flex-col">
                <div className="flex flex-wrap">
                    <Text type="h2">{house?.name}</Text>
                    <div className="flex-grow"></div>
                    <RatingBar rating={house?.reviews_avg || 0}/>
                </div>

                <p className="font-mono  mb-3">@{house?.user?.username} . {house?.city},{house?.country}</p>

                {
                    auth?.user && auth?.user.id === house?.user?.id &&
                    <React.Fragment>
                        <div className="flex flex-wrap justify-end items-center">
                            <Switch title="Active" value={house?.active} onChange={handleActiveChanged}/>
                            <Link to="update">
                                <Button small value="Update" />
                            </Link>
                        </div>
                    </React.Fragment>
                }

                <div className="w-full self-center my-3">
                    <GalleryCard srcs={house?.images?.map(e => APP_URL + "api/house/" + house?.id + "/image/" + e.id)}/>
                </div>
            </div>

            <hr className="m-2 col-span-3 my-10 border-primary"/>

            <div className="col-span-3 grid grid-cols-5">
                <div className="col-span-5 sm:col-span-3">

                    <div className="w-full p-3 min-h-[300px]">
                        <List title="This place features:" list={house?.features?.map(e => e.feature)}/>
                    </div>

                    <hr className="m-2 my-10 border-primary"/>

                    <div className="w-full p-3 min-h-[300px]">
                        <List title="This place roules:" list={house?.rules?.map(e => e.rule)}/>
                    </div>
                </div>
                <div className="relative col-span-5 sm:col-span-2 flex flex-col items-center">
                    <ReservationCard house={house}/>
                </div>
            </div>

            <hr className="m-2 col-span-3 my-10 border-primary"/>

            <div className="col-span-3">
                <Text type="h4">About this place: </Text>
                <Paragraph text={house?.about}/>
            </div>

            <hr className="m-2 col-span-3 my-10 border-primary"/>

            <div className="col-span-3 bg-inherit">
                <ReviewInput house={house}/>
                <ReviewContainer house={house}/>
            </div>
        </div>
    );
}

const setActive = async (request, house, setHouse)=>{
    const res = await request("api/house/" + house.id, "POST", {active: !house?.active ? 1 : 0 });
    
    if (res.ok){
        setHouse({ ...house, active: !house?.active });
    }
}

export const getHouse = async (request, id, setHouse) => {
    const res = await request("api/house/" + id);
    
    if (res.ok){
        setHouse((await res.json()).data);
    }
}

export default ShowHouse;