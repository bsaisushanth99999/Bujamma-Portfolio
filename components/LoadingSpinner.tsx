export default function LoadingSpinner({ fullScreen = true }: { fullScreen?: boolean }) {
    const baseClasses = "flex items-center justify-center bg-[#1F2937]";
    const fullScreenClasses = "fixed inset-0 z-50";
    const componentClasses = "w-full h-full min-h-screen";

    return (
        <div className={`${baseClasses} ${fullScreen ? fullScreenClasses : componentClasses}`}>
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-400"></div>
        </div>
    );
} 