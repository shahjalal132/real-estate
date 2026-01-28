import React, { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('register'));
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
                <div className="text-3xl font-bold text-white tracking-tight" >
                    TENANTS < span className = "text-rose-500" > HQ </span>
                        </div>
                        </Link>
                        < h2 className = "text-2xl font-semibold text-white" > Create an Account </h2>
                            < p className = "text-gray-300 mt-2 text-sm" > Join us to manage your real estate portfolio </p>
                                </div>

                                < form onSubmit = { submit } className = "space-y-4" >
                                    <div>
                                    <label htmlFor="name" className = "block text-sm font-medium text-gray-200 mb-1" >
                                        Full Name
                                            </label>
                                            < input
id = "name"
type = "text"
name = "name"
value = { data.name }
onChange = {(e) => setData('name', e.target.value)}
className = "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none text-white placeholder-gray-400 transition-all"
placeholder = "John Doe"
autoComplete = "name"
autoFocus
required
    />
    { errors.name && <div className="mt-1 text-sm text-red-400"> { errors.name } </div> }
    </div>

    < div >
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
required
    />
    { errors.email && <div className="mt-1 text-sm text-red-400"> { errors.email } </div> }
    </div>

    < div >
    <label htmlFor="password" className = "block text-sm font-medium text-gray-200 mb-1" >
        Password
        </label>
        < input
id = "password"
type = "password"
name = "password"
value = { data.password }
onChange = {(e) => setData('password', e.target.value)}
className = "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none text-white placeholder-gray-400 transition-all"
placeholder = "••••••••"
autoComplete = "new-password"
required
    />
    { errors.password && <div className="mt-1 text-sm text-red-400"> { errors.password } </div> }
    </div>

    < div >
    <label htmlFor="password_confirmation" className = "block text-sm font-medium text-gray-200 mb-1" >
        Confirm Password
            </label>
            < input
id = "password_confirmation"
type = "password"
name = "password_confirmation"
value = { data.password_confirmation }
onChange = {(e) => setData('password_confirmation', e.target.value)}
className = "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none text-white placeholder-gray-400 transition-all"
placeholder = "••••••••"
autoComplete = "new-password"
required
    />
    { errors.password_confirmation && <div className="mt-1 text-sm text-red-400"> { errors.password_confirmation } </div> }
    </div>

    < button
type = "submit"
disabled = { processing }
className = {`w-full py-3 px-4 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold rounded-lg shadow-lg mt-6 transform hover:-translate-y-0.5 transition-all duration-200 ${processing ? 'opacity-75 cursor-not-allowed' : ''}`}
                        >
    { processing? 'Creating account...': 'Create Account' }
    </button>

    < div className = "text-center mt-6" >
        <p className="text-sm text-gray-400" >
            Already have an account ? { ' '}
                < Link href = { route('login') } className = "text-white hover:text-rose-400 font-medium transition-colors" >
                    Sign in
                    </Link>
                    </p>
                    </div>
                    </form>
                    </div>
                    </div>
                    < Head title = "Register" />
                        </div>
    );
}
