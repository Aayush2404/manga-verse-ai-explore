
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ThumbsUp, MessageSquare, Star } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export type ReviewType = 'expert' | 'user';
export type SentimentType = 'positive' | 'mixed' | 'negative';

export interface ReviewItem {
  id: string;
  mangaId: string;  // Added mangaId property here
  author: string;
  authorImage?: string;
  date: string;
  content: string;
  rating: number;
  type: ReviewType;
  helpfulCount: number;
  sentiment?: SentimentType;
  isFeatured?: boolean;
}

interface ReviewCardProps {
  review: ReviewItem;
  isAIEnabled?: boolean;
  className?: string;
}

const ReviewCard = ({ review, isAIEnabled = false, className }: ReviewCardProps) => {
  // Functions to determine styles based on review properties
  const getSentimentColor = (sentiment: SentimentType | undefined) => {
    if (!sentiment) return '';
    
    switch (sentiment) {
      case 'positive': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'mixed': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'negative': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return '';
    }
  };

  const getReviewTypeStyles = (type: ReviewType) => {
    return type === 'expert' 
      ? 'bg-manga-primary/10 text-manga-primary border-manga-primary/20' 
      : 'bg-blue-500/10 text-blue-500 border-blue-500/20';
  };

  return (
    <Card className={cn(
      "transition-all duration-300 hover:shadow-md",
      review.isFeatured ? "border-manga-primary/30 bg-manga-primary/5" : "",
      className
    )}>
      <CardContent className="p-4 md:p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            {review.authorImage ? (
              <img 
                src={review.authorImage} 
                alt={review.author} 
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-muted-foreground" />
              </div>
            )}
            <div>
              <h4 className="font-medium text-foreground">{review.author}</h4>
              <p className="text-xs text-muted-foreground">{review.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge 
              variant="outline" 
              className={cn("text-xs capitalize", getReviewTypeStyles(review.type))}
            >
              {review.type}
            </Badge>
            {isAIEnabled && review.sentiment && (
              <Badge 
                variant="outline" 
                className={cn("text-xs capitalize", getSentimentColor(review.sentiment))}
              >
                {review.sentiment}
              </Badge>
            )}
            {review.isFeatured && (
              <Badge className="bg-manga-primary text-white">
                Featured
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex items-center mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i} 
              className={cn(
                "h-4 w-4", 
                i < review.rating 
                  ? "text-yellow-400 fill-yellow-400" 
                  : "text-gray-300"
              )}
            />
          ))}
          <span className="ml-2 text-sm font-medium">{review.rating.toFixed(1)}</span>
        </div>
        
        <p className="text-sm md:text-base text-foreground">{review.content}</p>
      </CardContent>
      
      <CardFooter className="px-4 pb-4 pt-0 md:px-6">
        <div className="flex items-center text-sm text-muted-foreground">
          <ThumbsUp className="h-4 w-4 mr-1" />
          <span>{review.helpfulCount} found this helpful</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ReviewCard;
