
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MangaItem } from "./MangaCard";
import MangaGrid from "./MangaGrid";
import SectionTitle from "./SectionTitle";

interface GenreSectionProps {
  mangaList: MangaItem[];
}

const GenreSection = ({ mangaList }: GenreSectionProps) => {
  // Extract unique genres from manga list
  const allGenres = Array.from(
    new Set(mangaList.flatMap(manga => manga.genres))
  ).sort();
  
  const [selectedGenre, setSelectedGenre] = useState<string>(allGenres[0] || "Action");
  
  // Filter manga by selected genre
  const filteredManga = mangaList.filter(
    manga => manga.genres.includes(selectedGenre)
  );
  
  return (
    <section id="genres" className="py-10 bg-muted/30">
      <div className="container px-4 md:px-6">
        <SectionTitle
          title="Browse by Genre"
          subtitle="Discover your next favorite manga by genre"
        />
        
        <div className="mb-8 overflow-x-auto scrollbar-none">
          <div className="flex gap-2 pb-2 min-w-min">
            {allGenres.map(genre => (
              <Button
                key={genre}
                variant={selectedGenre === genre ? "default" : "outline"}
                className={
                  selectedGenre === genre 
                    ? "bg-manga-primary hover:bg-manga-secondary" 
                    : "border-manga-primary/30 text-foreground/70"
                }
                onClick={() => setSelectedGenre(genre)}
              >
                {genre}
              </Button>
            ))}
          </div>
        </div>
        
        <MangaGrid mangaList={filteredManga} />
      </div>
    </section>
  );
};

export default GenreSection;
