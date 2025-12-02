interface PropertyDescriptionProps {
    description?: string | null;
    marketingDescription?: string | null;
}

export default function PropertyDescription({
    description,
    marketingDescription,
}: PropertyDescriptionProps) {
    if (!description && !marketingDescription) {
        return null;
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                About This Property
            </h2>
            <div className="prose max-w-none prose-lg">
                {marketingDescription ? (
                    <div
                        className="text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{
                            __html: marketingDescription,
                        }}
                    />
                ) : (
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
}
