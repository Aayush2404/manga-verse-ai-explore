
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import TrendingSection from "@/components/TrendingSection";
import GenreSection from "@/components/GenreSection";
import SurpriseSection from "@/components/SurpriseSection";
import AIAssistant from "@/components/AIAssistant";
import Footer from "@/components/Footer";
import { fetchMangaData, mockMangaData } from "@/data/mockData";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bot } from "lucide-react";
import { MangaItem } from "@/components/MangaCard";

const Index = () => {
  const [mangaList, setMangaList] = useState<MangaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAIEnabled, setIsAIEnabled] = useState(true);
  
  useEffect(() => {
    const loadMangaData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchMangaData();
        setMangaList(data);
      } catch (error) {
        console.error("Error fetching manga data:", error);
        // Fallback to mock data if the API fails
        setMangaList(mockMangaData);
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
  
  const toggleAIAssistant = () => {
    setIsAIEnabled(!isAIEnabled);
    toast({
      title: isAIEnabled ? "AI Assistant Disabled" : "AI Assistant Enabled",
      description: isAIEnabled 
        ? "You've turned off the AI assistant"
        : "Your AI manga assistant is now active",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
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
          // Loading state
          <div className="py-20 text-center">
            <div className="w-16 h-16 border-4 border-t-manga-primary border-r-manga-primary border-b-transparent border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading the best manga for you...</p>
          </div>
        ) : (
          // Content sections
          <>
            <TrendingSection mangaList={mangaList} />
            <GenreSection mangaList={mangaList} />
            <SurpriseSection mangaList={mangaList} />
          </>
        )}
      </main>
      
      <Footer />
      
      {/* Toggleable AI Assistant */}
      <AIAssistant isEnabled={isAIEnabled} toggleAssistant={toggleAIAssistant} />
    </div>
  );
};

export default Index;
