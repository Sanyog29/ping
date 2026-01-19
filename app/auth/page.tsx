import Image from "next/image";
import Authform from "@/app/(site)/components/Authform";
import Link from "next/link";

export default function AuthPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                {/* Logo */}
                <div className="flex justify-center">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-blue-500/30">
                        <Image
                            alt="Ping Logo"
                            height={40}
                            width={40}
                            className="w-10 h-10"
                            src="/images/logo.png"
                        />
                    </div>
                </div>

                {/* Title */}
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-800">
                    Welcome to Ping
                </h2>
                <p className="mt-2 text-center text-sm text-slate-500">
                    Sign in to connect with your loved ones
                </p>
            </div>

            {/* Auth form */}
            <Authform />

            {/* Footer */}
            <div className="mt-8 text-center">
                <p className="text-slate-400 text-xs">
                    Made by <span className="font-semibold text-blue-500">Sanyog Tripathi</span>
                </p>
                <p className="text-slate-400/70 text-xs mt-1">
                    © {new Date().getFullYear()} Ping™
                </p>
            </div>
        </div>
    );
}
