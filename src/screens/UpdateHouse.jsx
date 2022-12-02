import React from "react";
import ListInput from "../elements/ListInput";
import Button from "../elements/Button";
import { getHouse } from "./ShowHouse";
import { useParams } from "react-router-dom";
import List from "../elements/List";
import {MdOutlineRemove} from "react-icons/md";
import { useRequest } from "../contexts/RequestContext";
import ProgressLinear from "../elements/ProgressLinear";
import UpdateRoomImagesForm from "../components/Form/UpdateRoomImagesForm";
import UpdateHouseInfoForm from "../components/Form/UpdateHouseInfoForm";


const UpdateHouse = () => {
    const [inputs, setInputs] = React.useState({});
    const [house, setHouse] = React.useState({});
    const param = useParams();
    const [processing, setProcessing] = React.useState(false);
    const request = useRequest();
    
    React.useEffect(()=>{
        getHouse(request, param.id, setHouse);
    }, [param.id, request]);

    React.useEffect(()=>{
        house && setInputs({ 
                    name: house?.name,
                    night_cost: house?.night_cost,
                    about: house?.about,
                    features: [""],
                    rules: [""]
                });
    }, [house]);


    const handleSveNewFeatures = async (data)=>{
        setProcessing(true);
        data.pop();
        await addFeatures(request, house?.id, {feature: data}, (v)=>{
            setHouse({...house, features: [...house.features, ...v]});
            inputs["features"] = [];
            setInputs({...inputs});
        });
        setProcessing(false);
    }

    const handleSveNewRules = async (data)=>{
        setProcessing(true);
        data.pop();
        await addRules(request, house?.id, {rule: data}, (v)=>{
            setHouse({...house, rules: [...house.rules, ...v]});
            inputs["rules"] = [];
            setInputs({...inputs});
        });
        setProcessing(false);
    }



    const handleRemoveRule = (rule_id) => {
        setHouse(h => ({...h, rules: house.rules.filter(e => e.id !== rule_id)}));
    }

    const handleRemoveFeature = (feature_id) => {
        setHouse(h => ({...h, features: house.features.filter(e => e.id !== feature_id)}));

    }

    return (
        <div className="w-full grid grid-cols-3 bg-inherit mt-24 max-w-5xl px-2 gap-5">
            <div className="col-span-3">
                <ProgressLinear active={processing} />
            </div>
            <div className="col-span-3 sm:col-span-2 grid grid-cols-1 gap-5">
                <div className="grid grid-cols-1 gap-5 bg-level2 p-4 rounded-lg">
                    <UpdateHouseInfoForm house={house} inputs={inputs} processing={processing} setInputs={setInputs} setProcessing={setProcessing} />
                </div>

                <div className="grid grid-cols-1 gap-5 bg-level2 p-4 rounded-lg">
                    <List title="Features" list={house?.features?.map(e => e.feature)} actions={[MdOutlineRemove]} onAction={(action, index) => removeFeature(request, house.id, house.features[index].id, handleRemoveFeature)}/>
                    <ListInput title="New features" value={inputs?.features} onChange={(v)=>setInputs({...inputs, features: v})} />
                    <div className="flex w-full justify-end">
                        <Button value="Save" onClick={()=>handleSveNewFeatures(inputs?.features)} disabled={processing}/>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-5 bg-level2 p-4 rounded-lg">
                    <List title="Rules" list={house?.rules?.map(e => e.rule)} actions={[MdOutlineRemove]} onAction={(action, index) => removeRule(request, house.id, house.rules[index].id, handleRemoveRule)}/>
                    <ListInput title="New Rules" value={inputs?.rules} onChange={(v)=>setInputs({...inputs, rules: v})}/>
                    <div className="flex w-full justify-end">
                        <Button value="Save" onClick={()=>handleSveNewRules(inputs?.rules)} disabled={processing}/>
                    </div>
                </div>
            </div>
            
            <div className="col-span-3 sm:col-span-1">
                <UpdateRoomImagesForm house={house} setHouse={setHouse} processing={processing} setProcessing={setProcessing} />
            </div>
        </div>
    );
}



const addFeatures = async (request, house_id, data, onAdded)=>{
    const res = await request(`api/house/${house_id}/feature`, "POST", data);
    if (res.ok){
        onAdded((await res.json()).data);
        return;
    }
}

const addRules = async (request, house_id, data, onAdded)=>{
    const res = await request(`api/house/${house_id}/rule`, "POST", data);
    if (res.ok){
        onAdded((await res.json()).data);
    }
}

const removeFeature = async (request, house_id, feature_id, onRemove)=>{
    const res = await request(`api/house/${house_id}/feature/${feature_id}`, "DELETE");
    if (res.ok){
        onRemove(feature_id);
    }
}

const removeRule = async (request, house_id, rule_id, onRemove)=>{
    const res = await request(`api/house/${house_id}/rule/${rule_id}`, "DELETE");
    if (res.ok){
        onRemove(rule_id);
        return;
    }
    
}

export default UpdateHouse;