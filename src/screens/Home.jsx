import React from "react";
import { Link } from "react-router-dom";
import AppBanner from "../components/App/AppBanner";
import Section from "../components/App/Section";
import Button from "../elements/Button";
import Text from "../elements/Text";
import TextInput from "../elements/TextInput";
import { APP_URL } from "../utils/Request";


const Home = () => {
    const [data, setData] = React.useState({});
    
    const handleInput = (key, value) => {
        data[key] = value;
        setData({...data});
    }

    return (
        <div className="w-full grid grid-cols-1 gap-5">
            
            <AppBanner src={APP_URL + "images/bannerBackground.jpg"} />

            <Section from={0} to={0} >
                <div className="w-full max-w-2xl bg-level2 p-4 rounded-md border-2 border-primary grid grid-cols-1 gap-5">
                    <Text type="h3">Find a place now</Text>
                    <div className="grid grid-cols-1 bg-inherit sm:grid-cols-2 gap-5">
                        <TextInput title="Country" onInput={(v)=>handleInput("country", v)} value={data?.country} />
                        <TextInput title="City" onInput={(v)=>handleInput("city", v)} value={data?.city}/>
                    </div>
                    <div className="flex justify-end">
                        <Link to={`house/list?country=${data?.country || ""}&city=${data?.city|| ""}`}>
                            <Button value="Find" />
                        </Link>
                    </div>
                </div>
            </Section>
            
            <Section from={300} to={400} reverse>
                <Text type="h2">Host your place and start earning money</Text>
                <Link to={"/house"}>
                    <Button value="Host" />
                </Link>
            </Section>

            <Section  from={500} to={600} >
                <Text type="h2">What is required to rent a house?</Text>
                <Text>-Bank account and phone and you are good to go.</Text>
            </Section>
        </div>
    )
}



export default Home;