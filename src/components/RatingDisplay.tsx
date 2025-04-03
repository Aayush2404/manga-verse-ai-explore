
import React from 'react';
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface RatingDisplayProps {
  rating: number;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const RatingDisplay = ({ 
  rating, 
  count, 
  size = 'md', 
  className 
}: RatingDisplayProps) => {
  // Size mappings
  const sizeMap = {
    sm: {
      star: "h-3 w-3",
      text: "text-xs",
    },
    md: {
      star: "h-4 w-4",
      text: "text-sm",
    },
    lg: {
      star: "h-5 w-5",
      text: "text-base",
    }
  };

  return (
    <div className={cn("flex items-center", className)}>
      {Array.from({ length: 5 }).map((_, i) => {
        // Calculate partial stars
        const filled = Math.min(1, Math.max(0, rating - i));
        
        return (
          <div key={i} className="relative">
            {/* Background star (gray) */}
            <Star className={cn(
              sizeMap[size].star,
              "text-gray-300"
            )} />
            
            {/* Foreground star (yellow, clipped based on rating) */}
            {filled > 0 && (
              <div 
                className="absolute inset-0 overflow-hidden" 
                style={{ width: `${filled * 100}%` }}
              >
                <Star className={cn(
                  sizeMap[size].star,
                  "text-yellow-400 fill-yellow-400"
                )} />
              </div>
            )}
          </div>
        );
      })}
      
      <span className={cn(
        "ml-2 font-medium", 
        sizeMap[size].text
      )}>
        {rating.toFixed(1)}
      </span>
      
      {count !== undefined && (
        <span className={cn(
          "ml-1 text-muted-foreground",
          sizeMap[size].text
        )}>
          ({count})
        </span>
      )}
    </div>
  );
};

export default RatingDisplay;
