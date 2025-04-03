
import { useState } from "react";
import { MangaItem } from "./MangaCard";
import { ReviewItem } from "./ReviewCard";
import ReviewCard from "./ReviewCard";
import RatingDisplay from "./RatingDisplay";
import SectionTitle from "./SectionTitle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowDown, 
  ArrowUp, 
  Filter, 
  MessageSquare, 
  ThumbsUp 
} from "lucide-react";

// Mock data for reviews
const mockReviews: ReviewItem[] = [
  {
    id: "1",
    author: "Anime Expert",
    authorImage: "https://randomuser.me/api/portraits/men/44.jpg",
    date: "2025-03-14",
    content: "An absolute masterpiece that transcends the medium. The character development is exceptional, and the art style is breathtaking. This manga has redefined storytelling for the modern era.",
    rating: 5,
    type: "expert",
    helpfulCount: 156,
    sentiment: "positive",
    isFeatured: true
  },
  {
    id: "2",
    author: "MangaReviewer",
    authorImage: "https://randomuser.me/api/portraits/women/65.jpg", 
    date: "2025-02-28",
    content: "While the artwork is stunning, the pacing in the middle chapters feels inconsistent. The character motivations sometimes seem forced, but the overall story arc is satisfying.",
    rating: 3.5,
    type: "expert",
    helpfulCount: 89,
    sentiment: "mixed"
  },
  {
    id: "3",
    author: "OtakuFan123",
    date: "2025-03-20",
    content: "I couldn't put this down! The protagonist's journey is so relatable, and the supporting cast adds so much depth to the world. Highly recommended!",
    rating: 4.5,
    type: "user",
    helpfulCount: 42,
    sentiment: "positive",
    isFeatured: true
  },
  {
    id: "4",
    author: "CasualReader",
    date: "2025-03-05",
    content: "Disappointing compared to the author's previous works. The plot twists were predictable, and some character arcs felt unresolved by the end.",
    rating: 2,
    type: "user",
    helpfulCount: 23,
    sentiment: "negative"
  },
  {
    id: "5",
    author: "MangaBlogger",
    authorImage: "https://randomuser.me/api/portraits/men/22.jpg",
    date: "2025-03-18",
    content: "An interesting premise with solid execution. The world-building is particularly noteworthy, creating a setting that feels both familiar and alien at the same time.",
    rating: 4,
    type: "expert",
    helpfulCount: 67,
    sentiment: "positive"
  },
  {
    id: "6",
    author: "NewToAnime",
    date: "2025-02-25",
    content: "As someone new to manga, I found this very accessible. The story grabbed me from the first chapter, and the character designs are memorable.",
    rating: 4,
    type: "user",
    helpfulCount: 31,
    sentiment: "positive"
  }
];

type SortOption = 'latest' | 'highest' | 'helpful';
type FilterOption = 'all' | 'expert' | 'user';

interface CriticsSectionProps {
  manga: MangaItem;
  isAIEnabled: boolean;
}

