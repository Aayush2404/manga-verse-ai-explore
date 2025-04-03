
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

export type MangaItem = {
  id: string;
  title: string;
  cover: string;
  genres: string[];
  rating: number;
  author?: string;
  isTrending?: boolean;
};

interface MangaCardProps {
  manga: MangaItem;
  className?: string;
}

const MangaCard = ({ manga, className }: MangaCardProps) => {
  return (
    <div 
      className={cn(
        "group relative rounded-lg overflow-hidden hover-scale manga-card-shadow bg-card h-full",
        className
      )}
    >
      <div className="aspect-[2/3] overflow-hidden relative">
        <img 
          src={manga.cover} 
          alt={manga.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {manga.isTrending && (
          <div className="absolute top-2 left-2">
            <Badge 
              className="bg-manga-primary text-white font-medium px-2 py-1"
            >
              Trending
            </Badge>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex items-center gap-1 text-white text-sm mb-1">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            <span>{manga.rating.toFixed(1)}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {manga.genres.slice(0, 2).map((genre) => (
              <Badge 
                key={genre} 
                variant="outline" 
                className="bg-black/50 text-white text-xs border-white/20"
              >
                {genre}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-medium text-foreground line-clamp-1">{manga.title}</h3>
        {manga.author && (
          <p className="text-muted-foreground text-sm">{manga.author}</p>
        )}
      </div>
    </div>
  );
};

export default MangaCard;
