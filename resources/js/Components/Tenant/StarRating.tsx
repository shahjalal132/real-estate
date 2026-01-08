interface StarRatingProps {
    rating: number; // 0-5, can be decimal like 3.5
    maxRating?: number;
    size?: "sm" | "md" | "lg";
}

export default function StarRating({
    rating,
    maxRating = 5,
    size = "sm",
}: StarRatingProps) {
    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
    };

    // Generate unique ID for gradients to avoid conflicts
    const uniqueId = Math.random().toString(36).substring(7);

    return (
        <div className="flex items-center gap-0.5">
            {Array.from({ length: maxRating }, (_, index) => {
                const starValue = index + 1;
                const fillPercentage =
                    rating >= starValue
                        ? 100
                        : rating > index
                        ? (rating - index) * 100
                        : 0;

                const gradientId = `svg-star-${uniqueId}-${index}`;

                return (
                    <div
                        key={index}
                        className="relative"
                        aria-label={`${starValue} star`}
                    >
                        <svg
                            className={sizeClasses[size]}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="-3 -4 34 34"
                            stroke="none"
                            fill="currentcolor"
                            role="img"
                        >
                            <defs>
                                <linearGradient
                                    id={gradientId}
                                    x1="0"
                                    y1="0"
                                    x2="1"
                                    y2="0"
                                >
                                    <stop
                                        offset="0"
                                        stopColor={
                                            fillPercentage > 0
                                                ? "currentcolor"
                                                : "white"
                                        }
                                    />
                                    <stop
                                        offset={`${fillPercentage}%`}
                                        stopColor={
                                            fillPercentage > 0
                                                ? "currentcolor"
                                                : "white"
                                        }
                                    />
                                    <stop
                                        offset={`${fillPercentage}%`}
                                        stopColor="white"
                                    />
                                    <stop offset="100%" stopColor="white" />
                                </linearGradient>
                            </defs>
                            <g
                                stroke="none"
                                strokeWidth="1.5"
                                fill={`url(#${gradientId})`}
                                fillRule="evenodd"
                            >
                                <polygon
                                    points="17.0509596 0 21.9436293 11.1598595 34.1019192 12.3501975 24.9674281 20.4376799 27.5891392 32.3332073 17.0509596 26.1717082 6.51277999 32.3332073 9.13449111 20.4376799 -3.55271368e-15 12.3501975 12.1582899 11.1598595"
                                    transform="scale(0.8)"
                                    stroke={
                                        fillPercentage === 100
                                            ? "currentcolor"
                                            : "#757575"
                                    }
                                    strokeWidth="4"
                                />
                            </g>
                        </svg>
                    </div>
                );
            })}
        </div>
    );
}

