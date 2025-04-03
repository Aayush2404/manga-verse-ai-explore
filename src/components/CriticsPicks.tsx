
import { useState, useMemo } from "react";
import { MangaItem } from "./MangaCard";
import MangaGrid from "./MangaGrid";
import SectionTitle from "./SectionTitle";
import { ReviewItem } from "./ReviewCard";
import RatingDisplay from "./RatingDisplay";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Award, MessageSquare, Quote, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";

type SortOption = 'critics' | 'users' | 'balanced';

interface CriticsPicksProps {
  mangaList: MangaItem[];
  reviews: ReviewItem[];
  isAIEnabled: boolean;
}

const CriticsPicks = ({ mangaList, reviews, isAIEnabled }: CriticsPicksProps) => {
  const [sortBy, setSortBy] = useState<SortOption>('critics');
  
  // Calculate critic and user scores for each manga
  const topPicks = useMemo(() => {
    // Group reviews by manga id
    const reviewsByManga = reviews.reduce((acc, review) => {
      if (!acc[review.mangaId]) {
        acc[review.mangaId] = [];
      }
      acc[review.mangaId].push(review);
      return acc;
    }, {} as Record<string, ReviewItem[]>);
    
    // Calculate scores for each manga
    return mangaList.map(manga => {
      const mangaReviews = reviewsByManga[manga.id] || [];
      const criticReviews = mangaReviews.filter(r => r.type === 'expert');
      const userReviews = mangaReviews.filter(r => r.type === 'user');
      
      const criticScore = criticReviews.length 
        ? criticReviews.reduce((sum, r) => sum + r.rating, 0) / criticReviews.length
        : 0;
        
      const userScore = userReviews.length
        ? userReviews.reduce((sum, r) => sum + r.rating, 0) / userReviews.length
        : 0;
        
      const balancedScore = (criticScore + userScore) / 2;
      
      // Get a featured review
      const featuredReview = criticReviews.length
        ? criticReviews.sort((a, b) => b.helpfulCount - a.helpfulCount)[0]
        : null;
        
      return {
        ...manga,
        criticScore,
        userScore,
        balancedScore,
        featuredReview,
        hasReviews: mangaReviews.length > 0
      };
    });
  }, [mangaList, reviews]);
  
  // Sort and filter top picks
  const sortedPicks = useMemo(() => {
    let filteredList = topPicks.filter(manga => manga.hasReviews);
    
    // If no manga with reviews, show fallback with highest rated manga
    if (filteredList.length === 0) {
      filteredList = topPicks.sort((a, b) => b.rating - a.rating).slice(0, 6);
    }
    
    switch (sortBy) {
      case 'critics':
        return filteredList.sort((a, b) => b.criticScore - a.criticScore).slice(0, 6);
      case 'users':
        return filteredList.sort((a, b) => b.userScore - a.userScore).slice(0, 6);
      case 'balanced':
        return filteredList.sort((a, b) => b.balancedScore - a.balancedScore).slice(0, 6);
      default:
        return filteredList.slice(0, 6);
    }
  }, [topPicks, sortBy]);
  
  // Generate AI insights
  const generateInsights = (manga: MangaItem & { criticScore: number, userScore: number }) => {
    if (!isAIEnabled) return null;
    
    // This would normally be an actual AI-generated insight
    // For the mock, we'll create templated insights based on scores
    if (manga.criticScore > 4.5) {
      return "Critics praise this manga for its exceptional storytelling and artistic merit. The character development and plot progression are particularly noteworthy.";
    } else if (manga.userScore > 4.5) {
      return "Fans love this manga for its engaging plot and relatable characters. The emotional impact and pacing make it a reader favorite.";
    } else if (manga.balancedScore > 4) {
      return "Both critics and readers appreciate this manga for its balanced approach to storytelling, with strong visual elements and consistent character arcs.";
    } else {
      return "This manga offers an interesting perspective on its genre, with unique elements that set it apart from similar works.";
    }
  };

  return (
    <section id="critics-picks" className="py-12 bg-card/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <SectionTitle
            title="Critics' Picks"
            subtitle="Top-rated manga according to experts and fans"
            align="left"
            className="mb-0"
          />
          
          <div className="flex items-center space-x-4 self-start md:self-center">
            <span className="text-sm font-medium text-muted-foreground">Sort by:</span>
            <RadioGroup 
              defaultValue="critics" 
              value={sortBy}
              onValueChange={(value) => setSortBy(value as SortOption)}
              className="flex items-center space-x-2"
            >
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="critics" id="critics" />
                <Label htmlFor="critics" className="cursor-pointer">Critics</Label>
              </div>
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="users" id="users" />
                <Label htmlFor="users" className="cursor-pointer">Users</Label>
              </div>
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="balanced" id="balanced" />
                <Label htmlFor="balanced" className="cursor-pointer">Balanced</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        
        {sortedPicks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {sortedPicks.map((manga) => (
              <Card key={manga.id} className="overflow-hidden border shadow-sm transition-all hover:shadow-md">
                <div className="grid grid-cols-3 h-full">
                  {/* Manga Cover */}
                  <div className="col-span-1 aspect-[2/3] overflow-hidden">
                    <img 
                      src={manga.cover} 
                      alt={manga.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Manga Details */}
                  <div className="col-span-2 p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-lg line-clamp-1 mb-1">
                        {manga.title}
                      </h3>
                      
                      {/* Ratings */}
                      <div className="space-y-1.5 mb-3">
                        <div className="flex items-center text-sm">
                          <Award className="h-3.5 w-3.5 text-manga-primary mr-1" />
                          <span className="mr-2 text-muted-foreground">Critics:</span>
                          <RatingDisplay 
                            rating={manga.criticScore || manga.rating} 
                            size="sm" 
                          />
                        </div>
                        <div className="flex items-center text-sm">
                          <ThumbsUp className="h-3.5 w-3.5 text-blue-500 mr-1" />
                          <span className="mr-2 text-muted-foreground">Users:</span>
                          <RatingDisplay 
                            rating={manga.userScore || manga.rating} 
                            size="sm" 
                          />
                        </div>
                      </div>
                      
                      {/* Review Excerpt */}
                      {manga.featuredReview ? (
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <div className="flex items-start mt-1 cursor-pointer group">
                              <Quote className="h-4 w-4 text-muted-foreground mr-1 mt-0.5 flex-shrink-0" />
                              <p className="text-sm line-clamp-2 text-muted-foreground">
                                {manga.featuredReview.content.substring(0, 60)}...
                                <span className="text-primary group-hover:underline ml-1 text-xs">
                                  Read more
                                </span>
                              </p>
                            </div>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-80">
                            <div className="flex justify-between items-start">
                              <span className="font-medium text-sm">{manga.featuredReview.author}</span>
                              <RatingDisplay rating={manga.featuredReview.rating} size="sm" />
                            </div>
                            <p className="text-sm mt-2">{manga.featuredReview.content}</p>
                          </HoverCardContent>
                        </HoverCard>
                      ) : (
                        isAIEnabled && (
                          <div className="flex items-start mt-1">
                            <MessageSquare className="h-4 w-4 text-muted-foreground mr-1 mt-0.5 flex-shrink-0" />
                            <p className="text-sm line-clamp-2 text-muted-foreground">
                              {generateInsights(manga as any)}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="bg-muted p-8 rounded-lg text-center">
            <h3 className="text-xl font-medium mb-2">No critic data available</h3>
            <p className="text-muted-foreground mb-4">
              We're still collecting reviews for our manga collection.
              In the meantime, check out some of our trending titles.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CriticsPicks;
