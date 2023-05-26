"use client"
import React from "react";
import { useParams } from "next/navigation";
import Text from "@/components/elements/Text";
import RatingBar from "@/components/elements/RatingBar";
import Switch from "@/components/elements/Switch";
import Link from "next/link";
import Button from "@/components/elements/Button";
import GalleryCard from "@/components/Image/GalleryCard";
import request from "@/utils/Request";
import List from "@/components/elements/List";
import ReservationCard from "@/components/ReservationCard";
import Paragraph from "@/components/elements/Paragraph";
import ReviewInput from "@/components/ReviewInput";
import ReviewContainer from "@/components/ReviewContainer";
import { useAuth } from "@/contexts/AuthContext";


const ShowHouse = () => {
    const [house, setHouse] = React.useState({});
    const param = useParams();
    const { user } = useAuth();

    React.useEffect(()=>{
        getHouse(param.id, setHouse);
    }, [param.id]);

    const handleActiveChanged = ()=>{
        setActive(house, setHouse);
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
                    user && user.id === house?.user?.id &&
                    <React.Fragment>
                        <div className="flex flex-wrap justify-end items-center">
                            <Switch title="Active" value={house?.active} onChange={handleActiveChanged}/>
                            <Link  href={`/house/${param.id}/update`} >
                                <Button small value="Update" />
                            </Link>
                        </div>
                    </React.Fragment>
                }

                <div className="w-full self-center my-3">
                    <GalleryCard srcs={house?.images?.map(e => `${process.env.api_url}api/house/${house?.id}/image/${e.id}`)}/>
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

const setActive = async (house, setHouse)=>{
    const res = await request("api/house/" + house.id, "POST", {active: !house?.active ? 1 : 0 });
    
    if (res.ok){
        setHouse({ ...house, active: !house?.active });
    }
}

export const getHouse = async (id, setHouse) => {
    const res = await request("api/house/" + id);
    
    if (res.ok){
        setHouse((await res.json()).data);
    }
}

export default ShowHouse;