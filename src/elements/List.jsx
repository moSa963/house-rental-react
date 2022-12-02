import React from "react";
import Text from "./Text";
import {BsCircle} from "react-icons/bs";

const Skeleton = () => {

    return (
        <div className="w-full">
            <div className="bg-slate-600 w-full rounded-sm h-3 mb-1 animate-pulse"></div>
            <div className="w-full pl-4">
                <Text />
                <Text />
                <Text />
            </div>
        </div>
    );
}

const Item = ({ value, index, Icon=BsCircle, actions, onAction })=>{


    return (
        <div className="w-full flex items-center my-2 bg-level3 p-1 rounded-md shadow-sm">
            <Icon className="h-3 w-3 mr-2"/>
            <Text>{value}</Text>
            {
                actions && actions.map((Element, i) => 
                    <div key={i} className="ml-2 rounded-full hover:opacity-50 border-2 border-primary cursor-pointer" onClick={()=>onAction&&onAction(i, index)}>
                        <Element className="h-4 w-4"/>
                    </div>
                )
            }
        </div>
    );
}

const List = ({ title, list, Icon, actions, onAction}) => {

    if (!list) return <Skeleton />

    return (
        <div className="w-full">
            <Text type="h4">{title}</Text>
            <div className="w-full pl-4">
                {
                    list.map((e, i) => <Item key={i} Icon={Icon} index={i} value={e} actions={actions} onAction={onAction}/>)
                }
            </div>
        </div>
    );
}


export default List;