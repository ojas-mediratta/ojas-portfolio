import React, { useState, useEffect } from "react";

interface LoadingScreenProps {
  progress: number;
  loadedAssets: number;
  totalAssets: number;
}

const LOADING_TIPS = [
  "Convincing electrons to behave...",
  "Downloading more RAM...",
  "Teaching robots to dream...",
  "Loading... or is it?",
  "Compressing time and space...",
];

function useCyclingTips(tips: string[], interval: number = 2500) {
  const [currentTip, setCurrentTip] = useState(tips[Math.floor(Math.random() * tips.length)]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      
      // After fade out animation, change tip and fade in
      setTimeout(() => {
        let newTip;
        do {
          newTip = tips[Math.floor(Math.random() * tips.length)];
        } while (newTip === currentTip && tips.length > 1); // Ensure we don't show the same tip twice
        
        setCurrentTip(newTip);
        setIsAnimating(false);
      }, 300); // Half of the animation duration
    }, interval);

    return () => clearInterval(timer);
  }, [tips, interval, currentTip]);

  return { currentTip, isAnimating };
}

export default function LoadingScreen({ progress, loadedAssets, totalAssets }: LoadingScreenProps) {
  const { currentTip, isAnimating } = useCyclingTips(LOADING_TIPS, 2500);

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg"
    >
      {/* Loading spinner */}
      <div className="mb-8">
        <div className="w-16 h-16 border-4 border-border border-t-accent-cyan rounded-full animate-spin"></div>
      </div>

      {/* Cycling loading tips with swoosh animation */}
      <div className="text-center max-w-lg px-6">
        <div className="relative h-6 flex items-center justify-center">
          <p 
            className={`text-sm text-subtext absolute whitespace-nowrap transition-all duration-300 ease-in-out ${
              isAnimating 
                ? 'opacity-0 translate-y-4' 
                : 'opacity-100 translate-y-0'
            }`}
            style={{
              transform: isAnimating 
                ? 'translateY(1rem)' 
                : 'translateY(0)'
            }}
          >
            {currentTip}
          </p>
        </div>
      </div>
    </div>
  );
}
