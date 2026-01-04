import { ExternalLink } from "lucide-react";

interface NewsArticle {
    id: string;
    date: string;
    headline: string;
    summary: string;
    imageUrl: string;
    imageAlt?: string;
}

interface CompanyNewsProps {
    articles?: NewsArticle[];
}

function NewsArticleCard({ article }: { article: NewsArticle }) {
    return (
        <div className="flex gap-4 bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            {/* Image */}
            <div className="shrink-0">
                <img
                    src={article.imageUrl}
                    alt={article.imageAlt || article.headline}
                    className="w-32 h-32 object-cover rounded-lg"
                />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 mb-1">{article.date}</p>
                <h4 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2">
                    {article.headline}
                </h4>
                <p className="text-sm text-gray-700 line-clamp-2">
                    {article.summary}
                </p>
            </div>
        </div>
    );
}

export default function CompanyNews({ articles }: CompanyNewsProps) {
    // Dummy data matching the screenshot
    const defaultArticles: NewsArticle[] = [
        {
            id: "1",
            date: "December 17, 2025",
            headline: "New ICSC chairman traces role to a long-ago move to Arkansas",
            summary: "JP Suarez persuaded his wife to relocate to Bentonville, where he had long career at Walmart",
            imageUrl: "/assets/images/placeholder.png",
            imageAlt: "JP Suarez",
        },
        {
            id: "2",
            date: "December 16, 2025",
            headline: "HBC, Sears closings at Primaris centers clear path for expanding retailers",
            summary: "'We've done some leasing with Walmart,' REIT CEO Alex Avery says",
            imageUrl: "/assets/images/placeholder.png",
            imageAlt: "Primaris center building",
        },
    ];

    const displayArticles = articles || defaultArticles;

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            {/* Header */}
            <div className="flex items-center gap-2 mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                    News
                </h3>
                <ExternalLink className="h-4 w-4 text-gray-600" />
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayArticles.map((article) => (
                    <NewsArticleCard key={article.id} article={article} />
                ))}
            </div>
        </div>
    );
}

