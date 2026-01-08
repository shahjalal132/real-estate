import { Head, Link } from "@inertiajs/react";
import AppLayout from "../../../Layouts/AppLayout";
import { TennentCompany } from "../../../../types";
import CompanyDetailsHeader from "../../../../Components/Tenant/CompanyDetailsHeader";

interface PageProps {
    company: TennentCompany;
}

export default function News({ company }: PageProps) {
    const tabs = [
        {
            id: "summary",
            label: "Summary",
            href: `/contacts/tenants/${company.id}`,
        },
        {
            id: "locations",
            label: "Locations",
            href: `/contacts/tenants/${company.id}/locations`,
        },
        {
            id: "transactions",
            label: "Transactions",
            href: `/contacts/tenants/${company.id}/transactions`,
        },
        {
            id: "lease_expirations",
            label: "Lease Expirations",
            href: `/contacts/tenants/${company.id}/lease-expirations`,
        },
        {
            id: "contacts",
            label: "Contacts",
            href: `/contacts/tenants/${company.id}/contacts`,
        },
        {
            id: "relationships",
            label: "Relationships",
            href: `/contacts/tenants/${company.id}/relationships`,
        },
        {
            id: "news",
            label: "News",
            href: `/contacts/tenants/${company.id}/news`,
        },
    ];

    // Static article data based on provided HTML
    const article = {
        title: "New ICSC chairman traces role to a long-ago move to Arkansas",
        summary:
            "JP Suarez persuaded his wife to relocate to Bentonville, where he had long career at Walmart",
        imageUrl:
            "https://costar.brightspotcdn.com/dims4/default/b6ddad7/2147483647/strip/true/crop/854x1280+0+0/resize/854x1280!/quality/100/?url=http%3A%2F%2Fcostar-brightspot.s3.us-east-1.amazonaws.com%2F7b%2Ffe%2F02ba004b46efbe1db2c3d2854c88%2Fjp-suarez-granddaughter.jpg",
        imageCaption:
            'John Peter "JP" Suarez, shown here with his granddaughter, is the new chairman of ICSC. (ICSC)',
        author: "Linda Moss",
        authorLink:
            "https://product.costar.com/home/news/author/00000164-a401-d8a0-ab77-b5c5deb90000",
        source: "CoStar News",
        date: "December 17, 2025 | 5:53 P.M.",
        body: [
            'Retail property veteran John Peter "JP" Suarez has had an unusual career path that took him from New Jersey to Washington, D.C., and included serving as an assistant U.S. attorney, a director of gaming enforcement and an assistant administrator for the federal Environmental Protection Agency.',
            "Suarez, the new chairman of global retail real estate trade association ICSC, pictured with his granddaughter, can trace his current position to a big job leap he made in 2004. That's when he joined discount giant Walmart's team. At the ICSC's annual New York conference last week in Manhattan, Suarez described how, while at the EPA, he had met and worked with executives at the retailer.",
            "Walmart tried to recruit him then, but Suarez said he initially had qualms about relocating to the chain's headquarters in Bentonville, Arkansas. Also, as he recounted, the idea also didn't go over too well with his wife. But with three children to put through college, Suarez decided that transferring to the private sector made sense. And his wife agreed to the move south.",
            "Suarez joked that it was a bit of a culture shock to live at the time in a smaller area like Bentonville, CoStar News' Linda Moss reported. But he looks back on it fondly these days, and said the area has since been built up with the help of the Walton family, who founded Walmart, and the economic impact of the retailer, according to Suarez.",
            "Suarez held a variety of positions during his nearly two-decade career at Walmart including president of Walmart Realty, managing the company's real estate portfolio and development strategy. He retired in 2023 and lives with his wife of 31 years in Cape Coral, Florida.",
        ],
        relatedArticles: [
            {
                id: "1",
                title: "HBC, Sears closings at Primaris centers clear path for expanding retailers",
                href: "/tenants/companies/detail/wbbs4mj/news?id=220379524",
            },
            {
                id: "2",
                title: "Walmart buys massive warehouse in Arizona's largest industrial deal of the year",
                href: "/tenants/companies/detail/wbbs4mj/news?id=1627382117",
            },
            {
                id: "3",
                title: "Jobs data could lower odds of rate cut; Walmart raises outlook as sales increase; Thanksgiving shopping crowds may hit record",
                href: "/tenants/companies/detail/wbbs4mj/news?id=1909844454",
            },
            {
                id: "4",
                title: "Walmart CEO Doug McMillon to retire in January from retail giant",
                href: "/tenants/companies/detail/wbbs4mj/news?id=1104005296",
            },
            {
                id: "5",
                title: "Investor seeks to unload Walmart locations in Southeast to focus on multifamily",
                href: "/tenants/companies/detail/wbbs4mj/news?id=1391702504",
            },
        ],
        mentionedCompanies: [
            {
                name: "Walmart Inc.",
                type: "Retailer",
                href: `/contacts/tenants/${company.id}`,
            },
        ],
        mentionedContacts: [
            {
                name: "John Peter Suarez",
                title: "Chairman, International Council of Shopping Centers, Inc.",
                href: "/app/professionals/contacts/detail/pszs0zy/summary",
            },
        ],
    };

    return (
        <AppLayout>
            <Head title={`${company.tenant_name} - News`} />

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

                {/* Article Content */}
                <div className="flex justify-center p-4 lg:p-8">
                    <div className="w-full lg:max-w-[1290px]">
                        <div className="grid gap-x-10 gap-y-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-[1fr_300px]">
                            {/* Main Article Content */}
                            <div className="order-1">
                                <div className="lg:gap-x-6">
                                    {/* Lead Content */}
                                    <div className="grid w-full gap-y-6 mb-6">
                                        {/* Title and Summary */}
                                        <div className="flex flex-col gap-y-2">
                                            <div className="flex-row md:flex md:gap-x-6">
                                                <div className="flex flex-col justify-center pr-[10px] md:w-2/4 md:items-center md:text-center">
                                                    <div className="flex flex-col gap-y-2 md:gap-y-4">
                                                        <h1 className="m-0 text-2xl font-bold text-black sm:leading-[40px] md:text-3xl lg:text-4xl font-serif">
                                                            {article.title}
                                                        </h1>
                                                        <div className="mb-6 flex flex-col justify-center self-stretch font-serif text-lg leading-8 tracking-[0.01px] text-[#47535F] md:mb-0 lg:text-2xl">
                                                            {article.summary}
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Lead Image */}
                                                <div className="md:w-2/4">
                                                    <div className="mx-[-16px] shrink-0 md:mx-0">
                                                        <img
                                                            width="100%"
                                                            height="100%"
                                                            src={
                                                                article.imageUrl
                                                            }
                                                            alt={
                                                                article.imageCaption
                                                            }
                                                            className="w-full h-auto"
                                                        />
                                                    </div>
                                                    <figcaption className="mt-2 flex flex-col self-stretch font-sans text-sm font-normal leading-6 text-gray-700">
                                                        {article.imageCaption}
                                                    </figcaption>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Byline and Social Share */}
                                        <div className="flex justify-between">
                                            <div className="flex flex-col gap-y-2">
                                                <div className="flex flex-col gap-y-1 font-serif text-base font-bold">
                                                    <div>
                                                        By{" "}
                                                        <a
                                                            href={
                                                                article.authorLink
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-[#0559B3] hover:underline"
                                                        >
                                                            {article.author}
                                                        </a>
                                                    </div>
                                                    <span className="font-sans text-sm font-normal text-gray-700">
                                                        {article.source}
                                                    </span>
                                                </div>
                                                <div className="font-serif text-base font-normal">
                                                    {article.date}
                                                </div>
                                            </div>
                                            <div className="items-center">
                                                <div className="flex gap-[10px]">
                                                    {/* Facebook */}
                                                    <a
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.costar.com%2Farticle%2F396491068%2Fnew-icsc-chairman-traces-role-to-a-long-ago-move-to-arkansas"
                                                        className="text-gray-500 hover:text-gray-700 transition-colors"
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
                                                    {/* Twitter */}
                                                    <a
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        href="https://twitter.com/intent/tweet?text=New%20ICSC%20chairman%20traces%20role%20to%20a%20long-ago%20move%20to%20Arkansas&amp;url=https%3A%2F%2Fwww.costar.com%2Farticle%2F396491068%2Fnew-icsc-chairman-traces-role-to-a-long-ago-move-to-arkansas"
                                                        className="text-gray-500 hover:text-gray-700 transition-colors"
                                                        title="Share on Twitter"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            xmlSpace="preserve"
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
                                                    {/* LinkedIn */}
                                                    <a
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fwww.costar.com%2Farticle%2F396491068%2Fnew-icsc-chairman-traces-role-to-a-long-ago-move-to-arkansas"
                                                        className="text-gray-500 hover:text-gray-700 transition-colors"
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
                                                    {/* Email */}
                                                    <a
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        href="mailto:?subject=New%20ICSC%20chairman%20traces%20role%20to%20a%20long-ago%20move%20to%20Arkansas&amp;body=https%3A%2F%2Fwww.costar.com%2Farticle%2F396491068%2Fnew-icsc-chairman-traces-role-to-a-long-ago-move-to-arkansas"
                                                        className="text-gray-500 hover:text-gray-700 transition-colors"
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
                                    <div className="article-body-html description">
                                        <div className="RichTextArticleBody">
                                            <div className="RichTextArticleBody-body space-y-4">
                                                {article.body.map(
                                                    (paragraph, index) => (
                                                        <p
                                                            key={index}
                                                            className="text-base leading-7 text-gray-900"
                                                        >
                                                            {paragraph}
                                                        </p>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Article Footer */}
                                    <div className="mt-10">
                                        <div className="article-footer-container-social">
                                            <div className="article-footer-social-buttons mb-4">
                                                <b className="block mb-2">
                                                    Follow us on Social Media
                                                </b>
                                                <div className="social-share-buttons">
                                                    <div className="buttons-container flex gap-3">
                                                        <a
                                                            href="https://www.facebook.com/CoStarGroup"
                                                            rel="noopener noreferrer"
                                                            target="_blank"
                                                            className="text-gray-500 hover:text-gray-700 transition-colors"
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
                                                            href="https://twitter.com/CoStarNews"
                                                            rel="noopener noreferrer"
                                                            target="_blank"
                                                            className="text-gray-500 hover:text-gray-700 transition-colors"
                                                            title="Share on Twitter"
                                                        >
                                                            <svg
                                                                width="36"
                                                                height="36"
                                                                viewBox="0 0 36 36"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
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
                                                            href="https://www.linkedin.com/showcase/costarnews/"
                                                            rel="noopener noreferrer"
                                                            target="_blank"
                                                            className="text-gray-500 hover:text-gray-700 transition-colors"
                                                            title="Share on LinkedIn"
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
                                                                    d="M13.5,26.715 L9,26.715 L9,10.965 L13.5,10.965 L13.5,26.715 Z M11.4,10.005 C10.5432235,10.0110766 9.76742606,9.49964395 9.43533279,8.70982314 C9.10323952,7.92000233 9.28046866,7.00785385 9.88415649,6.39985396 C10.4878443,5.79185407 11.3987083,5.60813734 12.1908727,5.93460078 C12.9830372,6.26106421 13.5,7.03320198 13.5,7.89 C13.5,9.05224937 12.5622201,9.9967571 11.4,10.005 L11.4,10.005 Z M29.235,26.715 L24.735,26.715 L24.735,16.98 C24.735,15.84 24.405,15.045 23.01,15.045 C21.7454861,14.9587193 20.5911718,15.7636196 20.235,16.98 L20.235,26.715 L15.735,26.715 L15.735,10.965 L20.235,10.965 L20.235,12.465 C21.5376981,11.499909 23.1137869,10.9745461 24.735,10.965 C26.235,10.965 29.235,11.835 29.235,17.1 L29.235,26.715 Z"
                                                                    fill="white"
                                                                />
                                                            </svg>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="article-footer-social-email">
                                                <b>
                                                    Have feedback or questions?
                                                    Email us at{" "}
                                                    <a
                                                        href="mailto:news@tenanthq.com"
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        news@tenanthq.com
                                                    </a>
                                                </b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Sidebar */}
                            <div className="order-4 lg:order-2">
                                <div className="flex flex-col gap-y-10">
                                    {/* Related Articles */}
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
                                            <ul className="list-none p-0 m-0">
                                                {article.relatedArticles.map(
                                                    (related, index) => (
                                                        <li key={related.id}>
                                                            <div>
                                                                <div className="mb-4">
                                                                    <a
                                                                        href={
                                                                            related.href
                                                                        }
                                                                        className="text-gray-700 hover:text-blue-600 cursor-pointer font-serif text-base leading-normal focus:text-black transition-colors"
                                                                    >
                                                                        {
                                                                            related.title
                                                                        }
                                                                    </a>
                                                                </div>
                                                                {index <
                                                                    article
                                                                        .relatedArticles
                                                                        .length -
                                                                        1 && (
                                                                    <hr className="mb-4 mt-0 border-x-0 border-b-0 border-solid border-gray-300" />
                                                                )}
                                                            </div>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* In This Article */}
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
                                            <ul className="list-none p-0 m-0">
                                                {/* Companies */}
                                                <li>
                                                    <div className="mb-4">
                                                        <span className="mb-4 inline-block font-sans text-base font-bold leading-6">
                                                            Companies
                                                        </span>
                                                        <ul className="list-none p-0 m-0">
                                                            {article.mentionedCompanies.map(
                                                                (company) => (
                                                                    <li
                                                                        key={
                                                                            company.name
                                                                        }
                                                                        className="mb-2"
                                                                    >
                                                                        <div>
                                                                            <a
                                                                                href={
                                                                                    company.href
                                                                                }
                                                                                className="text-blue-600 hover:text-blue-800 hover:underline text-base font-normal items-center font-sans transition-colors"
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                            >
                                                                                {
                                                                                    company.name
                                                                                }
                                                                            </a>
                                                                            <p className="m-0 font-sans text-base font-normal leading-6 text-gray-700">
                                                                                {
                                                                                    company.type
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    </div>
                                                </li>
                                                {/* Contacts */}
                                                <li>
                                                    <div className="mb-4">
                                                        <span className="mb-4 inline-block font-sans text-base font-bold leading-6">
                                                            Contacts
                                                        </span>
                                                        <ul className="list-none p-0 m-0">
                                                            {article.mentionedContacts.map(
                                                                (contact) => (
                                                                    <li
                                                                        key={
                                                                            contact.name
                                                                        }
                                                                        className="mb-2"
                                                                    >
                                                                        <div>
                                                                            <a
                                                                                href={
                                                                                    contact.href
                                                                                }
                                                                                className="text-blue-600 hover:text-blue-800 hover:underline text-base font-normal items-center font-sans transition-colors"
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                            >
                                                                                {
                                                                                    contact.name
                                                                                }
                                                                            </a>
                                                                            <p className="m-0 font-sans text-base font-normal leading-6 text-gray-700">
                                                                                {
                                                                                    contact.title
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                    </li>
                                                                )
                                                            )}
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
        </AppLayout>
    );
}
