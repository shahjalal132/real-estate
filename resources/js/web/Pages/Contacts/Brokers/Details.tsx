import { Head } from "@inertiajs/react";
import AppLayout from "@/web/Layouts/AppLayout";
import BrokerDetailsLayout from "@/Layouts/BrokerDetailsLayout";
import BrokerSidebarCard from "@/Components/Broker/BrokerSidebarCard";
import BrokerSummaryOverview from "@/Components/Broker/BrokerSummaryOverview";
import BrokerDetailsHeader from "@/Components/Broker/BrokerDetailsHeader";
import BrokerProperties from "@/Components/Broker/BrokerProperties";
import BrokerTransactions from "@/Components/Broker/BrokerTransactions";
import BrokerListings from "@/Components/Broker/BrokerListings";
import BrokerContacts from "@/Components/Broker/BrokerContacts";
import BrokerNews from "@/Components/Broker/BrokerNews";
import { Property } from "@/types";

interface BrokerDetailsProps {
    broker: any; // defined in Index.tsx or stricter interface
    properties?: Property[];
    currentTab?: string;
    previousBrokerId?: number | null;
    nextBrokerId?: number | null;
    totalCount?: number;
    currentIndex?: number;
}

export default function BrokerDetails({
    broker,
    properties,
    currentTab,
    previousBrokerId,
    nextBrokerId,
    totalCount,
    currentIndex,
}: BrokerDetailsProps) {
    const tabs = [
        {
            id: "summary",
            label: "Summary",
            href: `/contacts/brokers/${broker.id}`,
        },
        {
            id: "properties",
            label: "Properties",
            href: `/contacts/brokers/${broker.id}/properties`,
        },
        {
            id: "transactions",
            label: "Transactions",
            href: `/contacts/brokers/${broker.id}/transactions`,
        },
        {
            id: "listings",
            label: "Listings",
            href: `/contacts/brokers/${broker.id}/listings`,
        },
        {
            id: "contacts",
            label: "Contacts",
            href: `/contacts/brokers/${broker.id}/contacts`,
        },
        {
            id: "news",
            label: "News",
            href: `/contacts/brokers/${broker.id}/news`,
        },
    ];

    const renderContent = () => {
        switch (currentTab) {
            case "summary":
            default:
                return <BrokerSummaryOverview broker={broker} />;
            case "properties":
                return <BrokerProperties properties={properties || []} />;
            case "transactions":
                return <BrokerTransactions />;
            case "listings":
                return <BrokerListings />;
            case "contacts":
                return <BrokerContacts />;
            case "news":
                return <BrokerNews />;
        }
    };

    return (
        <AppLayout>
            <Head title={`${broker.name} - Broker Details`} />
            <BrokerDetailsLayout
                title={`${broker.name} - Broker Details`}
                tabs={tabs}
                currentIndex={currentIndex}
                totalCount={totalCount}
                previousBrokerId={previousBrokerId}
                nextBrokerId={nextBrokerId}
                basePath="/contacts/brokers"
                headerComponent={
                    <BrokerDetailsHeader
                        broker={broker}
                        tabs={tabs}
                        activeTabId={currentTab || "summary"}
                    />
                }
            >
                <div className="py-8"> {renderContent()} </div>
            </BrokerDetailsLayout>
        </AppLayout>
    );
}