const CriticsSection = ({ manga, isAIEnabled }: CriticsSectionProps) => {
  const [sortBy, setSortBy] = useState<SortOption>('latest');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [activeTab, setActiveTab] = useState('all-reviews');
  
  // Calculate average rating
  const averageRating = mockReviews.reduce((sum, review) => sum + review.rating, 0) / mockReviews.length;
  
  // Get reviews based on current filters
  const getFilteredReviews = () => {
    let filtered = [...mockReviews];
    
    // Apply type filter
    if (filterBy !== 'all') {
      filtered = filtered.filter(review => review.type === filterBy);
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'latest':
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'highest':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'helpful':
        filtered.sort((a, b) => b.helpfulCount - a.helpfulCount);
        break;
    }
    
    return filtered;
  };
  
  // Get featured reviews
  const featuredReviews = mockReviews.filter(review => review.isFeatured);
  
  // Get filtered reviews based on current settings
  const filteredReviews = getFilteredReviews();
  
  // Count reviews by type
  const expertCount = mockReviews.filter(r => r.type === 'expert').length;
  const userCount = mockReviews.filter(r => r.type === 'user').length;
  
  // Count reviews by sentiment (if AI is enabled)
  const sentimentCounts = isAIEnabled ? {
    positive: mockReviews.filter(r => r.sentiment === 'positive').length,
    mixed: mockReviews.filter(r => r.sentiment === 'mixed').length,
    negative: mockReviews.filter(r => r.sentiment === 'negative').length,
  } : null;

  return (
    <section id="critics" className="py-12 bg-background">
      <div className="container px-4 md:px-6">
        <SectionTitle
          title="Critics & Reviews"
          subtitle={`See what readers and experts think about ${manga.title}`}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Summary Card */}
          <div className="bg-card rounded-lg p-6 border shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Rating Summary</h3>
            
            <div className="flex items-center justify-center mb-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-foreground mb-2">
                  {averageRating.toFixed(1)}
                </div>
                <RatingDisplay rating={averageRating} size="lg" className="justify-center mb-1" />
                <p className="text-sm text-muted-foreground">
                  Based on {mockReviews.length} reviews
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span>Expert Reviews</span>
                <Badge variant="outline" className="bg-manga-primary/10 text-manga-primary">
                  {expertCount}
                </Badge>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>User Reviews</span>
                <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
                  {userCount}
                </Badge>
              </div>
              
              {isAIEnabled && sentimentCounts && (
                <>
                  <div className="h-px bg-border my-3"></div>
                  <h4 className="text-sm font-medium mb-2">AI Sentiment Analysis</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span>Positive</span>
                      <Badge variant="outline" className="bg-green-500/10 text-green-500">
                        {sentimentCounts.positive}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>Mixed</span>
                      <Badge variant="outline" className="bg-amber-500/10 text-amber-500">
                        {sentimentCounts.mixed}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>Negative</span>
                      <Badge variant="outline" className="bg-red-500/10 text-red-500">
                        {sentimentCounts.negative}
                      </Badge>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          
          {/* Featured Reviews */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Featured Reviews</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featuredReviews.map(review => (
                <ReviewCard 
                  key={review.id} 
                  review={review} 
                  isAIEnabled={isAIEnabled}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <Tabs 
            defaultValue="all-reviews" 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <TabsList>
                <TabsTrigger value="all-reviews" className="flex gap-2">
                  <MessageSquare className="h-4 w-4" />
                  All Reviews
                </TabsTrigger>
                <TabsTrigger value="expert-reviews" className="flex gap-2">
                  <Badge variant="outline" className="bg-manga-primary/10 text-manga-primary">
                    Expert
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="user-reviews" className="flex gap-2">
                  <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
                    User
                  </Badge>
                </TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Select
                  value={sortBy}
                  onValueChange={(value) => setSortBy(value as SortOption)}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="latest" className="flex items-center">
                      <div className="flex items-center">
                        <ArrowDown className="mr-2 h-4 w-4" />
                        Latest
                      </div>
                    </SelectItem>
                    <SelectItem value="highest">
                      <div className="flex items-center">
                        <ArrowUp className="mr-2 h-4 w-4" />
                        Highest Rated
                      </div>
                    </SelectItem>
                    <SelectItem value="helpful">
                      <div className="flex items-center">
                        <ThumbsUp className="mr-2 h-4 w-4" />
                        Most Helpful
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <TabsContent value="all-reviews">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredReviews.map(review => (
                  <ReviewCard 
                    key={review.id} 
                    review={review} 
                    isAIEnabled={isAIEnabled}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="expert-reviews">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredReviews
                  .filter(review => review.type === 'expert')
                  .map(review => (
                    <ReviewCard 
                      key={review.id} 
                      review={review} 
                      isAIEnabled={isAIEnabled}
                    />
                  ))
                }
              </div>
            </TabsContent>
            
            <TabsContent value="user-reviews">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredReviews
                  .filter(review => review.type === 'user')
                  .map(review => (
                    <ReviewCard 
                      key={review.id} 
                      review={review} 
                      isAIEnabled={isAIEnabled}
                    />
                  ))
                }
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default CriticsSection;
