
import { MangaItem } from "./MangaCard";
import MangaCard from "./MangaCard";
import RatingDisplay from "./RatingDisplay";

interface MangaGridProps {
  mangaList: MangaItem[];
  showRatings?: boolean;
  layout?: 'default' | 'compact' | 'featured';
  className?: string;
}

const MangaGrid = ({ 
  mangaList, 
  showRatings = true, 
  layout = 'default',
  className 
}: MangaGridProps) => {
  // Define grid configuration based on layout type
  const gridClasses = {
    default: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6",
    compact: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4",
    featured: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8"
  };

  return (
    <div className={gridClasses[layout] + (className ? ` ${className}` : "")}>
      {mangaList.map((manga) => (
        <div key={manga.id} className="animate-fade-in">
          <MangaCard manga={manga} />
          {showRatings && manga.rating && (
            <div className="mt-2 flex justify-center">
              <RatingDisplay rating={manga.rating} size="sm" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MangaGrid;
