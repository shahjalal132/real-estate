import React, { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }: { status?: string, canResetPassword?: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className= "min-h-screen relative flex items-center justify-center overflow-hidden" >
        {/* Background Image */ }
        < div
    className = "absolute inset-0 z-0 bg-cover bg-center"
    style = {{ backgroundImage: "url('/assets/auth/login-bg.png')" }
}
            >
    {/* Overlay for better text contrast/mood */ }
    < div className = "absolute inset-0 bg-black/30 backdrop-blur-[2px]" > </div>
        </div>

{/* Glassmorphism Card */ }
<div className="relative z-10 w-full max-w-md p-8 mx-4" >
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8" >

        {/* Header */ }
        < div className = "text-center mb-8" >
            <Link href="/" className = "inline-block mb-4" >
                {/* Replace with Logo if available, using text for now or an icon */ }
                < div className = "text-3xl font-bold text-white tracking-tight" >
                    TENANTS < span className = "text-rose-500" > HQ </span>
                        </div>
                        </Link>
                        < h2 className = "text-2xl font-semibold text-white" > Welcome Back </h2>
                            < p className = "text-gray-300 mt-2 text-sm" > Sign in to access your dashboard </p>
                                </div>

{
    status && (
        <div className="mb-4 font-medium text-sm text-green-400 text-center" >
            { status }
            </div>
                    )
}

<form onSubmit={ submit } className = "space-y-6" >
    <div>
    <label htmlFor="email" className = "block text-sm font-medium text-gray-200 mb-1" >
        Email Address
            </label>
            < input
id = "email"
type = "email"
name = "email"
value = { data.email }
onChange = {(e) => setData('email', e.target.value)}
className = "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none text-white placeholder-gray-400 transition-all"
placeholder = "name@company.com"
autoComplete = "username"
autoFocus
    />
    { errors.email && <div className="mt-1 text-sm text-red-400"> { errors.email } </div> }
    </div>

    < div >
    <div className="flex items-center justify-between mb-1" >
        <label htmlFor="password" className = "block text-sm font-medium text-gray-200" >
            Password
            </label>
{
    canResetPassword && (
        <Link
                                        href={ route('password.request') }
    className = "text-sm text-rose-400 hover:text-rose-300 transition-colors"
        >
        Forgot password ?
            </Link>
                                )
}
</div>
    < input
id = "password"
type = "password"
name = "password"
value = { data.password }
onChange = {(e) => setData('password', e.target.value)}
className = "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none text-white placeholder-gray-400 transition-all"
placeholder = "••••••••"
autoComplete = "current-password"
    />
    { errors.password && <div className="mt-1 text-sm text-red-400"> { errors.password } </div> }
    </div>

    < div className = "flex items-center" >
        <label className="flex items-center cursor-pointer" >
            <input
                                    type="checkbox"
name = "remember"
checked = { data.remember }
onChange = {(e) => setData('remember', e.target.checked)}
className = "w-4 h-4 rounded border-gray-600 bg-white/10 text-rose-500 focus:ring-rose-500/50"
    />
    <span className="ml-2 text-sm text-gray-300" > Remember me </span>
        </label>
        </div>

        < button
type = "submit"
disabled = { processing }
className = {`w-full py-3 px-4 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold rounded-lg shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 ${processing ? 'opacity-75 cursor-not-allowed' : ''}`}
                        >
    { processing? 'Signing in...': 'Sign in' }
    </button>

    < div className = "text-center mt-6" >
        <p className="text-sm text-gray-400" >
            Don't have an account?{' '}
                < Link href = { route('register') } className = "text-white hover:text-rose-400 font-medium transition-colors" >
                    Create an account
                        </Link>
                        </p>
                        </div>
                        </form>
                        </div>
                        </div>
                        < Head title = "Log in" />
                            </div>
    );
}
