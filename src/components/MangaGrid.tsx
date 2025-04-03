
import { MangaItem } from "./MangaCard";
import MangaCard from "./MangaCard";

interface MangaGridProps {
  mangaList: MangaItem[];
}

const MangaGrid = ({ mangaList }: MangaGridProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
      {mangaList.map((manga) => (
        <div key={manga.id} className="animate-fade-in">
          <MangaCard manga={manga} />
        </div>
      ))}
    </div>
  );
};

export default MangaGrid;
