
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MangaItem } from "./MangaCard";
import MangaCard from "./MangaCard";
import SectionTitle from "./SectionTitle";
import { Sparkles } from "lucide-react";

interface SurpriseSectionProps {
  mangaList: MangaItem[];
}

const SurpriseSection = ({ mangaList }: SurpriseSectionProps) => {
  const [surpriseManga, setSurpriseManga] = useState<MangaItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const getRandomManga = () => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * mangaList.length);
      setSurpriseManga(mangaList[randomIndex]);
      setIsLoading(false);
    }, 800);
  };
  
  return (
    <section id="surprise" className="py-10">
      <div className="container px-4 md:px-6">
        <SectionTitle
          title="Surprise Me"
          subtitle="Discover something unexpected from our collection"
        />
        
        <div className="max-w-md mx-auto text-center">
          <Button
            className="bg-manga-primary hover:bg-manga-secondary text-white mb-8"
            disabled={isLoading}
            onClick={getRandomManga}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            {isLoading ? "Finding your manga..." : "Give Me a Surprise!"}
          </Button>
          
          {surpriseManga ? (
            <div className="animate-scale-in">
              <MangaCard manga={surpriseManga} />
            </div>
          ) : (
            <div className="bg-card/50 rounded-lg p-8 text-muted-foreground">
              <Sparkles className="mx-auto h-8 w-8 mb-4 text-manga-primary animate-pulse-soft" />
              <p>
                Click the button above to discover a random manga from our collection!
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SurpriseSection;
