import { Head, Link } from "@inertiajs/react";
import AppLayout from "../../../Layouts/AppLayout";
import CompanyDetailsHeader from "../../../../Components/Owner/CompanyDetailsHeader";

interface OwnerCompany {
    id: number;
    company: string;
    owner_type?: string;
}

interface PageProps {
    company: OwnerCompany;
}

export default function News({ company }: PageProps) {
    const tabs = [
        {
            id: "summary",
            label: "Summary",
            href: `/contacts/owners/${company.id}`,
        },
        {
            id: "properties",
            label: "Properties",
            href: `/contacts/owners/${company.id}/properties`,
        },
        {
            id: "transactions",
            label: "Transactions",
            href: `/contacts/owners/${company.id}/transactions`,
        },
        {
            id: "listings",
            label: "Listings",
            href: `/contacts/owners/${company.id}/listings`,
        },
        {
            id: "funds",
            label: "Funds",
            href: `/contacts/owners/${company.id}/funds`,
        },
        {
            id: "tenants",
            label: "Tenants",
            href: `/contacts/owners/${company.id}/tenants`,
        },
        {
            id: "relationships",
            label: "Relationships",
            href: `/contacts/owners/${company.id}/relationships`,
        },
        {
            id: "contacts",
            label: "Contacts",
            href: `/contacts/owners/${company.id}/contacts`,
        },
        {
            id: "news",
            label: "News",
            href: `/contacts/owners/${company.id}/news`,
        },
    ];

    return (
        <AppLayout>
            <Head title={`${company.company} - News`} />

            <div className="bg-gray-50 min-h-screen">
                {/* Company Header */}
                <div className="bg-white border-b border-gray-200">
                    <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8 py-2">
                        <CompanyDetailsHeader company={company} />

                        {/* Tabs */}
                        <div className="border-b border-gray-200 mt-6">
                            <nav className="-mb-px flex space-x-8">
                                {tabs.map((tab) => (
                                    <Link
                                        key={tab.id}
                                        href={tab.href}
                                        className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
                                            tab.id === "news"
                                                ? "border-red-500 text-red-600"
                                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                        }`}
                                    >
                                        {tab.label}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>

                {/* News Article Content */}
                <div className="flex justify-center p-4 lg:p-8">
                    <div>
                        <div className="mb-10 grid w-full gap-x-6 lg:max-w-[1290px]">
                            <div>
                                <div className="grid gap-x-10 gap-y-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-[1fr_300px]">
                                    {/* Main Article Content */}
                                    <div className="order-1">
                                        <div className="lg:gap-x-6">
                                            <div className="grid w-full gap-y-6">
                                                <div className="grid gap-y-6">
                                                    {/* Article Title */}
                                                    <div>
                                                        <div className="flex flex-col justify-center self-stretch font-serif">
                                                            <h1 className="m-0 text-2xl font-bold text-black sm:leading-10 md:text-3xl lg:text-4xl">
                                                                Indurent
                                                                appoints head of
                                                                investment
                                                                transactions
                                                            </h1>
                                                        </div>
                                                        <div className="mt-2 flex flex-col justify-center self-stretch font-serif text-lg leading-8 tracking-[0.01px] text-[#47535F] md:mt-4 lg:text-2xl">
                                                            Former deputy Will
                                                            Lutton take reins
                                                            from James Cooper
                                                        </div>
                                                    </div>

                                                    {/* Article Image */}
                                                    <div>
                                                        <div className="mx-[-16px] shrink-0 lg:mx-0">
                                                            <img
                                                                width="100%"
                                                                height="100%"
                                                                src="https://costar.brightspotcdn.com/dims4/default/1a24efb/2147483647/strip/true/crop/3000x3000+0+0/resize/2100x2100!/quality/100/?url=http%3A%2F%2Fcostar-brightspot.s3.us-east-1.amazonaws.com%2F28%2Fce%2F400f377a40ec8dad49c686d97db4%2Fwill-lutton.%20%28Indurent%29.jpg"
                                                                alt="Will Lutton. (Indurent)"
                                                            />
                                                        </div>
                                                        <div className="mt-2 flex flex-col self-stretch text-sm font-normal leading-6 text-gray-700">
                                                            <figcaption>
                                                                Will Lutton.
                                                                (Indurent)
                                                            </figcaption>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Article Byline and Share */}
                                                <div className="flex justify-between">
                                                    <div className="flex flex-col gap-y-2">
                                                        <div className="flex flex-col gap-y-1 font-serif text-base font-bold">
                                                            <div>
                                                                By{" "}
                                                                <a
                                                                    className="text-[#0559B3]"
                                                                    href="#"
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                >
                                                                    Luke Haynes
                                                                </a>
                                                            </div>
                                                            <span className="font-sans text-sm font-normal text-gray-700">
                                                                Tenantshq News
                                                            </span>
                                                        </div>
                                                        <div className="font-serif text-base font-normal">
                                                            January 9, 2026 |
                                                            8:46 AM
                                                        </div>
                                                    </div>
                                                    <div className="items-center">
                                                        <div className="flex gap-[10px]">
                                                            <a
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                href="#"
                                                                title="Share on Facebook"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="25"
                                                                    height="24"
                                                                    fill="none"
                                                                >
                                                                    <path
                                                                        fill="#929292"
                                                                        fillRule="evenodd"
                                                                        d="M.857 12c0-6.627 5.373-12 12-12s12 5.373 12 12-5.373 12-12 12-12-5.373-12-12m13.1 7.19V12h2l.23-2.49h-2.23V8.28c0-.65.08-1 1-1h1.28V4.8h-2c-2.39 0-2.94 1.26-2.94 3.26v1.46h-1.81V12h1.81v7.19z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                </svg>
                                                            </a>
                                                            <a
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                href="#"
                                                                title="Share on Twitter"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="24"
                                                                    height="24"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        fill="#929292"
                                                                        d="M12.1 10.7 9 6.2H7.4l3.7 5.6.5.7 3.3 4.7h1.6l-3.9-5.8z"
                                                                    />
                                                                    <path
                                                                        fill="#929292"
                                                                        d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0m2.3 18L11 13.1 7 18H6l4.6-5.6-4.6-7h3.6l3 4.6 3.8-4.7h1.1l-4.4 5.4 4.8 7.3z"
                                                                    />
                                                                </svg>
                                                            </a>
                                                            <a
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                href="#"
                                                                title="Share on LinkedIn"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="25"
                                                                    height="24"
                                                                    fill="none"
                                                                >
                                                                    <path
                                                                        fill="#929292"
                                                                        fillRule="evenodd"
                                                                        d="M.428 12c0-6.627 5.373-12 12-12 6.628 0 12 5.373 12 12s-5.372 12-12 12c-6.627 0-12-5.373-12-12m6.009 6h2.571V7.714H6.437zM7.732 6.857a1.286 1.286 0 1 1-.019-2.571 1.286 1.286 0 0 1 .019 2.571M16.437 18h2.857v-6.28c0-3.438-1.905-4.006-2.857-4.006a4.76 4.76 0 0 0-2.857.98v-.98h-2.858V18h2.858v-6.358c.226-.794.959-1.32 1.761-1.263.886 0 1.096.519 1.096 1.263z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                </svg>
                                                            </a>
                                                            <a
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                href="#"
                                                                title="Email Article"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="25"
                                                                    height="24"
                                                                    fill="none"
                                                                >
                                                                    <path
                                                                        fill="#929292"
                                                                        fillRule="evenodd"
                                                                        d="M12.709 0C5.759 0 .183 5.922.754 12.99a11.97 11.97 0 0 0 11.053 10.977c7.036.514 12.906-5.043 12.906-11.972C24.713 5.368 19.338 0 12.71 0"
                                                                        clipRule="evenodd"
                                                                    />
                                                                    <path
                                                                        fill="#FEFEFE"
                                                                        fillRule="evenodd"
                                                                        d="m11 12.317 1.56 1.317a.23.23 0 0 0 .153.053q.087 0 .154-.053l1.561-1.318 4.41 3.724H6.59L11 12.316M6.285 8.334l4.41 3.725-4.41 3.724zm12.551-.258-6.124 5.174L6.59 8.076zm.305 7.707-4.41-3.724 4.411-3.725v7.449m0-8.069H6.285c-.237 0-.429.162-.429.362v7.964c0 .2.192.363.43.363h12.856c.237 0 .429-.162.429-.363V8.076c0-.2-.193-.362-.43-.362"
                                                                        clipRule="evenodd"
                                                                    />
                                                                </svg>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Article Body */}
                                            <div className="mt-6">
                                                <div className="prose max-w-none">
                                                    <p>
                                                        Indurent, Blackstone's
                                                        developer, owner and
                                                        operator of UK big-box
                                                        properties, has
                                                        appointed Will Lutton to
                                                        head of investment
                                                        transactions as James
                                                        Cooper departs after
                                                        four years.
                                                    </p>
                                                    <p>
                                                        Lutton will lead the
                                                        transactions team and
                                                        oversee investment
                                                        strategy and execution
                                                        across the business. He
                                                        was deputy head of
                                                        transactions at the
                                                        firm, a role that meant
                                                        he was involved in all
                                                        new transactions and
                                                        oversee key processes
                                                        related to onboarding
                                                        and valuations across
                                                        the portfolio.
                                                    </p>
                                                    <p>
                                                        He spent seven years in
                                                        asset management and
                                                        investment at Telereal
                                                        Trillium before joining
                                                        C2 Capital, acquired by
                                                        Stenprop in 2017, as an
                                                        investment manager. He
                                                        later became head of
                                                        investment for
                                                        Industrials REIT prior
                                                        to its acquisition by
                                                        Blackstone in 2023.
                                                    </p>
                                                    <p>
                                                        The departing Cooper has
                                                        led the transactions
                                                        function since joining
                                                        St Modwen in 2022, which
                                                        was acquired by
                                                        Blackstone for £1.2
                                                        billion in 2021. It then
                                                        merged with Industrials
                                                        REIT to form Indurent in
                                                        2024.
                                                    </p>
                                                    <p>
                                                        Indurent said Cooper
                                                        played a key role in
                                                        developing its
                                                        investment strategy,
                                                        "sourcing new
                                                        opportunities and
                                                        driving growth across
                                                        the combined business,
                                                        overseeing more than £1
                                                        billion of new
                                                        acquisitions and
                                                        developments" in its
                                                        first year.
                                                    </p>
                                                    <p>
                                                        Julian Carey, chief
                                                        executive of Indurent,
                                                        said in a statement:
                                                        "Will's appointment
                                                        reflects both the
                                                        strength of talent
                                                        within Indurent and his
                                                        exceptional contribution
                                                        over recent years. He
                                                        brings deep expertise in
                                                        industrial investment, a
                                                        strong strategic
                                                        mindset, and a
                                                        collaborative leadership
                                                        style that aligns
                                                        perfectly with our
                                                        ambitions for the
                                                        business.
                                                    </p>
                                                    <p>
                                                        "I would also like to
                                                        extend my sincere thanks
                                                        to James for the
                                                        important role he has
                                                        played in helping to
                                                        build Indurent into the
                                                        market-leading platform
                                                        it is today. We wish him
                                                        every success for the
                                                        future."
                                                    </p>
                                                    <p>
                                                        Cooper added: "It's been
                                                        an honour and a pleasure
                                                        to lead St Modwen and
                                                        latterly Indurent's
                                                        Investment Team over the
                                                        last four years, and
                                                        oversee the acquisition
                                                        of over £2.5 billion of
                                                        assets in that time.
                                                        With the business now
                                                        firmly established as a
                                                        leading player in the
                                                        industrial and logistics
                                                        market, it feels like
                                                        the right time to step
                                                        away, enjoy some time
                                                        with my family and seek
                                                        a new challenge."
                                                    </p>
                                                    <p>
                                                        In October, real estate
                                                        funds advised by
                                                        affiliates of Indurent's
                                                        owner Blackstone{" "}
                                                        <a
                                                            href="#"
                                                            className="text-blue-600 hover:text-blue-800 underline"
                                                        >
                                                            completed the sale
                                                            of a £1.04 billion
                                                            logistics portfolio
                                                        </a>{" "}
                                                        to Tritax Big Box REIT,
                                                        which was one of the
                                                        largest industrial deals
                                                        of the year in the UK.
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Article Footer */}
                                            <div className="mt-6">
                                                <div className="flex flex-col gap-y-4">
                                                    <div>
                                                        <b>
                                                            Follow us on Social
                                                            Media
                                                        </b>
                                                        <div className="mt-2 flex gap-4">
                                                            <a
                                                                href="#"
                                                                rel="noopener noreferrer"
                                                                target="_blank"
                                                                title="Share on Facebook"
                                                            >
                                                                <svg
                                                                    width="36px"
                                                                    height="36px"
                                                                    viewBox="0 0 36 36"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <circle
                                                                        cx="18"
                                                                        cy="18"
                                                                        r="18"
                                                                        fill="#808080"
                                                                    />
                                                                    <path
                                                                        d="M22.65,18 L19.65,18 L19.65,28.785 L15.66,28.785 L15.66,18 L12.945,18 L12.945,14.28 L15.66,14.28 L15.66,12.09 C15.66,9.09 16.485,7.2 20.07,7.2 L23.07,7.2 L23.07,10.92 L21.15,10.92 C19.77,10.92 19.65,11.445 19.65,12.42 L19.65,14.265 L22.995,14.265 L22.65,18 Z"
                                                                        fill="white"
                                                                    />
                                                                </svg>
                                                            </a>
                                                            <a
                                                                href="#"
                                                                rel="noopener noreferrer"
                                                                target="_blank"
                                                                title="Share on Twitter"
                                                            >
                                                                <svg
                                                                    width="36"
                                                                    height="36"
                                                                    viewBox="0 0 36 36"
                                                                    fill="none"
                                                                >
                                                                    <circle
                                                                        cx="18"
                                                                        cy="18"
                                                                        r="18"
                                                                        fill="#808080"
                                                                    />
                                                                    <path
                                                                        d="M19.7124 16.066L26.4133 8H24.8255L19.0071 15.0036L14.3599 8H9L16.0274 18.5906L9 27.049H10.588L16.7324 19.653L21.6401 27.049H27L19.7121 16.066H19.7124ZM17.5375 18.6839L16.8255 17.6294L11.1602 9.23788H13.5992L18.1712 16.0101L18.8832 17.0647L24.8262 25.8675H22.3871L17.5375 18.6843V18.6839Z"
                                                                        fill="white"
                                                                    />
                                                                </svg>
                                                            </a>
                                                            <a
                                                                href="#"
                                                                rel="noopener noreferrer"
                                                                target="_blank"
                                                                title="Share on LinkedIn"
                                                            >
                                                                <svg
                                                                    width="36px"
                                                                    height="36px"
                                                                    viewBox="0 0 36 36"
                                                                >
                                                                    <circle
                                                                        cx="18"
                                                                        cy="18"
                                                                        r="18"
                                                                        fill="#808080"
                                                                    />
                                                                    <path
                                                                        d="M13.5,26.715 L9,26.715 L9,10.965 L13.5,10.965 L13.5,26.715 Z M11.4,10.005 C10.5432235,10.0110766 9.76742606,9.49964395 9.43533279,8.70982314 C9.10323952,7.92000233 9.28046866,7.00785385 9.88415649,6.39985396 C10.4878443,5.79185407 11.3987083,5.60813734 12.1908727,5.93460078 C12.9830372,6.26106421 13.5,7.03320198 13.5,7.89 C13.5,9.05224937 12.5622201,9.9967571 11.4,10.005 L11.4,10.005 Z M29.235,26.715 L24.735,26.715 L24.735,16.98 C24.735,15.84 24.405,15.045 23.01,15.045 C21.7454861,14.9587193 20.5911718,15.7636196 20.235,16.98 L20.235,26.715 L15.735,26.715 L15.735,10.965 L20.235,10.965 L20.235,12.465 C21.5376981,11.499909 23.1137869,10.9745461 24.735,10.965 C26.235,10.965 29.235,11.835 29.235,17.1 L29.235,26.715 Z"
                                                                        fill="white"
                                                                    />
                                                                </svg>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <b>
                                                            Have feedback or
                                                            questions? Email us
                                                            at{" "}
                                                            <a
                                                                href="mailto:news@tenantshq.com"
                                                                className="text-blue-600 hover:text-blue-800 underline"
                                                            >
                                                                news@tenantshq.com
                                                            </a>
                                                        </b>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sidebar - Related Articles */}
                                    <div className="order-4 lg:order-2">
                                        <div className="flex flex-col gap-y-10">
                                            <div className="flex flex-col">
                                                <div className="mb-4 flex flex-col">
                                                    <div className="m-0 mb-2 flex h-7 flex-row items-center justify-between">
                                                        <h3 className="text-base font-sans font-bold leading-9">
                                                            RELATED ARTICLES
                                                        </h3>
                                                    </div>
                                                    <hr className="m-0 border-x-0 border-b-0 border-solid border-gray-300" />
                                                </div>
                                                <div>
                                                    <ul className="list-none p-0">
                                                        <li>
                                                            <div>
                                                                <div className="mb-4">
                                                                    <a
                                                                        className="text-blue-600 hover:text-blue-800 cursor-pointer font-serif text-base leading-normal focus:text-black hover:underline"
                                                                        href="#"
                                                                    >
                                                                        Big CMBS
                                                                        loans
                                                                        face
                                                                        January
                                                                        reckoning;
                                                                        Clipper
                                                                        resolves
                                                                        office
                                                                        default;
                                                                        Oregon
                                                                        mall
                                                                        sale
                                                                        revived
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <hr className="mb-4 mt-0 border-x-0 border-b-0 border-solid border-gray-300" />
                                                        </li>
                                                        <li>
                                                            <div>
                                                                <div className="mb-4">
                                                                    <a
                                                                        className="text-blue-600 hover:text-blue-800 cursor-pointer font-serif text-base leading-normal focus:text-black hover:underline"
                                                                        href="#"
                                                                    >
                                                                        The
                                                                        nation's
                                                                        biggest
                                                                        AI data
                                                                        centers
                                                                        are
                                                                        taking
                                                                        root in
                                                                        some
                                                                        unexpected
                                                                        places
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <hr className="mb-4 mt-0 border-x-0 border-b-0 border-solid border-gray-300" />
                                                        </li>
                                                        <li>
                                                            <div>
                                                                <div className="mb-4">
                                                                    <a
                                                                        className="text-blue-600 hover:text-blue-800 cursor-pointer font-serif text-base leading-normal focus:text-black hover:underline"
                                                                        href="#"
                                                                    >
                                                                        PLP and
                                                                        Indurent
                                                                        get
                                                                        started
                                                                        on XL
                                                                        East
                                                                        Midlands
                                                                        logistics
                                                                        project
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <hr className="mb-4 mt-0 border-x-0 border-b-0 border-solid border-gray-300" />
                                                        </li>
                                                        <li>
                                                            <div>
                                                                <div className="mb-4">
                                                                    <a
                                                                        className="text-blue-600 hover:text-blue-800 cursor-pointer font-serif text-base leading-normal focus:text-black hover:underline"
                                                                        href="#"
                                                                    >
                                                                        SL Green
                                                                        secures
                                                                        CMBS
                                                                        financing
                                                                        for $730
                                                                        million
                                                                        New York
                                                                        tower
                                                                        purchase
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <hr className="mb-4 mt-0 border-x-0 border-b-0 border-solid border-gray-300" />
                                                        </li>
                                                        <li>
                                                            <div>
                                                                <div className="mb-4">
                                                                    <a
                                                                        className="text-blue-600 hover:text-blue-800 cursor-pointer font-serif text-base leading-normal focus:text-black hover:underline"
                                                                        href="#"
                                                                    >
                                                                        Blackstone
                                                                        to buy
                                                                        Tokyo
                                                                        logistics
                                                                        property
                                                                        for $667
                                                                        million
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sidebar - In This Article */}
                                    <div className="order-3 lg:order-4">
                                        <div className="top-6 flex grow flex-col lg:sticky">
                                            <div className="mb-4 flex flex-col">
                                                <div className="m-0 mb-2 flex h-7 flex-row items-center justify-between">
                                                    <h3 className="text-base font-sans font-bold leading-9">
                                                        IN THIS ARTICLE
                                                    </h3>
                                                </div>
                                                <hr className="m-0 border-x-0 border-b-0 border-solid border-gray-300" />
                                            </div>
                                            <div>
                                                <ul className="list-none p-0">
                                                    <li>
                                                        <div className="mb-4">
                                                            <span className="mb-4 inline-block font-sans text-base font-bold leading-6">
                                                                Companies
                                                            </span>
                                                            <ul className="list-none p-0">
                                                                <li className="mb-2">
                                                                    <div>
                                                                        <a
                                                                            className="text-blue-600 hover:text-blue-800 cursor-pointer text-base font-normal items-center font-sans hover:underline"
                                                                            href="#"
                                                                        >
                                                                            Indurent
                                                                        </a>
                                                                        <p className="m-0 font-sans text-base font-normal leading-6 text-gray-700">
                                                                            Construction
                                                                        </p>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="mb-4">
                                                            <span className="mb-4 inline-block font-sans text-base font-bold leading-6">
                                                                Contacts
                                                            </span>
                                                            <ul className="list-none p-0">
                                                                <li className="mb-2">
                                                                    <div>
                                                                        <a
                                                                            className="text-blue-600 hover:text-blue-800 cursor-pointer text-base font-normal items-center font-sans hover:underline"
                                                                            href="#"
                                                                        >
                                                                            Will
                                                                            Lutton
                                                                        </a>
                                                                        <p className="m-0 font-sans text-base font-normal leading-6 text-gray-700">
                                                                            Deputy
                                                                            Head
                                                                            of
                                                                            Transactions,
                                                                            Indurent
                                                                        </p>
                                                                    </div>
                                                                </li>
                                                                <li className="mb-2">
                                                                    <div>
                                                                        <a
                                                                            className="text-blue-600 hover:text-blue-800 cursor-pointer text-base font-normal items-center font-sans hover:underline"
                                                                            href="#"
                                                                        >
                                                                            James
                                                                            Cooper
                                                                        </a>
                                                                        <p className="m-0 font-sans text-base font-normal leading-6 text-gray-700">
                                                                            Head
                                                                            of
                                                                            Transactions,
                                                                            Indurent
                                                                        </p>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
