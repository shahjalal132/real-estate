import React, { FormEventHandler } from "react";
import { Head, useForm } from "@inertiajs/react";
// @ts-ignore
import bgImage from "/home/tanbir/.gemini/antigravity/brain/9b26fa50-405e-4379-b298-d4a95ccf8cf1/site_lock_background_1769661957578.png";

export default function SiteLock() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("site-lock.unlock"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <div className="min-h-screen flex bg-[#0f1015] font-sans">
            <Head title="Site Locked" />

            {/* Left Side - Image Section */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gray-900">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                    style={{
                        backgroundImage: `url('${bgImage}')`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                <div className="relative z-10 flex flex-col justify-end p-12 text-white mt-auto w-full">
                    <h2 className="text-4xl font-bold mb-4 font-display">
                        Secure Workspace Access
                    </h2>
                    <p className="text-gray-300 text-lg leading-relaxed max-w-lg">
                        This project environment is restricted.Please
                        authenticate to continue working on the property
                        management dashboard.
                    </p>
                </div>
            </div>

            {/* Right Side - Form Section */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 overflow-y-auto">
                <div className="w-full max-w-[450px] space-y-8">
                    {/* Logo & Header */}
                    <div className="text-center md:text-left">
                        <div className="inline-block mb-6">
                            <div className="text-3xl font-bold text-white tracking-tight flex items-center md:justify-start justify-center gap-2">
                                TENANTS{" "}
                                <span className="text-rose-500"> HQ </span>
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-white">
                            Enter Access Code
                        </h2>
                        <p className="mt-2 text-gray-400">
                            This session is protected.
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-300"
                                >
                                    Password
                                </label>
                            </div>
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
                                autoFocus
                            />
                            {errors.password && (
                                <p className="mt-1.5 text-sm text-rose-500">
                                    {errors.password}
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
                                    Verifying...
                                </span>
                            ) : (
                                "Unlock Application"
                            )}
                        </button>
                    </form>

                    <div className="pt-2 text-center">
                        <p className="text-gray-500 text-sm">
                            Secured by Tenants HQ
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
