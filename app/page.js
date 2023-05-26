import React from "react";
import AppBanner from "@/components/App/AppBanner";
import Section from "@/components/App/Section";
import FindPlaceCard from "@/components/FindPlaceCard";
import Button from "@/components/elements/Button";
import Text from "@/components/elements/Text";
import Link from "next/link";


export default function Home() {

    return (
        <main className="w-full grid grid-cols-1 gap-5">
            
            <AppBanner src={`${process.env.api_url}images/bannerBackground.jpg`} />

            <FindPlaceCard />
            
            <Section from={300} to={400} reverse>
                <Text type="h2">Host your place and start earning money</Text>
                <Link href="/house">
                    <Button value="Host" />
                </Link>
            </Section>

            <Section  from={500} to={600} >
                <Text type="h2">What is required to rent a house?</Text>
                <Text>-Bank account and phone and you are good to go.</Text>
            </Section>
        </main>
    )
}
