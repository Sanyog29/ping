import Image from "next/image";
import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi2";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-cyan-400 rounded-full animate-pulse" />
        <div className="absolute top-20 right-20 w-24 h-24 border border-blue-400 rounded-full" />
        <div className="absolute bottom-32 left-20 w-20 h-20 border border-teal-400 rounded-full" />
        <div className="absolute bottom-20 right-10 w-40 h-40 border-2 border-indigo-400 rounded-full animate-pulse" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-xl" />
        <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-xl" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-2xl">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-28 h-28 mx-auto rounded-full flex items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-600 shadow-2xl shadow-cyan-500/30">
            <Image
              alt="Ping Logo"
              height={60}
              width={60}
              className="w-16 h-16"
              src="/images/logo.png"
            />
          </div>
        </div>

        {/* Title */}
        <div className="mb-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-3 tracking-wide bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Ping
          </h1>
          <p className="text-xl md:text-2xl text-blue-200/90 font-light">
            Stay Connected, Stay Close
          </p>
        </div>

        {/* Tagline */}
        <p className="text-blue-100/70 text-lg md:text-xl mb-10 font-light leading-relaxed">
          Real-time messaging that brings <br className="hidden sm:block" />
          people together, seamlessly
        </p>

        {/* CTA Button */}
        <Link href="/auth"
          className="group inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40"
        >
          <span>Get Started</span>
          <HiOutlineArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>

        {/* Features dots */}
        <div className="mt-16 flex justify-center gap-2">
          <span className="w-2 h-2 bg-cyan-400/50 rounded-full" />
          <span className="w-2 h-2 bg-blue-400/70 rounded-full" />
          <span className="w-3 h-3 bg-indigo-400 rounded-full" />
          <span className="w-2 h-2 bg-blue-400/70 rounded-full" />
          <span className="w-2 h-2 bg-cyan-400/50 rounded-full" />
        </div>
      </div>

      {/* Footer with creator credit */}
      <div className="absolute bottom-6 left-0 right-0 text-center">
        <p className="text-blue-300/60 text-sm">
          Made with 💙 by <span className="font-semibold text-cyan-400">Sanyog Tripathi</span>
        </p>
        <p className="text-blue-400/40 text-xs mt-1">
          © {new Date().getFullYear()} Ping™ — All Rights Reserved
        </p>
      </div>

      {/* Bottom gradient decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-950/50 to-transparent" />
    </div>
  );
}
