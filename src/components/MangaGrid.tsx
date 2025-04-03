
import { MangaItem } from "./MangaCard";
import MangaCard from "./MangaCard";
import RatingDisplay from "./RatingDisplay";

interface MangaGridProps {
  mangaList: MangaItem[];
  showRatings?: boolean;
}

const MangaGrid = ({ mangaList, showRatings = true }: MangaGridProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
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
