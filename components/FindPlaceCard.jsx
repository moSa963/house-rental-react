"use client"
import React from "react";
import TextInput from "./elements/TextInput";
import Text from "./elements/Text";
import Link from "next/link";
import Button from "./elements/Button";
import Section from "./App/Section";


export default function FindPlaceCard() {
    const [data, setData] = React.useState({});

    const handleInput = (key, value) => {
        data[key] = value;
        setData({ ...data });
    }

    return (
        <Section from={0} to={0} >
            <div className="w-full max-w-2xl bg-level2 p-4 rounded-md border-2 border-primary grid grid-cols-1 gap-5">
                <Text type="h3">Find a place now</Text>
                <div className="grid grid-cols-1 bg-inherit sm:grid-cols-2 gap-5">
                    <TextInput title="Country" onInput={(v) => handleInput("country", v)} value={data?.country} />
                    <TextInput title="City" onInput={(v) => handleInput("city", v)} value={data?.city} />
                </div>
                <div className="flex justify-end">
                    <Link href={`house/list?country=${data?.country || ""}&city=${data?.city || ""}`}>
                        <Button value="Find" />
                    </Link>
                </div>
            </div>
        </Section>

    )
}
