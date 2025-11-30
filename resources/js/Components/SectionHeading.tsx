import { ReactNode } from "react";

interface SectionHeadingProps {
    children: ReactNode;
    className?: string;
}

export default function SectionHeading({
    children,
    className = "",
}: SectionHeadingProps) {
    return (
        <h2
            className={`text-3xl font-bold text-[#333333] ${className}`}
        >
            {children}
        </h2>
    );
}

