
export function SplashScreen() {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-[9999]">
            <div className="relative flex items-center justify-center">
                {/* Outer Ring */}
                <div className="w-16 h-16 border-4 border-slate-100 rounded-full"></div>
                {/* Spinning Ring */}
                <div className="absolute w-16 h-16 border-4 border-teal-500 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <h2 className="mt-4 text-slate-400 text-sm font-medium tracking-wide animate-pulse">
                LOADING
            </h2>
        </div>
    );
}
