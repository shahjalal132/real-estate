import { useState } from "react";
import { X, Mail, Lock, User } from "lucide-react";
import axios from "axios";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export default function AuthModal({
    isOpen,
    onClose,
    onSuccess,
}: AuthModalProps) {
    const [mode, setMode] = useState<"login" | "register">("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [remember, setRemember] = useState(false);
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        try {
            if (mode === "login") {
                await axios.post("/api/auth/login", {
                    email,
                    password,
                    remember,
                });
            } else {
                await axios.post("/api/auth/register", {
                    name,
                    email,
                    password,
                    password_confirmation: passwordConfirmation,
                });
            }

            // Reload the page to get updated auth state
            window.location.reload();
            onSuccess?.();
            onClose();
        } catch (error: any) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({
                    email: [
                        error.response?.data?.message || "An error occurred",
                    ],
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const switchMode = () => {
        setMode(mode === "login" ? "register" : "login");
        setErrors({});
        setName("");
        setEmail("");
        setPassword("");
        setPasswordConfirmation("");
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-50 bg-black opacity-50 transition-opacity duration-300 ease-in-out"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white shadow-xl transition-all duration-300 ease-in-out">
                <div className="relative p-6">
                    {/* Close Button */}
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all"
                        aria-label="Close modal"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    {/* Header */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {mode === "login" ? "Sign In" : "Create Account"}
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            {mode === "login"
                                ? "Sign in to save your searches and get email alerts"
                                : "Create an account to save your searches and get email alerts"}
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {mode === "register" && (
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        required
                                        className="w-full rounded-lg border-2 border-gray-300 bg-white pl-10 pr-4 py-3 text-sm text-gray-700 placeholder-gray-400 transition-all focus:border-[#0066CC] focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:ring-opacity-20"
                                        placeholder="John Doe"
                                    />
                                </div>
                                {errors.name && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {errors.name[0]}
                                    </p>
                                )}
                            </div>
                        )}

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full rounded-lg border-2 border-gray-300 bg-white pl-10 pr-4 py-3 text-sm text-gray-700 placeholder-gray-400 transition-all focus:border-[#0066CC] focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:ring-opacity-20"
                                    placeholder="you@example.com"
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.email[0]}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                    minLength={
                                        mode === "register" ? 8 : undefined
                                    }
                                    className="w-full rounded-lg border-2 border-gray-300 bg-white pl-10 pr-4 py-3 text-sm text-gray-700 placeholder-gray-400 transition-all focus:border-[#0066CC] focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:ring-opacity-20"
                                    placeholder={
                                        mode === "register"
                                            ? "At least 8 characters"
                                            : "Enter your password"
                                    }
                                />
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.password[0]}
                                </p>
                            )}
                        </div>

                        {mode === "register" && (
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="password"
                                        value={passwordConfirmation}
                                        onChange={(e) =>
                                            setPasswordConfirmation(
                                                e.target.value
                                            )
                                        }
                                        required
                                        className="w-full rounded-lg border-2 border-gray-300 bg-white pl-10 pr-4 py-3 text-sm text-gray-700 placeholder-gray-400 transition-all focus:border-[#0066CC] focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:ring-opacity-20"
                                        placeholder="Confirm your password"
                                    />
                                </div>
                                {errors.password_confirmation && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {errors.password_confirmation[0]}
                                    </p>
                                )}
                            </div>
                        )}

                        {mode === "login" && (
                            <div className="flex items-center justify-between">
                                <label className="flex cursor-pointer items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={remember}
                                        onChange={(e) =>
                                            setRemember(e.target.checked)
                                        }
                                        className="h-4 w-4 rounded border-gray-300 text-[#0066CC] focus:ring-[#0066CC] accent-[#0066CC]"
                                    />
                                    <span className="text-sm text-gray-700">
                                        Remember me
                                    </span>
                                </label>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-[#0066CC] px-6 py-3 text-sm font-semibold text-white hover:bg-[#004C99] shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading
                                ? "Please wait..."
                                : mode === "login"
                                ? "Sign In"
                                : "Create Account"}
                        </button>
                    </form>

                    {/* Switch Mode */}
                    <div className="mt-6 text-center">
                        <button
                            type="button"
                            onClick={switchMode}
                            className="text-sm text-[#0066CC] hover:text-[#004C99] transition-colors"
                        >
                            {mode === "login"
                                ? "Don't have an account? Sign up"
                                : "Already have an account? Sign in"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
