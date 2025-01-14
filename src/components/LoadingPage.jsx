import React from 'react';
import './StyleLoading.css';

function LoadingPage() {
    return (
        <div className="bg-blue-300 h-screen w-screen flex items-center justify-center flex-col overflow-hidden">
            <div className="ml-4 font-bold text-lg mb-6 ">
                <span className="text-slate-700 bg-gray-200 rounded-l-xl pl-2">
                    WHITE
                </span>
                <span className="text-white bg-black rounded-r-xl pr-2">
                    PIX
                </span>
            </div>
            <div>Please wait...</div>
            <div className="ocean">
                <div className="wave"></div>
                <div className="wave wave2"></div>
                <div className="wave wave3"></div>
            </div>
        </div>
    );
}

export default LoadingPage;
