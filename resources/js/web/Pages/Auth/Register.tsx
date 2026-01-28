import React, { useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("register"));
    };

    return (
        <div className="min-h-screen flex bg-[#0f1015]">
            <Head title="Register" />

            {/* Left Side - Image Section */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gray-900">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                    style={{
                        backgroundImage: "url('/assets/auth/login-bg.png')",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                <div className="relative z-10 flex flex-col justify-end p-12 text-white mt-auto w-full">
                    <h2 className="text-4xl font-bold mb-4 font-display">
                        {" "}
                        Join the Future of Real Estate{" "}
                    </h2>
                    <p className="text-gray-300 text-lg leading-relaxed max-w-lg">
                        Create an account to access powerful analytics,
                        streamlined management, and comprehensive data.
                    </p>
                </div>
            </div>

            {/* Right Side - Form Section */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 overflow-y-auto">
                <div className="w-full max-w-[450px] space-y-8">
                    {/* Header */}
                    <div className="text-center md:text-left">
                        <Link href="/" className="inline-block mb-6">
                            <div className="text-3xl font-bold text-white tracking-tight flex items-center md:justify-start justify-center gap-2">
                                TENANTS{" "}
                                <span className="text-rose-500"> HQ </span>
                            </div>
                        </Link>
                        <h2 className="text-3xl font-bold text-white">
                            {" "}
                            Create an account{" "}
                        </h2>
                        <p className="mt-2 text-gray-400">
                            Start your journey with us today
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-300 mb-1.5"
                            >
                                Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none text-white placeholder-gray-500 transition-all duration-200"
                                placeholder="John Doe"
                                autoComplete="name"
                                autoFocus
                                required
                            />
                            {errors.name && (
                                <p className="mt-1.5 text-sm text-rose-500">
                                    {" "}
                                    {errors.name}{" "}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-300 mb-1.5"
                            >
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none text-white placeholder-gray-500 transition-all duration-200"
                                placeholder="name@company.com"
                                autoComplete="username"
                                required
                            />
                            {errors.email && (
                                <p className="mt-1.5 text-sm text-rose-500">
                                    {" "}
                                    {errors.email}{" "}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-300 mb-1.5"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none text-white placeholder-gray-500 transition-all duration-200"
                                placeholder="••••••••"
                                autoComplete="new-password"
                                required
                            />
                            {errors.password && (
                                <p className="mt-1.5 text-sm text-rose-500">
                                    {" "}
                                    {errors.password}{" "}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="password_confirmation"
                                className="block text-sm font-medium text-gray-300 mb-1.5"
                            >
                                Confirm Password
                            </label>
                            <input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value,
                                    )
                                }
                                className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none text-white placeholder-gray-500 transition-all duration-200"
                                placeholder="••••••••"
                                autoComplete="new-password"
                                required
                            />
                            {errors.password_confirmation && (
                                <p className="mt-1.5 text-sm text-rose-500">
                                    {" "}
                                    {errors.password_confirmation}{" "}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className={`w-full py-3.5 px-6 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white font-bold rounded-xl shadow-[0_4px_14px_0_rgba(225,29,72,0.39)] transform transition-all duration-200 hover:shadow-[0_6px_20px_rgba(225,29,72,0.23)] hover:-translate-y-0.5 active:translate-y-0 ${processing ? "opacity-70 cursor-not-allowed" : ""}`}
                        >
                            {processing ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg
                                        className="animate-spin h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        >
                                            {" "}
                                        </circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        >
                                            {" "}
                                        </path>
                                    </svg>
                                    Creating account...
                                </span>
                            ) : (
                                "Create Account"
                            )}
                        </button>

                        <div className="pt-2 text-center">
                            <p className="text-gray-400">
                                Already have an account ?{" "}
                                <Link
                                    href={route("login")}
                                    className="text-white hover:text-rose-400 font-semibold transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-rose-400 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
