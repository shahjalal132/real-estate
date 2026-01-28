export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 py-4 px-6 md:px-8 mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                <p>
                    & copy; {new Date().getFullYear()} Real Estate.All rights
                    reserved.
                </p>
                <div className="flex gap-4 mt-2 md:mt-0">
                    <a
                        href="#"
                        className="hover:text-gray-900 transition-colors"
                    >
                        {" "}
                        Privacy Policy{" "}
                    </a>
                    <a
                        href="#"
                        className="hover:text-gray-900 transition-colors"
                    >
                        {" "}
                        Terms of Service{" "}
                    </a>
                </div>
            </div>
        </footer>
    );
}
