import { Facebook, Twitter, Linkedin, Mail } from "lucide-react";

export default function BrokerNews() {
    return (
        <div className="bg-white">
            <div className="flex justify-center p-4 lg:p-8">
                <div>
                    <div className="mb-10 grid w-full gap-x-6 lg:max-w-[1290px]">
                        <div>
                            <div className="grid gap-x-10 gap-y-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-[1fr_300px]">
                                {/* Main Content Column */}
                                <div className="order-1">
                                    <div className="lg:gap-x-6">
                                        <div className="grid w-full gap-y-6">
                                            {/* Article Header */}
                                            <div className="grid gap-y-6">
                                                <div>
                                                    <div className="flex flex-col justify-center self-stretch font-serif">
                                                        <h1 className="m-0 text-2xl font-bold text-black sm:leading-[40px] md:text-3xl lg:text-4xl">
                                                            Rockpoint picks New
                                                            York for its first
                                                            major post - COVID
                                                            office investment
                                                        </h1>
                                                    </div>
                                                    <div className="mt-2 flex flex-col justify-center self-stretch font-serif text-lg leading-8 tracking-[0.01px] text-[#47535F] md:mt-4 lg:text-2xl">
                                                        Boston firm buys 49 %
                                                        stake in SL Green’s 100
                                                        Park Ave.
                                                    </div>
                                                </div>

                                                {/* Main Image */}
                                                <div>
                                                    <div className="mx-[-16px] shrink-0 lg:mx-0">
                                                        <img
                                                            width="100%"
                                                            height="100%"
                                                            src="https://costar.brightspotcdn.com/dims4/default/4fc56ca/2147483647/strip/true/crop/2100x1401+0+0/resize/2100x1401!/quality/100/?url=http%3A%2F%2Fcostar-brightspot.s3.us-east-1.amazonaws.com%2F9f%2Fac%2F37878b9a4499b1c2ad8b97f135e2%2F100-park-avenue-2-costar.jpg"
                                                            alt="Rockpoint has bought a 49% stake in 100 Park Ave., just south of Grand Central Terminal. (CoStar)"
                                                        />
                                                    </div>
                                                    <div className="mt-[8px] flex flex-col self-stretch font-sans text-sm font-normal leading-6 text-gray-700">
                                                        <figcaption>
                                                            Rockpoint has bought
                                                            a 49 % stake in 100
                                                            Park Ave., just
                                                            south of Grand
                                                            Central Terminal.
                                                            (CoStar)
                                                        </figcaption>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Byline & Share */}
                                            <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                                                <div className="flex flex-col gap-y-2">
                                                    <div className="flex flex-col gap-y-1 font-serif text-base font-bold">
                                                        <div>
                                                            By{" "}
                                                            <span className="text-[#0559B3]">
                                                                {" "}
                                                                Andria Cheng{" "}
                                                            </span>
                                                        </div>
                                                        <span className="font-sans text-sm font-normal text-gray-700">
                                                            {" "}
                                                            CoStar News{" "}
                                                        </span>
                                                    </div>
                                                    <div className="font-serif text-base font-normal">
                                                        January 6, 2026 | 3: 52
                                                        P.M.
                                                    </div>
                                                </div>
                                                <div className="items-center">
                                                    <div className="flex gap-[10px]">
                                                        <a
                                                            href="#"
                                                            className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors"
                                                        >
                                                            <Facebook className="h-5 w-5 text-gray-600" />
                                                        </a>
                                                        <a
                                                            href="#"
                                                            className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors"
                                                        >
                                                            <Twitter className="h-5 w-5 text-gray-600" />
                                                        </a>
                                                        <a
                                                            href="#"
                                                            className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors"
                                                        >
                                                            <Linkedin className="h-5 w-5 text-gray-600" />
                                                        </a>
                                                        <a
                                                            href="#"
                                                            className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors"
                                                        >
                                                            <Mail className="h-5 w-5 text-gray-600" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Article Body */}
                                            <div className="article-body-html font-serif text-lg leading-8 text-gray-900 space-y-4">
                                                <p>
                                                    Rockpoint is showing its
                                                    taste for New York again
                                                    with the Boston - based real
                                                    estate private equity firm’s
                                                    first major post - pandemic
                                                    office investment.
                                                </p>
                                                <p>
                                                    SL Green Realty, Manhattan’s
                                                    largest office landlord,
                                                    sold to Rockpoint a 49 %
                                                    stake in a renovated
                                                    property just south of Grand
                                                    Central Terminal, the firms
                                                    said Tuesday in a statement.
                                                </p>
                                                <p>
                                                    The deal valued 100 Park
                                                    Ave.at $425 million, they
                                                    said, and comes after SL
                                                    Green last year bought back
                                                    a 49.9 % interest in the
                                                    property from its previous
                                                    joint venture partner, PGIM,
                                                    according to CoStar data.
                                                </p>
                                                <p>
                                                    Manhattan’s office leasing
                                                    last year rose 20.1 % from a
                                                    year earlier to 42.9 million
                                                    square feet, its highest
                                                    level since 2014, according
                                                    to a study from the
                                                    brokerage Savills.Demand has
                                                    been driven by tenants
                                                    seeking new or renovated
                                                    office properties near
                                                    transit hubs such as Grand
                                                    Central, leading to what a
                                                    separate Colliers report
                                                    described as Manhattan’s
                                                    office rebound reaching{" "}
                                                    <a
                                                        href="#"
                                                        className="text-blue-600 underline"
                                                    >
                                                        {" "}
                                                        a “watershed” moment.
                                                    </a>
                                                </p>
                                                <p>
                                                    The transaction “underscores
                                                    the strength of high -
                                                    quality office assets in
                                                    premier locations in an
                                                    improving Manhattan office
                                                    market,” SL Green Chief
                                                    Investment Officer Harrison
                                                    Sitomer said in the
                                                    statement.
                                                </p>
                                                <p>
                                                    100 Park, between 40th and
                                                    41st streets, recently
                                                    renovated its amenity center
                                                    on the second floor to
                                                    include a lounge, golf
                                                    simulator, game room,
                                                    personal training studio and
                                                    conference rooms, SL Green
                                                    and Rockpoint said.Major
                                                    tenants include global
                                                    information services company
                                                    AlphaSights, which signed a
                                                    10 - year lease for 192, 630
                                                    square feet in March 2022,
                                                    and corporate turnaround and
                                                    restructuring firm Alvarez &
                                                    Marsal Holdings, which
                                                    signed a 15 - year lease for
                                                    220, 221 square feet in
                                                    December 2024, they said.
                                                </p>
                                                <p>
                                                    Asking rent in the Grand
                                                    Central market, where the
                                                    property sits, has reached a
                                                    record high of $82.14 per
                                                    square foot, above New York
                                                    metro’s average of $60,
                                                    according to a{" "}
                                                    <a
                                                        href="#"
                                                        className="text-blue-600 underline"
                                                    >
                                                        {" "}
                                                        CoStar analysis.
                                                    </a>
                                                </p>
                                                <p>
                                                    “As our first significant
                                                    post - COVID office
                                                    investment, 100 Park
                                                    represents the kind of
                                                    highly targeted opportunity
                                                    that we find attractive
                                                    today given the vibrancy of
                                                    New York and the favorable
                                                    supply / demand dynamics for
                                                    high quality and extremely
                                                    well - located properties
                                                    like this one,” Dan Domb, a
                                                    managing member and chief
                                                    operating officer at
                                                    Rockpoint, said in the
                                                    statement.
                                                </p>
                                                <p>
                                                    Rockpoint has been a
                                                    longtime office investor
                                                    with 106 office deals in the
                                                    United States made over the
                                                    past three decades.Its
                                                    properties in New York
                                                    include 1700 Broadway
                                                    between Times Square and
                                                    Central Park and 412 W. 15th
                                                    St.in the Meatpacking
                                                    District.
                                                </p>
                                                <p>
                                                    The firm isn’t just a buyer
                                                    in Manhattan office
                                                    space.It’s also{" "}
                                                    <a
                                                        href="#"
                                                        className="text-blue-600 underline"
                                                    >
                                                        in the process of
                                                        selling{" "}
                                                    </a>{" "}
                                                    One Dag Hammarskjöld Plaza
                                                    by the United Nations
                                                    headquarters complex at
                                                    about half of what it had
                                                    paid for just before the
                                                    pandemic in 2019.
                                                </p>
                                                <h3 className="text-xl font-bold mt-6 mb-2">
                                                    {" "}
                                                    For the record{" "}
                                                </h3>
                                                <p>
                                                    Adam Spies and Doug Harmon
                                                    of Newmark advised on the
                                                    transaction.
                                                </p>
                                            </div>

                                            {/* Article Footer Socials */}
                                            <div className="border-t border-gray-200 pt-6 mt-8">
                                                <div className="flex flex-col items-center">
                                                    <b className="mb-4">
                                                        {" "}
                                                        Follow us on Social
                                                        Media{" "}
                                                    </b>
                                                    <div className="flex gap-4">
                                                        <a
                                                            href="#"
                                                            className="p-2 bg-gray-100 rounded-full hover:bg-blue-50"
                                                        >
                                                            <Facebook className="text-blue-600 w-8 h-8" />
                                                        </a>
                                                        <a
                                                            href="#"
                                                            className="p-2 bg-gray-100 rounded-full hover:bg-blue-50"
                                                        >
                                                            <Twitter className="text-blue-400 w-8 h-8" />
                                                        </a>
                                                        <a
                                                            href="#"
                                                            className="p-2 bg-gray-100 rounded-full hover:bg-blue-50"
                                                        >
                                                            <Linkedin className="text-blue-700 w-8 h-8" />
                                                        </a>
                                                    </div>
                                                    <div className="mt-4 text-center">
                                                        <b>
                                                            Have feedback or
                                                            questions ? Email us
                                                            at{" "}
                                                            <a
                                                                href="mailto:news@costar.com"
                                                                className="text-blue-600 hover:underline"
                                                            >
                                                                {" "}
                                                                news@costar.com
                                                            </a>
                                                        </b>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Sidebar Column */}
                                <div className="order-2 lg:order-2">
                                    <div className="flex flex-col gap-y-10">
                                        {/* Related Articles */}
                                        <div className="flex flex-col">
                                            <div className="mb-4 flex flex-col">
                                                <div className="m-0 mb-2 flex h-7 flex-row items-center justify-between">
                                                    <h3 className="text-base font-sans font-bold leading-9 uppercase text-gray-900 border-b-2 border-transparent">
                                                        {" "}
                                                        RELATED ARTICLES{" "}
                                                    </h3>
                                                </div>
                                                <hr className="m-0 border-x-0 border-b-0 border-solid border-neutral/50" />
                                            </div>
                                            <div>
                                                <ul className="list-none p-0 m-0">
                                                    <li className="mb-4 pb-4 border-b border-gray-200">
                                                        <a
                                                            className="hover:text-blue-600 cursor-pointer font-serif text-[16px] leading-normal block"
                                                            href="#"
                                                        >
                                                            Miami's newest
                                                            downtown office
                                                            skyscraper
                                                            refinanced in one of
                                                            South Florida's
                                                            biggest deals this
                                                            year
                                                        </a>
                                                    </li>
                                                    <li className="mb-4 pb-4 border-b border-gray-200">
                                                        <a
                                                            className="hover:text-blue-600 cursor-pointer font-serif text-[16px] leading-normal block"
                                                            href="#"
                                                        >
                                                            Olmstead Properties
                                                            makes first
                                                            Manhattan office
                                                            purchase in a decade
                                                        </a>
                                                    </li>
                                                    <li className="mb-4 pb-4 border-b border-gray-200">
                                                        <a
                                                            className="hover:text-blue-600 cursor-pointer font-serif text-[16px] leading-normal block"
                                                            href="#"
                                                        >
                                                            RXR sells Standard
                                                            Motors Products
                                                            Building in Long
                                                            Island City, New
                                                            York
                                                        </a>
                                                    </li>
                                                    <li className="mb-4 pb-4 border-b border-gray-200">
                                                        <a
                                                            className="hover:text-blue-600 cursor-pointer font-serif text-[16px] leading-normal block"
                                                            href="#"
                                                        >
                                                            Office - to -
                                                            residential project
                                                            connected to
                                                            Pfizer's former
                                                            Manhattan home lands
                                                            financing
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="hover:text-blue-600 cursor-pointer font-serif text-[16px] leading-normal block"
                                                            href="#"
                                                        >
                                                            Morgan Properties
                                                            pays $501 million
                                                            for apartments in
                                                            year's largest US
                                                            multifamily deal
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        {/* In This Article */}
                                        <div className="flex flex-col lg:sticky lg:top-6">
                                            <div className="mb-4 flex flex-col">
                                                <div className="m-0 mb-2 flex h-7 flex-row items-center justify-between">
                                                    <h3 className="text-base font-sans font-bold leading-9 uppercase text-gray-900">
                                                        {" "}
                                                        IN THIS ARTICLE{" "}
                                                    </h3>
                                                </div>
                                                <hr className="m-0 border-x-0 border-b-0 border-solid border-neutral/50" />
                                            </div>
                                            <div>
                                                <ul className="list-none p-0 m-0 space-y-4">
                                                    {/* Properties */}
                                                    <li>
                                                        <div className="mb-4">
                                                            <span className="mb-2 block font-sans text-base font-bold leading-6">
                                                                {" "}
                                                                Properties{" "}
                                                            </span>
                                                            <ul>
                                                                <li className="mb-2">
                                                                    <div>
                                                                        <a
                                                                            className="text-blue-600 hover:underline text-base font-normal font-sans block"
                                                                            href="#"
                                                                        >
                                                                            {" "}
                                                                            The
                                                                            Emporis
                                                                            Building{" "}
                                                                        </a>
                                                                        <p className="m-0 font-sans text-sm text-gray-600">
                                                                            {" "}
                                                                            100
                                                                            Park
                                                                            Ave,
                                                                            New
                                                                            York,
                                                                            NY{" "}
                                                                        </p>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </li>
                                                    {/* Companies */}
                                                    <li>
                                                        <div className="mb-4">
                                                            <span className="mb-2 block font-sans text-base font-bold leading-6">
                                                                {" "}
                                                                Companies{" "}
                                                            </span>
                                                            <ul>
                                                                <li className="mb-2">
                                                                    <div>
                                                                        <a
                                                                            className="text-blue-600 hover:underline text-base font-normal font-sans block"
                                                                            href="#"
                                                                        >
                                                                            {" "}
                                                                            SL
                                                                            Green
                                                                            Realty
                                                                            Corp.
                                                                        </a>
                                                                        <p className="m-0 font-sans text-sm text-gray-600">
                                                                            {" "}
                                                                            Real
                                                                            Estate{" "}
                                                                        </p>
                                                                    </div>
                                                                </li>
                                                                <li className="mb-2">
                                                                    <div>
                                                                        <a
                                                                            className="text-blue-600 hover:underline text-base font-normal font-sans block"
                                                                            href="#"
                                                                        >
                                                                            {" "}
                                                                            Rockpoint{" "}
                                                                        </a>
                                                                        <p className="m-0 font-sans text-sm text-gray-600">
                                                                            {" "}
                                                                            Real
                                                                            Estate{" "}
                                                                        </p>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </li>
                                                    {/* Contacts */}
                                                    <li>
                                                        <div className="mb-4">
                                                            <span className="mb-2 block font-sans text-base font-bold leading-6">
                                                                {" "}
                                                                Contacts{" "}
                                                            </span>
                                                            <ul>
                                                                <li className="mb-2">
                                                                    <div>
                                                                        <a
                                                                            className="text-blue-600 hover:underline text-base font-normal font-sans block"
                                                                            href="#"
                                                                        >
                                                                            {" "}
                                                                            Adam
                                                                            Spies{" "}
                                                                        </a>
                                                                        <p className="m-0 font-sans text-sm text-gray-600">
                                                                            {" "}
                                                                            Co -
                                                                            Head
                                                                            of
                                                                            U.S.Capital
                                                                            Markets,
                                                                            Newmark{" "}
                                                                        </p>
                                                                    </div>
                                                                </li>
                                                                <li className="mb-2">
                                                                    <div>
                                                                        <a
                                                                            className="text-blue-600 hover:underline text-base font-normal font-sans block"
                                                                            href="#"
                                                                        >
                                                                            {" "}
                                                                            Douglas
                                                                            Harmon{" "}
                                                                        </a>
                                                                        <p className="m-0 font-sans text-sm text-gray-600">
                                                                            {" "}
                                                                            Co -
                                                                            Head
                                                                            of
                                                                            U.S.Capital
                                                                            Markets,
                                                                            Newmark{" "}
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

            {/* Footer styled similar to the snippet */}
            <div className="border-t border-gray-200 bg-gray-50 py-6 px-4">
                <div className="max-w-[1290px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-6">
                        <div className="text-2xl font-bold italic tracking-tighter text-blue-900">
                            {" "}
                            CoStar{" "}
                        </div>
                        <div className="flex gap-6 text-sm text-gray-600">
                            <a
                                href="#"
                                className="hover:text-blue-600 hover:underline"
                            >
                                {" "}
                                Help with Features{" "}
                            </a>
                            <a
                                href="#"
                                className="hover:text-blue-600 hover:underline"
                            >
                                {" "}
                                Request Training{" "}
                            </a>
                            <a
                                href="#"
                                className="hover:text-blue-600 hover:underline"
                            >
                                {" "}
                                Share Feedback{" "}
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>© 2026 CoStar Group.All rights reserved.</span>
                        <a
                            href="#"
                            className="hover:text-blue-600 hover:underline"
                        >
                            {" "}
                            Terms of Use{" "}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
