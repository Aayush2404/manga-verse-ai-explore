import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import TrendingSection from "@/components/TrendingSection";
import GenreSection from "@/components/GenreSection";
import SurpriseSection from "@/components/SurpriseSection";
import CriticsSection from "@/components/CriticsSection";
import CriticsPicks from "@/components/CriticsPicks";
import AIAssistant from "@/components/AIAssistant";
import Footer from "@/components/Footer";
import { fetchMangaData, mockMangaData } from "@/data/mockData";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bot } from "lucide-react";
import { MangaItem } from "@/components/MangaCard";
import { ReviewItem } from "@/components/ReviewCard";

const mockReviews: ReviewItem[] = [
  {
    id: "1",
    mangaId: "1",
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
    mangaId: "2",
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
    mangaId: "1",
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
    mangaId: "3",
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
    mangaId: "4",
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
    mangaId: "5",
    author: "NewToAnime",
    date: "2025-02-25",
    content: "As someone new to manga, I found this very accessible. The story grabbed me from the first chapter, and the character designs are memorable.",
    rating: 4,
    type: "user",
    helpfulCount: 31,
    sentiment: "positive"
  }
];

const Index = () => {
  const [mangaList, setMangaList] = useState<MangaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAIEnabled, setIsAIEnabled] = useState(true);
  const [selectedManga, setSelectedManga] = useState<MangaItem | null>(null);
  const location = useLocation();
  
  useEffect(() => {
    const loadMangaData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchMangaData();
        setMangaList(data);
        setSelectedManga(data.find(manga => manga.isTrending) || data[0]);
      } catch (error) {
        console.error("Error fetching manga data:", error);
        setMangaList(mockMangaData);
        setSelectedManga(mockMangaData.find(manga => manga.isTrending) || mockMangaData[0]);
        toast({
          title: "Using fallback data",
          description: "We're having trouble connecting to our servers. Showing offline content instead.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadMangaData();
  }, []);

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const sectionId = location.state.scrollTo;
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 500);
    }
  }, [location.state, isLoading]);
  
  const toggleAIAssistant = () => {
    setIsAIEnabled(!isAIEnabled);
    toast({
      title: isAIEnabled ? "AI Assistant Disabled" : "AI Assistant Enabled",
      description: isAIEnabled 
        ? "You've turned off the AI assistant"
        : "Your AI manga assistant is now active",
    });
  };

  const processedReviews = mockReviews.map(review => {
    if (!review.mangaId && mangaList.length > 0) {
      const randomManga = mangaList[Math.floor(Math.random() * mangaList.length)];
      return { ...review, mangaId: randomManga.id };
    }
    return review;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main>
        <section className="py-12 md:py-20 relative overflow-hidden">
          <div className="absolute inset-0 z-0 bg-manga-dark">
            <div className="absolute inset-0 bg-gradient-to-b from-manga-primary/10 to-background opacity-70"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-background to-transparent"></div>
          </div>
          
          <div className="container relative z-10 px-4 md:px-6 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 animate-fade-in">
              Discover the World of Manga
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in">
              Explore trending titles, find your favorite genres, and get personalized recommendations with our AI assistant.
            </p>
            
            <div className="flex items-center justify-center gap-4 mb-8 animate-fade-in">
              <Switch 
                id="ai-toggle" 
                checked={isAIEnabled}
                onCheckedChange={toggleAIAssistant}
              />
              <Label 
                htmlFor="ai-toggle"
                className="flex items-center gap-2 cursor-pointer"
              >
                <Bot className="h-4 w-4 text-manga-primary" />
                AI Assistant {isAIEnabled ? "Enabled" : "Disabled"}
              </Label>
            </div>
          </div>
        </section>
        
        {isLoading ? (
          <div className="py-20 text-center">
            <div className="w-16 h-16 border-4 border-t-manga-primary border-r-manga-primary border-b-transparent border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading the best manga for you...</p>
          </div>
        ) : (
          <div className="space-y-8 md:space-y-12">
            <CriticsPicks 
              mangaList={mangaList} 
              reviews={processedReviews} 
              isAIEnabled={isAIEnabled} 
            />
            <TrendingSection mangaList={mangaList} />
            <GenreSection mangaList={mangaList} />
            <SurpriseSection mangaList={mangaList} />
            {selectedManga && (
              <CriticsSection manga={selectedManga} isAIEnabled={isAIEnabled} />
            )}
          </div>
        )}
      </main>
      
      <Footer />
      
      <AIAssistant isEnabled={isAIEnabled} toggleAssistant={toggleAIAssistant} />
    </div>
  );
};

export default Index;
