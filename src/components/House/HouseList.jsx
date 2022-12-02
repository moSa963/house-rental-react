import React from 'react';
import HouseCard from "./HouseCard";


const HouseList = ({ list, next, onLoadNext }) => {

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 w-full'>
            {
                list && list.map(e => <HouseCard key={e.id} house={e}/>)
            }
            {
                next &&                 
                <div className="col-span-full text-center hover:scale-110 hover:text-blue-600 cursor-pointer" onClick={onLoadNext}>
                    <p>more?</p>
                </div>
            }
        </div>
    );
}


export default HouseList;