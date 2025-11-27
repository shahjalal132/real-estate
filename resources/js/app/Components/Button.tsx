import { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "@inertiajs/react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: "primary" | "secondary";
    href?: string;
}

export default function Button({
    children,
    variant = "primary",
    className = "",
    href,
    ...props
}: ButtonProps) {
    const baseClasses =
        "cursor-pointer outline-none inline-block font-normal leading-[1.5] text-center border border-transparent px-3 py-1.5 text-base rounded transition-colors duration-150 ease-in-out";

    const variantClasses = {
        primary:
            "text-white bg-[#0d6efd] border-[#0d6efd] hover:text-white hover:bg-[#0b5ed7] hover:border-[#0a58ca]",
        secondary: "",
    };

    const combinedClassName = `${baseClasses} ${variantClasses[variant]} ${className}`;

    if (href) {
        return (
            <Link href={href} className={combinedClassName}>
                {children}
            </Link>
        );
    }

    return (
        <button className={combinedClassName} {...props}>
            {children}
        </button>
    );
}

