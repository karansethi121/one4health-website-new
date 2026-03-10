import React from 'react';

interface LoadingStateProps {
    message?: string;
    fullPage?: boolean;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
    message = "Loading...",
    fullPage = false
}) => {
    const content = (
        <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative">
                {/* Branded Pulse Ring */}
                <div className="w-16 h-16 rounded-full border-4 border-sage-100 animate-pulse" />
                {/* Inner Spinning Ring */}
                <div className="absolute inset-0 w-16 h-16 rounded-full border-t-4 border-sage-700 animate-spin" />
                {/* Center Dot */}
                <div className="absolute inset-[22px] w-3 h-3 bg-sage-700 rounded-full animate-pulse" />
            </div>
            <p className="text-charcoal-500 font-medium animate-pulse tracking-wide uppercase text-xs">
                {message}
            </p>
        </div>
    );

    if (fullPage) {
        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 backdrop-blur-md">
                {content}
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center p-12 w-full">
            {content}
        </div>
    );
};
